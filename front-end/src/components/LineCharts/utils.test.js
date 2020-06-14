import { shallow } from 'enzyme';
import React from 'react';

import { createTooltip } from './utils';

describe('Utils', () => {
  test('create tooltip function returns tooltip with all given items', () => {
    const Tooltip = createTooltip({}, [{ title: 'y', key: 'y' }]);
    const wrapper = shallow(
      <Tooltip active payload={[{ payload: { y: 'y' } }]} label="test" />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test(`create tooltip function returns tooltip with format functions applied`, () => {
    const Tooltip = createTooltip({}, [
      { title: 'y', key: 'y', formatFunction: item => `${item} test` },
    ]);
    const wrapper = shallow(
      <Tooltip active payload={[{ payload: { y: 'y' } }]} label="test" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
