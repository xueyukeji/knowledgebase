import React, { Component } from 'react'
import { Layout, Button } from 'element-react-codish'
import { inject, observer } from 'mobx-react'
import AddKnowLedge from './components/add-knowledge.js'
import KnowledgeList from './components/knowledge-list.js'

@inject(stores => {
    let {
        showEditKnowledgeDialog,
        hideEditKnowledgeDialog
    } = stores.manage;
    let { userInfo } = stores.user
    return {
        showEditKnowledgeDialog,
        hideEditKnowledgeDialog,
        userInfo
    }
})
@observer
export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    show = () => {
        this.props.showEditKnowledgeDialog()
    }

    render() {
        if (this.props.userInfo.userType !== 0 || this.props.userInfo.userType !== 1 ) {
            return <div> 您没有权限访问此页面！！！ </div>
        }
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
