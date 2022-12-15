import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { text } from 'd3-fetch';
import { sum, descending } from 'd3-array';
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

const EmissionsByCountry = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = () => {
    text('/data/WorldResourcesInstituteCAIT.csv').then((obj) => {
      const year = 2014;

      const data = obj.split('\n')
        .filter((d, i) => i > 0)
        .map(d => d.split(',"').map(s => s.replace('"', '').replace('"', '')))
        .filter(d => [
          'World',
          'European Union (28)',
          'European Union (15)',
        ].indexOf(d[0]) === -1
          && d[1] === year.toString()
          && d[4] !== '')
        .map(d => ({
          name: d[0],
          intensity: +d[2] * 1e6 / +d[4], // excluding land use + forestry
          population: +d[4] / 1e9, // in billions
        }))
        .sort((a, b) => descending(a.intensity, b.intensity));

      // Convert to percentages
      const totalPopulation = sum(data, d => d.population);
      data.forEach((d) => {
        d.population /= totalPopulation / 100;
      });

      const totalEmissions = sum(data, d => d.population * d.intensity);

      // [from, to, height, name]
      const chartData = [[0, data[0].population, data[0].intensity, data[0].name]];
      data.forEach((d, i) => {
        if (i === 0) { return; }
        const from = chartData[chartData.length - 1][1];
        chartData.push([
          from,
          from + d.population,
          d.intensity,
          d.name,
        ]);
      });

      function renderItem(params, api) {
        const yValue = api.value(2);
        const start = api.coord([api.value(0), yValue]);

        const size = api.size([api.value(1) - api.value(0), yValue]);
        const style = api.style();

        return {
          type: 'rect',
          shape: echarts.graphic.clipRectByRect({
            x: start[0],
            y: start[1],
            width: size[0],
            height: size[1],
          }, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height,
          }),
          style,
        };
      }

      const newOption = initialOption();

      newOption.xAxis.name = 'of world population';
      newOption.xAxis.nameLocation = 'middle';
      newOption.xAxis.position = 'bottom';
      newOption.xAxis.nameGap = 50;
      newOption.xAxis.axisLabel = { formatter: '{value}%', margin: 30 };
      newOption.grid.bottom = 80;

      newOption.yAxis.name = 'personal footprint';
      newOption.yAxis.nameLocation = 'middle';
      newOption.yAxis.nameRotate = 90;
      newOption.yAxis.nameGap = 35;
      newOption.yAxis.axisLabel = { formatter: '{value}t' };

      newOption.dataZoom = initialDataZoom();
      newOption.dataZoom[0].bottom = newOption.grid.bottom - 20;
      newOption.dataZoom[0].startValue = 1;
      newOption.dataZoom[0].endValue = 100;
      newOption.dataZoom[0].labelFormatter = '';
      newOption.dataZoom[0].filterMode = 'weakFilter'; // to enable drawing

      newOption.tooltip.trigger = 'item';
      newOption.tooltip.formatter = (e) => {
        if (e.componentType !== 'series') { return; }
        const d = data[e.dataIndex];
        const intensity = Math.round(d.intensity);
        const emissionPercent = Math.round(d.population * d.intensity * 10000.0 / totalEmissions) / 100.0;
        // eslint-disable-next-line consistent-return
        return `${d.name}: ${intensity} tons / person / year <br />${emissionPercent}% of total emissions`;
      };

      newOption.grid.right = 100;// for mark label

      newOption.series = [
        {
          type: 'custom',
          renderItem,
          dimensions: ['from', 'to', 'intensity'],
          encode: {
            x: [0, 1],
            y: 2,
            tooltip: [0, 1, 2],
            label: 3,
            itemName: 3,
          },
          data: chartData,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 64, 30)',
              }, {
                offset: 1,
                color: 'orange',
              }]),
              borderColor: 'black',
              borderWidth: 0.1,
            },
          },
          markLine: {
            symbol: 'none',
            data: [{ yAxis: 2 }],
            label: {
              normal: {
                formatter: 'Paris 2t objective 2050',
                position: 'end',
              },
            },
            lineStyle: {
              normal: {
                color: 'darkgreen',
                width: 3,
              },
            },
          },
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
      <GraphTitle>World greenhouse gas emissions by country in 2014</GraphTitle>
      <GraphDescription>
        in tCO
        <sub>2</sub>
        eq per person per year
      </GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source:
        {' '}
        <Link outward href="http://www.wri.org/resources/data-sets/cait-historical-emissions-data-countries-us-states-unfccc" target="_blank">World Resource Institute</Link>
        {' '}
        (
        <Link outward href="http://cait.wri.org/historical/export/Country%20GHG%20Emissions/WorldResourcesInstituteCAIT.csv?&keyField=Country&unit=MtCO2e&unit=MtCO%E2%82%82e%E2%80%8D&unit=People&indicator[]=Total%20GHG%20Emissions%20Excluding%20Land-Use%20Change%20and%20Forestry&indicator[]=Total%20GHG%20Emissions%20Including%20Land-Use%20Change%20and%20Forestry&indicator[]=Population&year[]=2014&sortIdx=1&sortDir=desc&chartType=geo" target="_blank">data</Link>
        ) Each square represents a country. Its height represents the average personal
        footprint (to be compared against the 2t&nbsp;objective), and its width represents
        the number of people in that country. The area therefore represents the total
        amount of emissions from a given country.
      </Source>
    </Graph>
  );
};

export default EmissionsByCountry;
