import React, { Component } from 'react'
import { Layout, Button } from 'element-react'
import { inject, observer } from 'mobx-react'
import AddKnowLedge from './components/add-knowledge.js'
import KnowledgeList from './components/knowledge-list.js'
@inject(stores => {
    console.log(stores)
})
@observer
export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddKnowledgeDialog: false
        }
    }
    show = () => {
        this.setState({
            showAddKnowledgeDialog: true
        })
    }
    hide = () => {
        this.setState({
            showAddKnowledgeDialog: false
        })
    }
    render() {
        return (
            <Layout.Row className="mod-manage" gutter="10">
                <Layout.Col span="20">
                    <div className="manage-wrap">
                        <div className="manage-title" >
                            知识库管理
                        </div>
                        <div className="tc">
                            <Button type="primary" onClick={this.show}>添加知识库</Button>
                        </div>
                        <KnowledgeList />
                    </div>
                </Layout.Col>
                <AddKnowLedge visible={this.state.showAddKnowledgeDialog} handleCancel={this.hide} />
            </Layout.Row>
        )
    }
}
