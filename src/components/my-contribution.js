import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Button } from 'element-react'
import { NavLink } from 'react-router-dom'
import ListItem from '../components/knowledge/components/list-item.js'

@inject(stores => {
    stores
})
@observer
export default class Knowledge extends Component {
    render() {
        return (
            <div className="mod-homepage">
                <Layout.Row gutter="20">
                    <Layout.Col span="12">
                        <div className="tr">
                            <NavLink to="/add-knowledge"><Button type="primary">新增知识条目</Button></NavLink>
                        </div>
                    </Layout.Col>
                    <Layout.Col span="12">
                        <Button type="primary">增加标签</Button>
                    </Layout.Col>
                </Layout.Row>
                <h4>知识条目</h4>
                <ListItem />
            </div>
        )
    }
}
