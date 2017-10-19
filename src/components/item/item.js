import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import SearchItem from './search-item.js';
import TagList from './tag-list.js';
import ListItem from './list-item.js';

@inject(stores => {
    let {
        userInfo
    } = stores.user
    let {
        knowledgeObj,
    } = stores.manage;
    return {
        knowledgeObj,
        userInfo
    }
})
@observer
export default class Knowledge extends Component {
    render() {
        const { match, userInfo, knowledgeObj: { librarys = []} } = this.props;
        if (!match.params.id && librarys[0]) {
            return <Redirect to={`/knowledge/${librarys[0].id}`} />;
        }
        if (!match.params.id && userInfo && userInfo.data) {
            if (userInfo.data.userType === 0 || userInfo.data.userType === 1) {
                return <Redirect to='/manage' />;
            }
        }
        if (librarys.length === 0) {
            return <div className="search-tips">尚未创建知识库</div>
        }
        return (
            <div className="mod-homepage">
                <SearchItem />
                <TagList />
                <ListItem />
            </div>
        )
    }
}
