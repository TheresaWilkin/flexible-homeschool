import React from 'react';
import { shallow, mount } from 'enzyme';
import ModalDocument from '../../../Components/ModalDocuments/ModalDocument';

describe('<ModalDocument />', () => {
  it('renders without crashing', () => {
    shallow(<ModalDocument />);
  });

  it('has correct class', () => {
    const component = shallow(<ModalDocument />);
    expect(component).toHaveClassName('modal-document');
  });

  it('renders modal-documents', () => {
    const component = mount(<ModalDocument />);
    expect(component.find('.modal-document')).toBePresent();
  });

  it('renders a default header with the correct title', () => {
    const component = mount(<ModalDocument />);
    expect(component.find('header h1')).toHaveText('Document');
  });

  it('renders a header with prop title', () => {
    const content = {
      title: 'Test Title',
    };
    const component = mount(<ModalDocument content={content} />);
    expect(component.find('header h1')).toHaveText('Test Title');
  });
});
