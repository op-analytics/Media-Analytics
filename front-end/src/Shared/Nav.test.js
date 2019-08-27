import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

const getWrapper = () => shallow(<Nav />);

describe('Nav', () => {
  it('Should render', () => {
    const nav = getWrapper();
    expect(nav.exists('nav')).toEqual(true);
  });

  it('Should render correctly', () => {
    const nav = getWrapper();
    expect(nav).toMatchSnapshot();
  });
});
