import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {Provider} from 'react-redux';
import reduxStore from './ReduxStore';

import {positions, transitions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options ={
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={reduxStore}>
    <AlertProvider template = {AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);


