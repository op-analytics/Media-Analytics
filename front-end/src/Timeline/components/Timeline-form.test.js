import React from 'react';
import { shallow } from 'enzyme';
import Form from './Timeline-form';

describe('Form', () => {
  it('should render a form', () => {
    const component = shallow(<Form />);
    expect(component.find('form').exists());
  });

  it('is fillable when', () => {
    const component = shallow(<Form />);
    const testData = { yearFrom: '1980', yearTo: '1990', word: 'man' };

    const wordInput = component.find('Word');
    wordInput.value = testData.word;
    expect(wordInput.value).toBe('man');

    const yearFromInput = component.find('year-from');
    yearFromInput.value = testData.yearFrom;
    expect(yearFromInput.value).toBe('1980');

    const yearToInput = component.find('year-to');
    yearToInput.value = testData.yearTo;
    expect(yearToInput.value).toBe('1990');
  });
});
