import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { text } from 'd3-fetch';
import { sum, descending } from 'd3-array';
import styled from 'styled-components';

import { Link } from 'gatsby';
import { initialOption } from './common';
import world from './world.json';

echarts.registerMap('world', world);

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

const PersonalFootprint = () => {
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

      const newOption = {
        tooltip: {
          trigger: 'item',
          formatter(e) {
            if (e.componentType !== 'series') { return; }
            const d = data[e.dataIndex];
            if (!d) { return; }
            const intensity = Math.round(d.intensity);
            const emissionPercent = Math.round(d.population * d.intensity * 10000.0 / totalEmissions) / 100.0;
            // eslint-disable-next-line consistent-return
            return `${d.name}: ${intensity} tons / person / year <br />${emissionPercent}% of total emissions`;
          },
        },
        series: [{
          type: 'map',
          map: 'world',
          roam: null, // can be set to `true` or `pan`
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          data: data.map(d => ({ name: d.name, value: d.intensity })),
        }],
        visualMap: {
          min: 0,
          max: 20,
          left: 'left',
          top: 'bottom',
          calculable: true,
          formatter(d) { return `${Math.round(d)}t`; },
        },
      };
      updateOption(newOption);
    });
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <Graph>
      <GraphTitle>Average personal carbon footprint by country in 2014</GraphTitle>
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
        {' '}(
        <Link outward href="http://cait.wri.org/historical/export/Country%20GHG%20Emissions/WorldResourcesInstituteCAIT.csv?&keyField=Country&unit=MtCO2e&unit=MtCO%E2%82%82e%E2%80%8D&unit=People&indicator[]=Total%20GHG%20Emissions%20Excluding%20Land-Use%20Change%20and%20Forestry&indicator[]=Total%20GHG%20Emissions%20Including%20Land-Use%20Change%20and%20Forestry&indicator[]=Population&year[]=2014&sortIdx=1&sortDir=desc&chartType=geo" target="_blank">data</Link>
        )
      </Source>
    </Graph>
  );
};

export default PersonalFootprint;
