import React, { Component } from 'react'
import { Layout, Button } from 'element-react'
import { inject, observer } from 'mobx-react'
import AddKnowLedge from './components/add-knowledge.js'
import KnowledgeList from './components/knowledge-list.js'

@inject(stores => {
    let {
        showEditKnowledgeDialog,
        hideEditKnowledgeDialog
    } = stores.manage;
    return {
        showEditKnowledgeDialog,
        hideEditKnowledgeDialog
    }
})
@observer
export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
    }

    show = () => {
        this.props.showEditKnowledgeDialog()
    }

    render() {
        return (
            <Layout.Row className="mod-manage" gutter="10">
                <Layout.Col span="24">
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
                <AddKnowLedge />
            </Layout.Row>
        )
    }
}
