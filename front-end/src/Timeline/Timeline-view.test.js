import React from 'react';
import { shallow } from 'enzyme';
import Timeline from './Timeline-view';

describe('Timeline', () => {
  it('should render a form', () => {
    const component = shallow(<Timeline />);
    expect(component.find('Form').exists());
  });
});