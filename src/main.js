import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {App} from './components/app';
import './style/main.scss';

const root = document.getElementById('root');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), root);


