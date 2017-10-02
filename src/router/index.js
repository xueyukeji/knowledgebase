import React, { Component } from 'react';
import Nav from '../components/nav'
import Top from '../components/top'
import Knowledge from '../components/knowledge/knowledge.js'
import AddKnowledgeItem from '../components/knowledge/add-knowledge-item.js'
import MyContribution from '../components/my-contribution'
import Manage from '../components/manage/manage.js'
import MyCheck from '../components/my-check'
import MyCheckDetail from '../components/check-detail'
import Professor from '../components/professor'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div className="wrap">
                    <Nav />
                    <Top />
                    <div className="wrap-right">
                        <Route path="/knowledge" component={Knowledge} />
                        <Route path="/my-contribution" component={MyContribution} />
                        <Route path="/my-check" component={MyCheck} />
                        <Route path="/my-check/detail" component={MyCheckDetail}/>
                        <Route path="/professor" component={Professor}/>
                        <Route path="/manage" component={Manage}/>
                        <Route path="/add-knowledge-item" component={AddKnowledgeItem}/>
                    </div>
                </div>
            </Router>
        )
    }
}
