import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { csv } from 'd3-fetch';
import { sum, range, extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { interpolateBasis } from 'd3-interpolate';
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

const WorldPrimaryEnergy = () => {
  const [option, updateOption] = useState(initialOption());

  const loadData = () => {
    csv('/data/global-primary-energy.csv').then((obj) => {
      const mapping = {
        'Coal (TWh; substituted energy)': 'coal',
        'Oil (TWh; substituted energy)': 'oil',
        'Gas (TWh; substituted energy)': 'gas',
        'Hydropower (TWh; substituted energy)': 'hydro',
        'Nuclear (TWh; substituted energy)': 'nuclear',
        'Solar (TWh; substituted energy)': 'solar',
        'Wind (TWh; substituted energy)': 'wind',
        // 'Biofuels (TWh; substituted energy)': 'biomass',
        'Traditional bimass (TWh; substituted energy)': 'biomass',
        'Other renewables (TWh; substituted energy)': 'other',
      };
      const colors = {
        wind: '#74cdb9',
        solar: '#f27406',
        hydro: '#2772b2',
        biomass: '#166a57',
        nuclear: '#AEB800',
        gas: '#bb2f51',
        coal: '#ac8c35',
        oil: '#867d66',
      };
      // Index by year so we can interpolate later on
      // (echarts doesn't support continuous axis with non-equally spaced years)
      const byYear = {};
      obj.forEach((d) => {
        byYear[+d.Year] = d;
      });

      const byFuel = {};
      const xData = range(+obj[0].Year, +obj[obj.length - 1].Year + 1); // years
      const fuels = Object.keys(mapping);
      fuels.forEach((k) => {
        if (!obj[0][k]) {
          console.warn(`Key ${k} was not found in global-primary-energy.csv`);
        }
      });

      fuels.forEach((k) => {
        const kk = mapping[k];
        xData.forEach((year) => {
          const d = byYear[year];
          if (!byFuel[kk]) { byFuel[kk] = []; }
          if (!d) {
            // Mark for interpolation
            byFuel[kk].push(null);
          } else {
            byFuel[kk].push(+d[k] / 1000.0); // Divide by 1000 from TWh to PWh
          }
        });
        // Interpolate
        const interpolator = interpolateBasis(byFuel[kk].filter(d => d != null));
        const basis = obj.map(d => +d.Year);
        const scale = scaleLinear()
          .domain(basis)
          .range(basis.map((_, i) => i / (basis.length - 1)));
        byFuel[kk].forEach((d, i) => {
          if (d == null) {
            byFuel[kk][i] = interpolator(scale(xData[i]));
          }
        });
      });

      const data = [
        { name: 'biomass', values: byFuel.biomass },
        { name: 'coal', values: byFuel.coal },
        { name: 'oil', values: byFuel.oil },
        { name: 'gas', values: byFuel.gas },
        { name: 'hydro', values: byFuel.hydro },
        { name: 'nuclear', values: byFuel.nuclear },
        { name: 'wind', values: byFuel.wind },
        { name: 'solar', values: byFuel.solar },
      ];

      const newOption = initialOption();

      newOption.xAxis.data = xData;

      newOption.tooltip.formatter = (e) => {
        e.reverse();
        const year = e[0].axisValueLabel;
        const sumdata = sum(e, d => d.data);
        let html = `${year}:<br />${
          e.map(d => `${d.marker} ${d.seriesName}: ${d.data.toFixed(0)} PWh (${Math.round(d.data * 100 / sumdata)} %)`).join('<br />')}`;
        html += '<br />--<br />';
        const ff = sum(e.filter(d => ['gas', 'oil', 'coal'].indexOf(d.seriesName) !== -1), d => d.data);
        html += `Fossil fuels: ${Math.round(ff * 100) / 100} (${Math.round(ff * 100 / sumdata)} %)`;
        return html;
      };

      newOption.legend = {
        data: data.map(d => d.name).reverse(),
        orient: 'vertical',
        x: 'right',
        y: 'center',
      };
      newOption.legend.selected = {};
      data.forEach((d) => {
        newOption.legend.selected[d.name] = true;
      });

      newOption.grid.right = 120;

      newOption.yAxis.max = 160;
      newOption.xAxis.axisLabel = { interval: 19 };
      newOption.xAxis.axisTick = { interval: 19 };

      newOption.color = data.map(d => colors[d.name]);
      newOption.series = data.map(d => ({
        name: d.name,
        type: 'line',
        symbol: 'none',
        stack: 'common',
        data: d.values,
        areaStyle: { normal: { } },
        lineStyle: { width: 0 },
      }));

      updateOption(newOption);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Graph>
      <GraphTitle>World primary energy consumption since 1800</GraphTitle>
      <GraphDescription>in PWh (petawatt-hours)</GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source:
        {' '}
        <Link outward href="https://ourworldindata.org/energy-mix">Our World In Data</Link>
      </Source>
    </Graph>
  );
};

export default WorldPrimaryEnergy;
