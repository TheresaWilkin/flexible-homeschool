import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

describe('<App /> without connect', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('has correct class', () => {
    const component = shallow(<App />);
    expect(component).toHaveClassName('app');
  });
});
