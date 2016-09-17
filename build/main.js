import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

// Need this line to compile scss files to css with webpack
import Css from './css/main.scss';

ReactDOM.render(<App />, document.getElementById('app'))