import React from 'react';
import LineCharts from '.';

export default {
  title: 'LineCharts',
  component: LineCharts,
};

const chartDatasetsWithOneWord = [
  {
    title: 'bob',
    data: [{ y: 1, x: 2 }, { y: 0.3, x: 3 }, { y: 0.6, x: 7 }],
    tooltipItems: [{ title: 'y', key: 'y' }],
  },
];

const chartDatasetsWithTwoWords = [
  {
    title: 'bob',
    data: [{ y: 1, x: 2 }, { y: 0.3, x: 3 }, { y: 0.6, x: 7 }],
  },
  {
    title: 'bill',
    data: [{ y: 1, x: 2 }, { y: 0.3, x: 3 }, { y: 0.6, x: 7 }],
  },
];

const getProps = dataSource => ({
  datasets: dataSource,
  yAxisKey: 'y',
  xAxisKey: 'x',
  displayAbsolute: false,
  tooltipItems: [{ title: 'y', key: 'y' }],
});

export const LineChartWithOneDataSource = () => (
  <LineCharts {...getProps(chartDatasetsWithOneWord)} />
);

export const LineChartWithTwoDataSources = () => (
  <LineCharts {...getProps(chartDatasetsWithTwoWords)} />
);
