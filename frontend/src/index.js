import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Movement from './Movement';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <Movement />
  </React.StrictMode>,
  document.getElementById('movement')
);