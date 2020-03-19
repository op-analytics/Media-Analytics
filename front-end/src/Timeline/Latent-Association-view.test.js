import { shallow } from 'enzyme';
import React from 'react';
import Timeline from './Latent-Association-view';

const getWrapper = () => shallow(<Timeline />);

describe('Timeline', () => {
  it('should render a Form', () => {
    expect(
      getWrapper()
        .find('Form')
        .exists(),
    );
  });

  it('should render correctly', () => {
    const component = shallow(<Timeline />);
    expect(component).toMatchSnapshot();
  });
});
