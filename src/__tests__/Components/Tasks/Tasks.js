import React from 'react';
import { shallow, mount } from 'enzyme';
import Tasks from '../../../Components/Tasks/Tasks';

describe('<Tasks />', () => {
  it('renders without crashing', () => {
    shallow(<Tasks />);
  });

  it('has correct class', () => {
    const component = shallow(<Tasks />);
    expect(component).toHaveClassName('tasks');
  });

  it('renders TaskTracks', () => {
    const component = mount(<Tasks />);
    expect(component.find('.task-track')).toBePresent();
  });
});
