import React, { Component } from 'react';
import Nav from '../components/nav'
import Top from '../components/top'
import Item from '../components/item/item.js'
import AddItem from '../components/item/add-item.js'
import MyContribution from '../components/my-contribution'
import Manage from '../components/manage/manage.js'
import MyCheck from '../components/my-check'
import MyCheckDetail from '../components/check-detail'
import Professor from '../components/professor'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {inject, observer} from 'mobx-react';

@inject(stores => {
    let {
        knowledgeList,
        getKnowledgeList
    } = stores.manage;
    return {
        knowledgeList,
        getKnowledgeList
    }
})
@observer
export default class AppRouter extends Component {
    componentDidMount() {
        this.props.getKnowledgeList();
    }

    render() {
        return (
            <Router>
                <div className="wrap">
                    <Nav list={this.props.knowledgeList} />
                    <Top />
                    <div className="wrap-right">
                        <Route path="/" component={Item} exact />
                        <Route path="/knowledge/:id" component={Item} />
                        <Route path="/my-contribution" component={MyContribution} />
                        <Route path="/my-check" component={MyCheck} exact />
                        <Route path="/my-check/detail" component={MyCheckDetail} />
                        <Route path="/manage" component={Manage}/>
                        <Route path="/professor" component={Professor}/>
                        <Route path="/add-item" component={AddItem}/>
                    </div>
                </div>
            </Router>
        )
    }
}
