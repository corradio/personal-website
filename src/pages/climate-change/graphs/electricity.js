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

const Electricity = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = () => {
    const modeColor = {
      wind: '#74cdb9',
      solar: '#f27406',
      hydro: '#2772b2',
      'wind + storage': '#2772b2',
      biomass: '#166a57',
      geothermal: 'yellow',
      nuclear: '#AEB800',
      gas: '#bb2f51',
      coal: '#ac8c35',
      oil: '#867d66',
    };

    const data = [
      { name: 'wind', intensity: 12 },
      { name: 'wind + storage', intensity: null },
      { name: 'solar', intensity: 45 },
      { name: 'solar + storage', intensity: 100 },
      { name: 'hydro', intensity: 24 },
      { name: 'geothermal', intensity: 38 },
      { name: 'biomass', intensity: 230 },
      { name: 'nuclear', intensity: 12 },
      { name: 'gas', intensity: 490 },
      { name: 'oil', intensity: 650 },
      { name: 'coal', intensity: 820 },
    ].reverse();

    const newOption = initialOption();

    newOption.xAxis.name = 'Greenhouse gas intensity in gCO₂eq per kWh consumed';
    newOption.xAxis.nameLocation = 'middle';
    newOption.xAxis.nameGap = 30;
    newOption.grid.bottom = 50;

    newOption.xAxis.type = 'value';
    newOption.yAxis.data = data.map(d => d.name);

    newOption.grid.left = 90;

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
      <GraphTitle>Greenhouse gas intensity of electricity production modes</GraphTitle>
      <GraphDescription>
        in gCO
        <sub>2</sub>
        eq / kWh consumed
      </GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source: Life cycle emissions from
        {' '}
        <Link outward href="https://github.com/tmrowco/electricitymap#carbon-intensity-calcuation-and-data-source">Electricity Maps</Link>
        {' '} (
        <Link outward href="https://github.com/tmrowco/electricitymap/blob/master/config/co2eq_parameters.js">data</Link>
        ) and {' '}
        <Link outward href="http://www.lowtechmagazine.com/2015/05/sustainability-off-grid-solar-power.html">How Sustainable is Stored Sunlight?</Link>
        {' '} for solar + storage intensity estimations.
      </Source>
    </Graph>
  );
};

export default Electricity;
