import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'element-react-codish';
import { NavLink, Redirect } from 'react-router-dom';
import SearchItem from './components/search-item.js';
import TagList from './components/tag-list.js';
import ListItem from './components/list-item.js';

@inject(stores => {
    let {
        tags,
        getTags,
    } = stores.tag;
    let {
        knowledgeList,
    } = stores.manage;
    return {
        tags,
        getTags,
        knowledgeList
    }
})
@observer
export default class Knowledge extends Component {

    render() {
        if (!this.props.match.params.id) {
            if (this.props.knowledgeList[0]) {
                return <Redirect to={`/knowledge/${this.props.knowledgeList[0].id}`} />;
            } else {
                return <Redirect to={'/manage'} />;
            }
        }
        return (
            <div className="mod-homepage">
                <SearchItem />
                <TagList />
                <div className="btn-groups">
                    <NavLink to={`/add-item/${this.props.match.params.id}`}><Button type="primary">新增知识条目</Button></NavLink>
                </div>
                <h4>知识条目</h4>
                <ListItem />
            </div>
        )
    }
}
