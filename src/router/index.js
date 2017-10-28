import React, { Component } from 'react';
import Nav from '../components/nav';
import Item from '../components/item/item.js';
import AddItem from '../components/item/add-item.js';
import EditItem from '../components/item/edit-item';
import ItemDetail from '../components/item/item-detail.js';
import MyContribution from '../components/mycontribution/my-contribution';
import MyCheck from '../components/approve/my-check'
import MyCheckDetail from '../components/approve/check-detail'
import Professor from '../components/professor/professor'
import Manage from '../components/manage/manage.js'
import SetPermission from '../components/manage/set-permission'
import { HashRouter as Router, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject(stores => {
    let { knowledgeObj, getKnowledgeList } = stores.manage;
    let { userInfo, getUserInfo } = stores.user;
    return {
        userInfo,
        getUserInfo,
        knowledgeObj,
        getKnowledgeList
    };
})
@observer
export default class AppRouter extends Component {
    componentWillMount() {
        const {getUserInfo, userInfo, getKnowledgeList} = this.props;
        getUserInfo().then(() => {
            let type = 'user'
            if (userInfo.data.userType === 0 || userInfo.data.userType === 1) {
                type = 'admin'
            }
            getKnowledgeList({
                userId: this.props.userInfo.data.userId,
                type
            });
        })
    }

    render() {
        const { userInfo, knowledgeObj: { librarys = []} } = this.props;
        if (!this.props.userInfo.data.userId) {
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
                        <Route path="/my-check" component={MyCheck} exact />
                        <Route path="/my-check/detail" component={MyCheckDetail} />
                        <Route path="/professor" component={Professor}/>
                        <Route path="/manage" component={Manage} />
                        <Route path="/set-permission/:id" component={SetPermission} />
                        <Route path="/add-item/:id" component={AddItem} />
                        <Route path="/edit-item/:id/:itemId" component={EditItem} />
                        <Route path="/item-detail/:id" component={ItemDetail} />
                    </div>
                </div>
            </Router>
        );
    }
}
