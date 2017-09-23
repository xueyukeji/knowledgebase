import React, { Component } from 'react';
import './style/app.scss';
import {Provider} from 'mobx-react';
import store from './store';
import Test from './components/test'
import Test2 from './components/test2'
import Nav from './components/nav'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Provider {...store}>
                <Router>
                    <div>
                        <Nav />
                        <Route exact path="/test1" component={Test}/>
                        <Route path="/test2" component={Test2}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
