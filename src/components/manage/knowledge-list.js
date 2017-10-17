import React, { Component } from 'react'
import { Button, MessageBox, Message } from 'element-react-codish'
import { inject, observer } from 'mobx-react'
import AddTag from './add-tag.js';
import SetPermission from './set-permission.js';
import SetExpert from './set-expert.js';

@inject(stores => {
    let {
        showEditKnowledgeDialog,
        knowledgeList,
        getKnowledgeList,
        removeKnowledge,
    } = stores.manage;
    let {
        isAddTagPopVisible,
        showAddTagPop,
        hideAddTagPop,
        setCurLibId,
        getTags,
        setTags
    } = stores.tag
    return {
        showEditKnowledgeDialog,
        knowledgeList,
        getKnowledgeList,
        removeKnowledge,
        isAddTagPopVisible,
        showAddTagPop,
        hideAddTagPop,
        setCurLibId,
        getTags,
        setTags
    };
})
@observer
export default class Manage extends Component {
    state = {
        permissionDialog: false,
        expertDialog: false
    }

    componentWillMount() {
        this.props.getKnowledgeList();
    }

    showAddTagPop = (id) => {
        this.props.showAddTagPop();
        this.props.setCurLibId(id)
        this.props.getTags({
            libraryId: id,
            isCustom: 0
        })
    }

    hideAddTagPop = () => {
        this.props.hideAddTagPop();
        this.props.setTags([]);
    }

    delKnowledge = (id) => {
        MessageBox.confirm('此操作将永久删除该知识库, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            this.props.removeKnowledge(id).then(() => {
                Message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.props.getKnowledgeList();
            })
        }).catch(() => { });
    }

    showSetPerDialog = () => {
        this.setState({
            permissionDialog: true
        })
    }

    hideSetPerDialog = () => {
        this.setState({
            permissionDialog: false
        })
    }

    showSetExpertDialog = () => {
        this.setState({
            expertDialog: true
        })
    }

    hideSetExpertDialog = () => {
        this.setState({
            expertDialog: false
        })
    }

    render() {
        let { knowledgeList } = this.props;
        return (
            <div>
                <ul className="manage-list">
                    {
                        knowledgeList.map(item => {
                            return (
                                <li key={item.id}>
                                    <span className="title">{item.name}</span>
                                    <div className="op-btns">
                                        {/*<Button type="text" onClick={this.showSetPerDialog}>设置权限</Button>*/}
                                        <Button type="text" onClick={this.showSetExpertDialog}>设置用户</Button>
                                        <Button type="text" onClick={this.showSetExpertDialog}>设置专家</Button>
                                        <Button type="text" onClick={() => { this.showAddTagPop(item.id) }}>管理标签</Button>
                                        <Button type="text" onClick={() => {
                                            this.props.showEditKnowledgeDialog(item)
                                        }}>编辑</Button>
                                        <Button type="text" onClick={() => {
                                            this.delKnowledge(item.id)
                                        }}>删除</Button>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                {
                    this.props.isAddTagPopVisible ?
                        <AddTag visible={true} handleCancel={this.hideAddTagPop} />
                        : null
                }
                {
                    this.state.permissionDialog ?
                        <SetPermission visible={true} handleCancel={this.hideSetPerDialog} />
                        : null
                }
                {
                    this.state.expertDialog ?
                        <SetExpert visible={true} handleCancel={this.hideSetExpertDialog} />
                        : null
                }
            </div>
        )
    }
}
