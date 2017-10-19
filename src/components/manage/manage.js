import React, { Component } from 'react';
import { Layout, Button } from 'element-react-codish';
import { inject, observer } from 'mobx-react';
import AddKnowLedge from './add-knowledge.js';
import KnowledgeList from './knowledge-list.js';

@inject(stores => {
    let {
        setCurLibrary
    } = stores.manage;
    let { userInfo } = stores.user
    return {
        setCurLibrary,
        userInfo
    }
})
@observer
export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowEditKnowledgeDialog: false
        }
    }

    showEditKnowledgeDialog = (params) => {
        if (params) {
            this.props.setCurLibrary(params)
        } else {
            this.props.setCurLibrary({})
        }
        this.setState({
            isShowEditKnowledgeDialog: true
        })
    }

    hideEditKnowledgeDialog = () => {
        this.setState({
            isShowEditKnowledgeDialog: false
        })
    }


    render() {
        const { userInfo } = this.props
        if (userInfo) {
            if (userInfo.data.userType !== 0 && userInfo.data.userType !== 1 ) {
                return <div> 您没有权限访问此页面！！！ </div>
            }
        }
        return (
            <Layout.Row className="mod-manage" gutter="10">
                <Layout.Col span="24">
                    <div className="manage-wrap">
                        <div className="manage-title" >
                            知识库管理
                        </div>
                        <div className="tc">
                            <Button type="primary" onClick={this.showEditKnowledgeDialog}>添加知识库</Button>
                        </div>
                        <KnowledgeList showLibraryDialog={this.showEditKnowledgeDialog}/>
                    </div>
                </Layout.Col>
                { this.state.isShowEditKnowledgeDialog ? <AddKnowLedge visible={true} hideLibraryDialog={this.hideEditKnowledgeDialog} /> : null }
            </Layout.Row>
        )
    }
}
