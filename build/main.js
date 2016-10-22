import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

// Need this line to compile scss files to css with webpack
import './css/main.scss';
import App from './app';

render(
    <Router history={browserHistory}>
        <Route path="/" component={App} >
            <Route path="/active" />
            <Route path="/completed" />
        </Route>
    </Router>
, document.getElementById('app'))