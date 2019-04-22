import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import './assets/css/index.css';
import App from './App';
import Theme from './assets/js/Theme'
import * as serviceWorker from './serviceWorker';
import './assets/js/config'
const history =  createBrowserHistory()
const app = (
    <Router history={history}>
        <Theme>
            <App history={history}/>
        </Theme>
    </Router>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
