import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from 'element-react-codish';
import { NavLink, Redirect } from 'react-router-dom';
import SearchItem from './components/search-item.js';
import TagList from './components/tag-list.js';
import ListItem from './components/list-item.js';
import AddTag from './components/add-tag.js';

@inject(stores => {
    let {
        tags,
        getTags,
        isAddTagPopVisible,
        showAddTagPop,
        hideAddTagPop
    } = stores.tag;
    let {
        knowledgeList,
    } = stores.manage;
    return {
        tags,
        getTags,
        isAddTagPopVisible,
        showAddTagPop,
        hideAddTagPop,
        knowledgeList
    }
})
@observer
export default class Knowledge extends Component {
    showAddTagPop = () => {
        this.props.showAddTagPop();
    }

    hideAddTagPop = () => {
        this.props.hideAddTagPop();
    }

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
                    <NavLink to="/add-item"><Button type="primary">新增知识条目</Button></NavLink>
                    <Button type="primary" onClick={this.showAddTagPop} >增加标签</Button>
                </div>
                <h4>知识条目</h4>
                <ListItem />
                <AddTag
                    visible={this.props.isAddTagPopVisible}
                    handleCancel={this.hideAddTagPop} />
            </div>
        )
    }
}
