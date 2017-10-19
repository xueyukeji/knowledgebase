import React, { Component } from 'react';
import Nav from '../components/nav';
import Item from '../components/item/item.js';
import AddItem from '../components/item/add-item.js';
import ItemDetail from '../components/item/item-detail.js';
import MyContribution from '../components/mycontribution/my-contribution'
// import MyCheck from '../components/my-check'
// import MyCheckDetail from '../components/check-detail'
// import Professor from '../components/professor'
import Manage from '../components/manage/manage.js';
import { HashRouter as Router, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject(stores => {
    let {
        knowledgeObj,
        getKnowledgeList
    } = stores.manage;
    let {
        userInfo,
        getUserInfo
    } = stores.user;
    return {
        userInfo,
        knowledgeObj,
        getKnowledgeList,
        getUserInfo
    }
})
@observer
export default class AppRouter extends Component {
    componentWillMount() {
        // TODO 根据用户查知识库
        this.props.getUserInfo()
        this.props.getKnowledgeList({userId: 97});
    }

    render() {
        const { userInfo, knowledgeObj: { librarys = []} } = this.props;
        if (!this.props.userInfo) {
            return <div>正在加载数据...</div>
        }
        return (
            <Router>
                <div className="wrap">
                    <Nav userInfo={userInfo} list={librarys} />
                    <div className="wrap-right">
                        <Route path="/" component={Item} exact />
                        <Route path="/knowledge/:id" component={Item} />
                        <Route path="/my-contribution" component={MyContribution} />
                        {/**
                        <Route path="/my-check" component={MyCheck} exact />
                        <Route path="/my-check/detail" component={MyCheckDetail} />
                        <Route path="/professor" component={Professor}/>**/}
                        <Route path="/manage" component={Manage} />
                        <Route path="/add-item/:id" component={AddItem} />
                        <Route path="/item-detail/:id" component={ItemDetail} />
                    </div>
                </div>
            </Router>
        )
    }
}
