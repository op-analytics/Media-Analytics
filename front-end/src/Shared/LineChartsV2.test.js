import React from 'react';
import { shallow } from 'enzyme';
import LineCharts from './LineChartsV2';

const chartDatasetsWithOneWord = [{ labels: [], datasets: [{ data: [{ word: 'bob' }] }] }];
const chartDatasetsWithTwoWords = [
  { labels: [], datasets: [{ data: [{ word: 'bob' }] }] },
  { labels: [], datasets: [{ data: [{ word: 'phil' }] }] },
];
// eslint-disable-next-line react/jsx-props-no-spreading
const getWrapper = props => shallow(<LineCharts {...props} />);

describe('LineChart', () => {
  it('renders a chart for a dataset of one word', () => {
    const wrapper = getWrapper({ chartDatasets: chartDatasetsWithOneWord });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a chart for a dataset of multiple words', () => {
    const wrapper = getWrapper({ chartDatasets: chartDatasetsWithTwoWords });
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const wrapper = getWrapper({ chartDatasets: chartDatasetsWithOneWord });
    expect(wrapper).toMatchSnapshot();
  });
});
