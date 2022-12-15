import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { text } from 'd3-fetch';
import { dsvFormat } from 'd3-dsv';
import { mean } from 'd3-array';
import styled from 'styled-components';

import { Link } from 'gatsby';
import { initialOption, parseGiss, initialDataZoom } from './common';

const Graph = styled.div`
   width: 100%;
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
`;

const Source = styled.div`
  font-size: small;
`;

const GraphTitle = styled.div`
  font-weight: bold;
`;

const GraphDescription = styled.div`
`;


const TempAnnomalies = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = async () => {
    const [marcottObj, gissObj] = await Promise.all([
      text('/data/marcott2013.csv'),
      text('/data/647_Global_Temperature_Data_File.txt'),
    ]);

    const gissData = parseGiss(gissObj).map(d => [+d[0], +d[1]]);

    const marcottData = dsvFormat(';').parse(marcottObj)
      .map(r => [1950 - +r['Age (yrs BP)'], parseFloat(r['Global (°C)'].replace(',', '.'))])
      // eslint-disable-next-line no-restricted-globals
      .filter(d => isFinite(d[1]) && d[0] < gissData[0][0])
      .reverse();

    // Make sure to convert the baseline to the giss one
    const marcottBaseline = [1961, 1990];
    const delta = mean(
      gissData.filter(d => d[0] >= marcottBaseline[0] && d[1] <= marcottBaseline[1]), d => d[1],
    );

    const data = marcottData.map(d => [d[0], d[1] - delta]);

    gissData.forEach((d) => { data.push(d); });

    const newOption = initialOption();

    newOption.xAxis.type = 'value';
    newOption.xAxis.axisLabel = {
      formatter(e) { return e.toString(); },
    };
    newOption.xAxis.min = -9000;
    newOption.xAxis.max = data[data.length - 1][0];

    newOption.yAxis.min = -0.7;
    newOption.yAxis.max = 1.2;

    newOption.dataZoom = initialDataZoom();
    newOption.dataZoom[0].startValue = -9000;

    newOption.grid.bottom = 60;

    newOption.tooltip.formatter = (e) => {
      const yValue = Math.round(e[0].data[1] * 100) / 100;
      const sign = yValue >= 0 ? '+' : '';
      const xValue = e[0].data[0];
      const year = xValue < 0 ? `${xValue} BC` : `${xValue} AD`;
      return `${e[0].marker}${sign}${yValue} °C in ${year}`;
    };

    newOption.series = [
      {
        name: 'marcott',
        type: 'line',
        showSymbol: false,
        data,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: -1 * newOption.yAxis.min / newOption.yAxis.max - 0.2,
              color: 'rgb(255, 64, 30)',
            }, {
              offset: 1,
              color: 'rgb(180, 200, 255)',
            }]),
          },
        },
        markLine: {
          data: [{ yAxis: data[data.length - 1][1], x: '70%' }],
          label: {
            normal: {
              formatter() { return data[data.length - 1][0]; },
              position: 'start',
            },
          },
        },
      },
      {
        name: 'last',
        type: 'scatter',
        data: [data[data.length - 1]],
        symbolSize: 10,
      },
    ];
    updateOption(newOption);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Graph>
      <GraphTitle>Temperature anomalies in the last 11 000 years</GraphTitle>
      <GraphDescription>&deg;C compared to 1951-1980 average</GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source:
        {' '}
        <Link outward href="http://science.sciencemag.org/content/339/6124/1198" target="_blank" rel="noopener noreferrer">A Reconstruction of Regional and Global Temperature for the Past 11,300 Years</Link>
        {' '}
        (
        <Link outward href="http://science.sciencemag.org/content/suppl/2013/03/07/339.6124.1198.DC1" target="_blank" rel="noopener noreferrer">data</Link>
        ) before 1880,
        {' '}
        <Link outward href="https://climate.nasa.gov/vital-signs/global-temperature/" target="_blank" rel="noopener noreferrer">NASA&quot;s Goddard Institute for Space Studies (GISS)</Link>
        {' '}
        (
        <Link outward href="http://climate.nasa.gov/system/internal_resources/details/original/647_Global_Temperature_Data_File.txt" target="_blank" rel="noopener noreferrer">data</Link>
        ) after 1880
      </Source>
    </Graph>
  );
};

export default TempAnnomalies;
