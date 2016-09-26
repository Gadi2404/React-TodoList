// Need this line to compile scss files to css with webpack
import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';


ReactDOM.render(<App />, document.getElementById('app'))