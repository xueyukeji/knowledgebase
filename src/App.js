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
                    </div>
                    <Test />
                </div>
            </Provider>
        );
    }
}

export default App;
