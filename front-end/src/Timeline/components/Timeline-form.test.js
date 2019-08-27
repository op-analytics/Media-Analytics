import React from 'react';
import { shallow } from 'enzyme';
import Form from './Timeline-form';

const props = {
  setTimelineData: jest.fn(),
};

// eslint-disable-next-line react/jsx-props-no-spreading
const getWrapper = () => shallow(<Form {...props} />);

describe('Form', () => {
  it('should render a <form>', () => {
    expect(getWrapper().exists('form')).toBe(true);
  });

  it('renders correctly', () => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    const component = shallow(<Form {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('is fillable', () => {
    const testData = { yearFrom: '1980', yearTo: '1990', word: 'man' };

    const wordInput = getWrapper().find('Word');
    wordInput.value = testData.word;
    expect(wordInput.value).toBe('man');

    const yearFromInput = getWrapper().find('year-from');
    yearFromInput.value = testData.yearFrom;
    expect(yearFromInput.value).toBe('1980');

    const yearToInput = getWrapper().find('year-to');
    yearToInput.value = testData.yearTo;
    expect(yearToInput.value).toBe('1990');
  });
});
