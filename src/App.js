import React, { Component } from 'react';
import logo from './logo.svg';
import './style/app.scss';
import {Provider} from 'mobx-react';
import store from './store';
import Test from './components/test'

class App extends Component {
    render() {
        return (
            <Provider {...store}>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to</h2>
                    </div>
                    <Test />
                    <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </div>
            </Provider>
        );
    }
}

export default App;
