import React from 'react';
import ReactDOM from 'react-dom';
import 'element-theme-default/lib/index.css';
import './assets/css/index.scss';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
