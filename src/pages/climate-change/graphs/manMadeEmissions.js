import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { sum } from 'd3-array';
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

const ManMadeEmissions = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = () => {
    const data = [
      { name: 'Fossil fuels\nconsumption', value: 73.2, color: '#c23531' },
      { name: 'Agriculture and\ndeforestation', value: 18.4, color: '#749f83' },
      { name: 'Non-energy related\nindustrial processes', value: 5.2 + 3.2, color: '#546570' },
    ].reverse();

    // Percentage
    const total = sum(data, d => d.value);
    data.forEach((d) => {
      d.value /= total / 100;
    });

    const newOption = initialOption();

    newOption.grid.left = 130;

    newOption.xAxis.type = 'value';
    newOption.xAxis.axisLabel = { formatter: '{value}%' };
    newOption.grid.bottom = 50;

    newOption.yAxis.data = data.map(d => d.name);

    newOption.tooltip.trigger = 'none';

    newOption.series = [
      {
        type: 'bar',
        data: echarts.util.map(data, d => ({
          value: d.value,
          itemStyle: {
            normal: {
              color: d.color,
            },
          },
        })),
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter(e) {
              return `${Math.round(e.data.value)}%`;
            },
          },
        },
      },
    ];
    updateOption(newOption);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Graph>
      <GraphTitle>Man-made greenhouse gas emissions in 2016</GraphTitle>
      <GraphDescription>% of total</GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source:
        {' '}
        <Link outward href="https://ourworldindata.org/ghg-emissions-by-sector">Our World In Data</Link>, more details in this <Link outward href="https://wriorg.s3.amazonaws.com/s3fs-public/world-greenhouse-gas-emissions-sankey-chart-2019_0.pdf">sankey diagram</Link>.
      </Source>
    </Graph>
  );
};

export default ManMadeEmissions;
