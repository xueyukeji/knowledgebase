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
    let {
        getItemList,
        setSearchInput
    } = stores.item;
    let {
        getTags
    } = stores.tag
    return {
        knowledgeObj,
        userInfo,
        getItemList,
        setSearchInput,
        getTags
    }
})
@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clearTag: false
        }
    }
    getItemData = (params) => {
        this.props.getItemList(params);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            console.log(this.props.match.params.id)
            console.log(nextProps.match.params.id)
            // 清空搜索区、清空tag选择区、重新加载tag、重新加载items
            const { setSearchInput, getTags, match } = this.props
            setSearchInput('');
            this.setState({
                clearTag: true
            })
            getTags({
                libraryId: nextProps.match.params.id
            });
            const params = {
                libraryId: nextProps
                    ? parseInt(nextProps.match.params.id)
                    : parseInt(match.params.id),
                start: 0,
                limit: 10
            };
            this.getItemData(params)
        }
    }

    componentWillMount() {
        console.log()
    }

    render() {
        const { match, userInfo, knowledgeObj: { librarys = []} } = this.props;
        const curLibrary = librarys.filter((k) => {
            return k.id === parseInt(match.params.id)
        })
        if (!curLibrary.length && match.params.id) {
            if (librarys[0]) {
                return <Redirect to={`/knowledge/${librarys[0].id}`} />;
            }
        }
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
                <SearchItem getItemData={this.getItemData} />
                <TagList getItemData={this.getItemData} clearTag={this.state.clearTag} />
                <ListItem getItemData={this.getItemData} />
            </div>
        )
    }
}
