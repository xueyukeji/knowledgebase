import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Button } from 'element-react'
import { NavLink } from 'react-router-dom'
import SearchItem from './search-item.js'
import LeaderBoard from './leader-board.js'
import ListItem from './list-item.js'
import AddTag from './add-tag.js'

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
    showAddDialog() {
        this.state.dialogVisible = true
        console.log('dianwo a ', this.state)
    }
    render() {
        return (
            <div className="mod-homepage">
                <Layout.Row gutter="20">
                    <Layout.Col span="12">
                        <SearchItem />
                        <div className="tr">
                            <NavLink to="/add-knowledge"><Button type="primary">新增知识条目</Button></NavLink>
                        </div>
                    </Layout.Col>
                    <Layout.Col span="12">
                        <LeaderBoard />
                        <Button type="primary" onClick={this.showAddDialog.bind(this)} >增加标签</Button>
                    </Layout.Col>
                </Layout.Row>
                <h4>知识条目</h4>
                <ListItem />
                <AddTag visible={this.state.dialogVisible} />
            </div>
        )
    }
}
