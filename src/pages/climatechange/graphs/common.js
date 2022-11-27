export const initialOption = () => (
  {
    xAxis: {},
    yAxis: {},
    grid: { top: 20, bottom: 45 },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
  }
);

export const parseGiss = gissObj => gissObj
  .split('\n').map(row => row
    .split(/ +/))
  .filter(row => +row[0]);

export const initialDataZoom = () => [
  {
    type: 'slider',
    showDataShadow: false,
    height: 10,
    borderColor: 'transparent',
    backgroundColor: '#e2e2e2',
    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
    handleSize: 15,
    handleStyle: {
      shadowBlur: 6,
      shadowOffsetX: 1,
      shadowOffsetY: 2,
      shadowColor: '#aaa',
    },
  },
];

export default () => null;
