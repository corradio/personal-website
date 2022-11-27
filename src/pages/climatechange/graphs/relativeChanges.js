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
    text('/data/IPCC_WG1AR5_All_1_2.csv').then((obj) => {
      const rawData = obj.split('\n')
        .filter((_, i) => i >= 7 && i < 270)
        // .filter(function(_, i) { return i == 0 || i >= 100 + 1 }) // start 100y after
        .filter((d, i) => i === 0 || d.split(';')[0] === '2011');
      const header = rawData[0].split(';')
        .filter((_, j) => j <= 11);
      // Sum by column
      const sums = {};
      rawData.forEach((d, i) => {
        if (i === 0) { return; } // skip header
        const row = d.split(';');
        header.forEach((h, j) => {
          if (j === 0) { return; } // skip year
          if (sums[h] === undefined) { sums[h] = 0; }
          sums[h] += +(row[j].replace(',', '.'));
        });
      });

      const data = [
        {
          name: 'Other man-made changes',
          value:
          sums['BC Snow']
          + sums.Contrails
          + sums.LUC,
        },
        { name: 'Aerosols', value: sums['Aerosol (Total)'] },
        { name: 'Volcano erruptions', value: sums.Volcano },
        { name: 'Solar changes', value: sums.Solar },
        {
          name: 'Greenhouse gases',
          value:
          sums.CO2
          + sums['GHG OTher*']
          + sums['H2O (Strat)']
          + sums['O3 (Strat)']
          + sums['O3 (Trop)'],
        },
      ];

      let cumSum = [0];
      data.forEach((_, i) => {
        if (i === 0) { return; }
        // eslint-disable-next-line no-param-reassign
        i = data.length - i - 1; // reverse
        cumSum.push(
          cumSum[cumSum.length - 1]
          + (data[i + 1].value > 0 ? data[i + 1].value : 0)
          - (data[i].value < 0 ? -data[i].value : 0),
        );
      });
      cumSum.push(0); data.unshift({ name: 'Net observed warming', value: '-' });
      cumSum = cumSum.reverse();

      const newOption = initialOption();

      newOption.grid.left = 150;

      newOption.xAxis.name = 'Warming increase (W/m²)';
      newOption.xAxis.nameLocation = 'middle';
      newOption.xAxis.nameGap = 30;
      newOption.grid.bottom += 30;

      newOption.xAxis.type = 'value';
      newOption.yAxis.data = data.map(d => d.name);

      newOption.tooltip.formatter = (e) => {
        const e0 = e
          .filter(d => d.seriesName !== 'offset')
          .filter(d => d.data !== '-')[0];
        if (!e0.data) { return; }
        const value = e0.data;
        const name = e0.name;
        const isWarming = e0.seriesName === 'pos';
        // eslint-disable-next-line consistent-return
        return `${isWarming ? 'Heating' : 'Cooling'} with ${isWarming ? '' : '-'}${value} W/m<sup>2</sup>`;
      };

      newOption.series = [
        // transparent bars the add the offsets
        {
          name: 'offset',
          type: 'bar',
          stack: 'common',
          data: cumSum,
          itemStyle: {
            normal: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)',
            },
            emphasis: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)',
            },
          },
        },
        {
          name: 'pos',
          type: 'bar',
          stack: 'common',
          data: data
            .map(d => (d.value < 0 ? '-' : d.value)),
          label: {
            normal: {
              show: true,
              position: 'right',
            },
          },
        },
        {
          name: 'neg',
          type: 'bar',
          stack: 'common',
          barGap: 0,
          data: data
            .map(d => (d.value >= 0 ? '-' : -d.value)),
          label: {
            normal: {
              show: true,
              position: 'left',
              formatter: '-{c}',
            },
          },
        },
        {
          name: 'net',
          type: 'bar',
          stack: 'common',
          barGap: 0,
          data: data.map((_, i) => (i === 0 ? cumSum[1] : '-')),
          label: {
            normal: {
              show: true,
              position: 'right',
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
      <GraphTitle>
        Relative changes in{' '}
        <Link
          outward
          href="https://en.wikipedia.org/wiki/Radiative_forcing"
          target="_blank"
          rel="noopener noreferrer"
        >
          radiative forcing
        </Link>
        {' '}in 2011 compared to 1750
      </GraphTitle>
      <GraphDescription>
        in W/m
        <sup>2</sup>
      </GraphDescription>
      <ReactEcharts
        option={option}
        notMerge
      />
      <Source>
        Source: Intergovernmental Panel on Climate Change (IPCC)
        {' '}
        <Link
          outward
          href="http://www.ipcc.ch/pdf/assessment-report/ar5/wg1/WG1AR5_Chapter08_FINAL.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          WG1 AR5, Fig. 8.15 p697
        </Link>
        {' '}(
        <Link
          outward
          href="http://www.ipcc.ch/report/ar5/wg1/docs/WG1AR5_AIISM_Datafiles.xlsx"
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
