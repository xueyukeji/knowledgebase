import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import SearchItem from './components/search-item.js';
import TagList from './components/tag-list.js';
import ListItem from './components/list-item.js';

@inject(stores => {
    let {
        userInfo
    } = stores.user
    let {
        knowledgeList,
    } = stores.manage;
    return {
        knowledgeList,
        userInfo
    }
})
@observer
export default class Knowledge extends Component {
    render() {
        if (!this.props.match.params.id && this.props.knowledgeList[0]) {
            return <Redirect to={`/knowledge/${this.props.knowledgeList[0].id}`} />;
        }
        if (!this.props.match.params.id && this.props.userInfo && this.props.userInfo.data) {
            if (this.props.userInfo.data.userType === 0 || this.props.userInfo.data.userType === 1) {
                return <Redirect to='/manage' />;
            }
        }
        if (this.props.knowledgeList.length === 0) {
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
