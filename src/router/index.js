import React, { Component } from 'react'
import Test from '../components/test'
import Test2 from '../components/test2'
import Nav from '../components/nav'
import Top from '../components/top'
import MyCheck from '../components/my-check'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div className="wrap">
                    <Nav />
                    <Top />
                    <Route exact path="/test1" component={Test}/>
                    <Route path="/test2" component={Test2}/>
                    <Route path="/my-check" component={MyCheck}/>
                </div>
            </Router>
        )
    }
}
