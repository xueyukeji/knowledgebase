import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import SearchItem from './components/search-item.js';
import TagList from './components/tag-list.js';
import ListItem from './components/list-item.js';

@inject(stores => {
    let {
        tags,
        getTags,
    } = stores.tag;
    let {
        userInfo
    } = stores.user
    let {
        knowledgeList,
    } = stores.manage;
    return {
        tags,
        getTags,
        knowledgeList,
        userInfo
    }
})
@observer
export default class Knowledge extends Component {
    render() {
        if (this.props.match.params.id && this.props.knowledgeList[0]) {
            return <Redirect to={`/knowledge/${this.props.knowledgeList[0].id}`} />;
        }
        if (this.props.userInfo && this.props.userInfo.data) {
            if (this.props.userInfo.data.userType === 0 || this.props.userInfo.data.userType === 1) {
                return <Redirect to='/manage' />;
            }
        }
        {
            return (
                <div className="mod-homepage">
                    <SearchItem />
                    <TagList />
                    <h4>知识条目</h4>
                    <ListItem />
                </div>
            )
        }
    }
}
