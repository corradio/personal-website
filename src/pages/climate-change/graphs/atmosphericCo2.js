import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { text } from 'd3-fetch';
import styled from 'styled-components';

import { Link } from 'gatsby';
import { initialOption, initialDataZoom } from './common';

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

const AtmosphericCo2 = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = async () => {
    const data = [];
    const splitDate = 1959;

    const [icecoreObj, mloObj] = await Promise.all([
      text('/data/antarctica2015co2composite.txt'),
      text('/data/co2_annmean_mlo.txt'),
    ]);

    icecoreObj.split('\n')
      .filter((d, i) => i >= 138)
      .map((d) => {
        const r = d.split('\t');
        return [1950 - +r[0], +r[1]];
      })
      // eslint-disable-next-line no-restricted-globals
      .filter(d => d[0] < splitDate && isFinite(d[1]))
      .reverse()
      .forEach((d) => {
        data.push(d);
      });

    mloObj.split('\n')
      .filter(d => d[0] !== '#')
      .map((d) => {
        const r = d.split('   ');
        return [+r[0], +r[1]];
      })
      .filter(d => d[0] >= splitDate)
      .forEach((d) => { data.push(d); });

    const newOption = initialOption();

    newOption.xAxis.type = 'value';
    newOption.xAxis.axisLabel = {
      formatter(e) { return e.toString(); },
    };
    newOption.xAxis.min = -900000;
    newOption.yAxis.min = 150;
    newOption.yAxis.max = 420;

    newOption.dataZoom = initialDataZoom();
    newOption.dataZoom[0].startValue = -40000;

    newOption.grid.bottom = 60;

    newOption.tooltip.formatter = (e) => {
      const yValue = e[0].data[1];
      const xValue = e[0].data[0];
      const year = xValue < 0
        ? `${Math.round(xValue)} BC`
        : `${Math.round(xValue)} AD`;
      return `${e[0].marker} ${yValue} ppm in ${year}`;
    };
    newOption.series = [
      {
        name: '',
        type: 'line',
        showSymbol: false,
        data,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0.5,
              color: 'rgb(255, 64, 30)',
            }, {
              offset: 1,
              color: 'orange',
            }]),
          },
        },
        markLine: {
          data: [{ x: '70%', yAxis: data[data.length - 1][1] }],
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
      <GraphTitle>Atmospheric CO2 concentration in the last 40&nbsp;000 to 800&nbsp;000 years</GraphTitle>
      <GraphDescription>in ppm (particles per million)</GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source: National Oceanic and Atmospheric Administration (NOAA) {' '}
        <Link
          outward
          href="https://www.ncdc.noaa.gov/paleo-search/study/17975"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ice Core records
        </Link>
        {' '} (
        <Link
          outward
          href="https://www1.ncdc.noaa.gov/pub/data/paleo/icecore/antarctica/antarctica2015co2composite.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          data
        </Link>
        ) before 1959 and {' '}
        <Link
          outward
          href="https://www.esrl.noaa.gov/gmd/ccgg/trends/data.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mauna Loa records
        </Link>
        {' '}(
        <Link
          outward
          href="ftp://aftp.cmdl.noaa.gov/products/trends/co2/co2_annmean_mlo.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          data
        </Link>
        ) after 1959.
      </Source>
    </Graph>
  );
};

export default AtmosphericCo2;
