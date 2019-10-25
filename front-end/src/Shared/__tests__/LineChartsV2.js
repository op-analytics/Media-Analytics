import React from 'react';
import { shallow } from 'enzyme';
import LineCharts from '../LineChartsV2';
const chartDatasetsWithOneWord = [
  {
    title: 'bob',
    data: [{ y: 1 }],
  },
];
const chartDatasetsWithTwoWords = [
  {
    title: 'bob',
    data: [{ y: 1 }],
  },
  {
    title: 'bill',
    data: [{ y: 1 }],
  },
];
// eslint-disable-next-line react/jsx-props-no-spreading
const getWrapper = props => shallow(<LineCharts {...props} />);

describe('LineChart', () => {
  it('renders a chart for a dataset of one word', () => {
    const wrapper = getWrapper({
      datasets: chartDatasetsWithOneWord,
      yAxisKey: 'y',
      tooltipItems: [{ title: 'y', key: 'y' }],
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a chart for a dataset of multiple words', () => {
    const wrapper = getWrapper({
      datasets: chartDatasetsWithTwoWords,
      yAxisKey: 'y',
      tooltipItems: [{ title: 'y', key: 'y' }],
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = getWrapper({
      datasets: chartDatasetsWithOneWord,
      yAxisKey: 'y',
      tooltipItems: [{ title: 'y', key: 'y' }],
    });
    expect(wrapper).toMatchSnapshot();
  });
});
