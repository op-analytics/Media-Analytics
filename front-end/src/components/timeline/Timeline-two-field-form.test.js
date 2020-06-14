import { shallow } from 'enzyme';
import React from 'react';

import Form from './Timeline-form';

const props = {
  onSubmitHandler: jest.fn(),
};

const getWrapper = () => shallow(<Form {...props} />);

describe('Form', () => {
  it('should render a <form>', () => {
    expect(getWrapper().exists('form')).toBe(true);
  });

  it('renders correctly', () => {
    const component = shallow(<Form {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('is fillable', () => {
    const testData = { yearFrom: '1980', yearTo: '1990', word: 'man' };

    const words1Input = getWrapper().find('words1');
    words1Input.value = testData.word;
    expect(words1Input.value).toBe('man');

    const words2Input = getWrapper().find('words1');
    words2Input.value = testData.word;
    expect(words2Input.value).toBe('man');

    const yearFromInput = getWrapper().find('year-from');
    yearFromInput.value = testData.yearFrom;
    expect(yearFromInput.value).toBe('1980');

    const yearToInput = getWrapper().find('year-to');
    yearToInput.value = testData.yearTo;
    expect(yearToInput.value).toBe('1990');
  });
});
