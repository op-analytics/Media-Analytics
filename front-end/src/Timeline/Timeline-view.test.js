import React from 'react';
import { shallow } from 'enzyme';
import Timeline from './Timeline-view';

describe('Timeline', () => {
  it('should render a Form', () => {
    const component = shallow(<Timeline />);
    expect(component.find('Form').exists());
  });
});

describe('Timeline', () => {
  it('should render a Frid', () => {
    const component = shallow(<Timeline />);
    expect(component.find('Grid').exists());
  });
});
