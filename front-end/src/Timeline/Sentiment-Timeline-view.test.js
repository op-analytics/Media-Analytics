import React from 'react';
import { shallow } from 'enzyme';
import Timeline from './Sentiment-Timeline-view';

const getWrapper = () => shallow(<Timeline />);

describe('Timeline', () => {
  it('should render a Form', () => {
    expect(
      getWrapper()
        .find('Form')
        .exists(),
    );
  });

  it('should render a Grid', () => {
    expect(
      getWrapper()
        .find('Grid')
        .exists(),
    );
  });
  it('should render correctly', () => {
    const component = shallow(<Timeline />);
    expect(component).toMatchSnapshot();
  });
});
