import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { text } from 'd3-fetch';
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

const GlobalTemp = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = () => {
    text('/data/647_Global_Temperature_Data_File.txt').then((gissObj) => {
      const newOption = initialOption();
      const gissData = parseGiss(gissObj);
      const xData = gissData.map(d => +d[0]);
      const yData = gissData.map(d => +d[1]);
      const xyData = gissData.map((_, i) => [xData[i], yData[i]]);

      newOption.xAxis.type = 'value';
      newOption.xAxis.min = Math.min(...xData);
      newOption.xAxis.axisLabel = {
        formatter: e => e.toString(),
      };

      newOption.xAxis.max = Math.max(...xData);
      newOption.yAxis.min = -0.7;
      newOption.yAxis.max = 1.5;

      newOption.tooltip.formatter = (e) => {
        const value = e[0].data[1];
        const sign = value >= 0 ? '+' : '';
        return `${e[0].marker} ${sign + value} °C in ${e[0].data[0]}`;
      };

      newOption.series = [
        {
          name: 'nasa_giss_1y',
          type: 'line',
          showSymbol: false,
          data: xyData,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: -1 * newOption.yAxis.min / newOption.yAxis.max,
                color: 'rgb(242, 0, 80)',
              }, {
                offset: 1,
                color: 'rgb(247, 83, 187)',
              }]),
            },
          },
          markLine: {
            data: [{ yAxis: yData[yData.length - 1], x: '70%' }],
            label: {
              normal: {
                formatter: () => xData[xData.length - 1],
                position: 'start',
              },
            },
          },
        },
        {
          name: 'last',
          type: 'scatter',
          data: [xyData[xyData.length - 1]],
          symbolSize: 10,
        },
      ];
      updateOption(newOption);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Graph>
      <GraphTitle>Temperature anomalies</GraphTitle>
      <GraphDescription>&deg;C compared to 1951-1980 average</GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source:
        {' '}
        <Link
          outward
          href="https://climate.nasa.gov/vital-signs/global-temperature/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NASA&apos;s Goddard Institute for Space Studies (GISS)
        </Link>
        {' '}(
        <Link
          outward
          href="https://data.giss.nasa.gov/gistemp/graphs/graph_data/Global_Mean_Estimates_based_on_Land_and_Ocean_Data/graph.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          data
        </Link>
        )
      </Source>
    </Graph>
  );
};

export default GlobalTemp;
