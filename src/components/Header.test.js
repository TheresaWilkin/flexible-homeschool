import React from 'react';
import ReactDOM from 'react-dom';
import {HeaderMock, logout} from './Header';
import { BrowserRouter } from 'react-router-dom'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><HeaderMock data={{}} /></BrowserRouter>, div);
});

  it('logout should clear user from localStorage', () => {
    const SECRET = 'bar';
    localStorage.setItem(GC_USER_ID, SECRET)
    localStorage.setItem(GC_AUTH_TOKEN, SECRET)
    logout();
    expect(localStorage.setItem).toHaveBeenLastCalledWith(GC_AUTH_TOKEN, SECRET);
    expect(localStorage.__STORE__).toEqual({});
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });
