import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import 'element-theme-default/lib/index.css';
import 'react-select/dist/react-select.css';
import './assets/css/index.scss';
import App from './app';

if (process.env.NODE_ENV === 'development' || Cookies.get('ct')) {
    ReactDOM.render(<App />, document.getElementById('root'));
} else {
    window.location = '/login.html';
}
