import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.scss';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
