import React from 'react';
import { shallow } from 'enzyme';
import Form from '.';

const propsWith1Field = {
  onSubmit: jest.fn(),
  formData: [{ name: 'test' }],
};

const propsWith2Fields = {
  onSubmit: jest.fn(),
  formData: [{ name: 'test' }, { name: 'test2' }],
};

const getWrapper = props => shallow(<Form {...props} />);

describe('Form', () => {
  it('should render a <form>', () => {
    expect(getWrapper(propsWith1Field).exists('form')).toBe(true);
  });

  it('renders correctly with one field', () => {
    const component = shallow(<Form {...propsWith1Field} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with more than one field', () => {
    const component = shallow(<Form {...propsWith2Fields} />);
    expect(component).toMatchSnapshot();
  });

  test('is fillable', () => {
    const testData = { yearFrom: '1980', word: 'man' };
    const wrapper = getWrapper(propsWith2Fields);

    const wordInput = wrapper.find('test');
    wordInput.value = testData.word;
    expect(wordInput.value).toBe('man');

    const yearFromInput = wrapper.find('test2');
    yearFromInput.value = testData.yearFrom;
    expect(yearFromInput.value).toBe('1980');
  });
});
