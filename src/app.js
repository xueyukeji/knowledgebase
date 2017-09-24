import React, { Component } from 'react';
import {Provider} from 'mobx-react';
import store from './store';
import AppRouter from './router'
import 'element-theme-default/lib/index.css'

class App extends Component {
    render() {
        return (
            <Provider {...store}>
                <AppRouter />
            </Provider>
        );
    }
}

export default App;
