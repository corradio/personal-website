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

const Transportation = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = () => {
    const modeColor = {
    };

    const data = [
      { name: 'walk', intensity: 24.15, label: '🚶 walk (average diet)' },
      { name: 'bike', intensity: 18.40, label: '🚴 cycle (average diet)' },
      { name: 'motorcycle', intensity: 120.70, label: '🏍 motorcycle' },
      { name: 'car (diesel)', intensity: 182.94, label: '🚗 car (diesel)' },
      { name: 'car (low-carbon electric)', intensity: 93, label: '🚙 electric car\n(low-carbon electricity)' },
      { name: 'car (high-carbon electric)', intensity: 292, label: '🚙 electric car\n(high-carbon electricity)' },
      { name: 'bus', intensity: 41.63, label: '🚌 bus' },
      { name: 'car sharing (diesel)', intensity: 45.73, label: '🚗 car sharing (diesel)' },
      { name: 'train (diesel)', intensity: 48.64, label: '🚂 train (diesel)' },
      { name: 'train (electric)', intensity: 23.46, label: '🚆 train (electric)' },
      { name: 'airplane', intensity: 239, label: '✈️ airplane (long distance)' },
      { name: 'airplane', intensity: 340, label: '✈️ airplane (short distance)' },
    ].reverse();

    const newOption = initialOption();

    newOption.grid.left = 170;

    newOption.xAxis.name = 'Greenhouse gas intensity in gCO₂eq / person / km';
    newOption.xAxis.nameLocation = 'middle';
    newOption.xAxis.nameGap = 30;
    newOption.grid.bottom = 50;

    newOption.xAxis.type = 'value';
    newOption.yAxis.data = data.map(d => d.label || d.name);

    newOption.tooltip.trigger = 'none';

    newOption.series = [
      {
        type: 'bar',
        data: echarts.util.map(data, d => ({
          value: d.intensity,
          itemStyle: {
            normal: {
              color: modeColor[d.name],
            },
          },
        })),
        label: {
          normal: {
            show: true,
            position: 'right',
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
      <GraphTitle>Greenhouse gas intensity of transportation modes</GraphTitle>
      <GraphDescription>
        in gCO
        <sub>2</sub>
        eq / person / km
      </GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
        style={{
          height: '450px',
        }}
      />
      <Source>
        Source:
        {' '}
        <Link outward href="http://www.ecoinvent.org/">Ecoinvent 3</Link>
        {' '}through{' '} 
        <Link outward href="https://static.ducky.no/calculator_documentation.pdf">ducky.no</Link>
        ,{' '} 
        <Link outward href="http://shrinkthatfootprint.com/electric-car-emissions">Shrink that footprint</Link>
        {' '}and{' '} 
        <Link outward href="https://www.theguardian.com/environment/datablog/2009/sep/02/carbon-emissions-per-transport-type">The Guardian</Link>
        . Bus assumes urban use with 75% occupancy. Motorcycle is assumed 250-750cc.
        Car sharing assumes driver + 3 passengers. Low-carbon electricity assumes
        France and high carbon Australia.
      </Source>
    </Graph>
  );
};

export default Transportation;
