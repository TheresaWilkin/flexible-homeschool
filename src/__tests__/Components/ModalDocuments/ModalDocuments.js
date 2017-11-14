import React from 'react';
import { shallow, mount } from 'enzyme';
import ModalDocuments from '../../../Components/ModalDocuments/ModalDocuments';
import modalData from '../../../Components/ModalDocuments/modalData';

describe('<ModalDocuments />', () => {
  it('renders without crashing', () => {
    shallow(<ModalDocuments />);
  });
  it('has correct class', () => {
    const component = shallow(<ModalDocuments modalData={modalData} />);
    expect(component).toHaveClassName('modal-documents');
  });
  it('renders modal-documents', () => {
    const component = mount(<ModalDocuments modalData={modalData} />);
    expect(component.find('.modal-document')).toBePresent();
  });
});
