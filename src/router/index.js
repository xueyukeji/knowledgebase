import React, { Component } from 'react';
import Home from '../components/home'
import Nav from '../components/nav'
import Top from '../components/top'
import Manage from '../components/manage'
import MyCheck from '../components/my-check'
import MyCheckDetail from '../components/check-detail'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div className="wrap">
                    <Nav />
                    <Top />
                    <div className="wrap-right">
                        <Route path="/home" component={Home} />
                        <Route path="/my-check" component={MyCheck} />
                        <Route path="/check-detail" component={MyCheckDetail}/>
                        <Route path="/manage" component={Manage}/>
                    </div>
                </div>
            </Router>
        )
    }
}
