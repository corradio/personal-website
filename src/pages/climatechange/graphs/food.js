import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import * as d3 from 'd3-fetch';
import styled from 'styled-components';

import { Link } from 'gatsby';
import { initialOption } from './common';

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

const mapping = {
  'Beef (beef herd)': '🐮 beef',
  'Lamb & Mutton': '🐑 lamb & mutton',
  'Shrimps (farmed)': '🍤 shrimp',
  'Pig Meat': '🐷 pork',
  'Poultry Meat': '🐔 chicken',
  'Fish (farmed)': '🐟 fish',
  'Rice': '🍚 rice',
  'Potatoes': '🥔 potatoes',
  'Tomatoes': '🍅 tomatoes',
  'Root Vegetables': '🥕 vegetables',
  'Wheat & Rye (Bread)': '🍞 bread & cereals',
  'Coffee': '☕️ coffee',
  'Milk': '🥛 milk',
  'Soymilk': '🥛 soymilk',
  'Eggs': '🥚 eggs',
  'Cheese': '🧀 cheese',
  'Dark Chocolate': '🍫 chocolate',
  'Berries & Grapes': '🍇 berries & grapes',
  'Apples': '🍏 apples',
  'Bananas': '🍌 bananas',
};

const series = {
  'productionIntensity': 'production',
  'packagingAndRetailIntensity': 'packaging & retail',
  'transportIntensity': 'transport',
};

const Food = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = () => {
    d3.csv('/data/GHG-emissions-by-life-cycle-stage-OurWorldinData-upload.csv').then((response) => {
      const data = Object.keys(mapping)
        .map(d => response.find(x => x['Food product'] === d))
        .reverse()
        .map(d => ({
          name: d['Food product'],
          transportIntensity: parseFloat(d['Transport']),
          packagingAndRetailIntensity: [
            'Packging', // this is not a typo!
            'Retail',
          ].map(k => parseFloat(d[k])).reduce((a, b) => a + b, 0),
          productionIntensity: [
            'Land use change',
            'Animal Feed',
            'Farm',
            'Processing',
          ].map(k => parseFloat(d[k])).reduce((a, b) => a + b, 0),
          intensity: [
            'Land use change',
            'Animal Feed',
            'Farm',
            'Processing',
            'Transport',
            'Packging', // this is not a typo!
            'Retail',
          ].map(k => parseFloat(d[k])).reduce((a, b) => a + b, 0),
          label: mapping[d['Food product']] || d['Food product'],
        }));

      const newOption = initialOption();

      newOption.grid.left = 160;

      newOption.xAxis.name = 'Greenhouse gas intensity in kgCO₂eq per kg';
      newOption.xAxis.nameLocation = 'middle';
      newOption.xAxis.nameGap = 30;
      newOption.grid.bottom = 50 + 30; // second component is legend

      newOption.xAxis.type = 'value';
      newOption.yAxis.data = data.map(d => d.label || d.name);

      newOption.tooltip.trigger = 'none';

      newOption.legend = {
        data: Object.values(series),
        bottom: 0,
      };

      newOption.series = Object.keys(series).map((k, i) => (
        {
          type: 'bar',
          stack: true,
          name: series[k],
          data: echarts.util.map(data, d => ({
            value: d[k],
            itemStyle: {
              normal: {
                // color: modeColor[d.name],
              },
            },
          })),
          label: {
            normal: {
              show: i === Object.keys(series).length - 1,
              position: 'right',
              formatter(e) {
                return Math.ceil(data[e.dataIndex].intensity);
              },
            },
          },
        }
      ));
      updateOption(newOption);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Graph>
      <GraphTitle>Greenhouse gas intensity of food</GraphTitle>
      <GraphDescription>
        in kgCO
        <sub>2</sub>
        eq / kg
      </GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
        style={{ height: '500px' }}
      />
      <Source>
        Source:
        {' '}
        <Link outward href="https://ourworldindata.org/food-choice-vs-eating-local">Our World in Data</Link>
        .
      </Source>
    </Graph>
  );
};

export default Food;
