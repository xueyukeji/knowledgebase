import React, { Component } from 'react';
import {Provider} from 'mobx-react';
import store from './store';
import AppRouter from './router';

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
