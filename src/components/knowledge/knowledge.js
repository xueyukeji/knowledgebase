import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from 'element-react'
import { NavLink } from 'react-router-dom'
import SearchItem from './components/search-item.js'
import TagList from './components/tag-list.js'
import ListItem from './components/list-item.js'
import AddTag from './components/add-tag.js'

@inject(stores => {
    let { username, setUserName } = stores.test
    return {
        username,
        setUserName
    }
})
@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogVisible: false,
        }
    }
    showAddTagDialog = () => {
        this.setState({
            dialogVisible: true
        })
    }
    hideAddTagDialog = () => {
        this.setState({
            dialogVisible: false
        })
    }
    createTag = () => {
        console.log('create tag....')
    }
    render() {
        return (
            <div className="mod-homepage">
                <SearchItem />
                <TagList />
                <div>
                    <NavLink to="/add-knowledge-item"><Button type="primary">新增知识条目</Button></NavLink>
                    <Button type="primary" onClick={this.showAddTagDialog} >增加标签</Button>
                </div>
                <h4>知识条目</h4>
                <ListItem />
                <AddTag visible={this.state.dialogVisible} handleCancel={this.hideAddTagDialog} createTag={this.createTag} />
            </div>
        )
    }
}
