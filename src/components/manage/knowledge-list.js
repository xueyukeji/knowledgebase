import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, MessageBox, Message } from 'element-react-codish'
import { inject, observer } from 'mobx-react'
import AddTag from './add-tag.js';
import SetExpert from './set-expert.js';

@inject(stores => {
    let {
        userInfo
    } = stores.user
    let {
        getKnowledgeList,
        showEditKnowledgeDialog,
        knowledgeObj,
        removeKnowledge,
        setIsUserDiloag,
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
        userInfo,
        getKnowledgeList,
        showEditKnowledgeDialog,
        knowledgeObj,
        removeKnowledge,
        isAddTagPopVisible,
        showAddTagPop,
        hideAddTagPop,
        setCurLibId,
        getTags,
        setTags,
        setIsUserDiloag
    };
})
@observer
export default class Manage extends Component {
    state = {
        expertDialog: false,
        selectUsers: [],
        curLibrary: [],
        dialogTitle: '',
        actionType: ''
    }

    componentWillMount() {
        // this.props.getAdminKnowledgeList();
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
                this.getDatas()
            })
        }).catch(() => { });
    }

    getDatas = () => {
        const { userInfo, getKnowledgeList } = this.props;
        let type = 'user'
        if (userInfo.data.userType === 0 || userInfo.data.userType === 1) {
            type = 'admin'
        }
        getKnowledgeList({
            userId: userInfo.data.userId,
            type
        });
    }
    showSetExpertDialog = (item, isCheckedUser) => {
        this.props.setIsUserDiloag(isCheckedUser)
        this.setState({
            expertDialog: true,
            curLibrary: item,
            dialogTitle: isCheckedUser ? '设置用户' : '设置专家',
            selectUsers: isCheckedUser ? item.userIds : item.professorIds,
            actionType: isCheckedUser ? 'user' : 'expert'
        })
    }

    hideSetExpertDialog = () => {
        this.setState({
            expertDialog: false
        })
    }

    addTagPopup = () => {
        if (!this.props.isAddTagPopVisible) return;
        return (
            <AddTag getDatas={this.getDatas} visible={true} handleCancel={this.hideAddTagPop} />
        );
    }

    setExpertPopup = () => {
        if (!this.state.expertDialog) return;
        return (
            <SetExpert
                getDatas={this.getDatas}
                title={this.state.dialogTitle}
                visible={true}
                curLibrary={this.state.curLibrary}
                selectedUsers={this.state.selectUsers}
                handleCancel={this.hideSetExpertDialog}
                actionType={this.state.actionType} />
        );
    }

    render() {
        let { knowledgeObj, showLibraryDialog } = this.props;
        if (!knowledgeObj) {
            return <div>正在加载页面...</div>
        }
        return (
            <div>
                <ul className="manage-list">
                    {
                        knowledgeObj.librarys.map(item => {
                            return (
                                <li key={item.id}>
                                    <span className="title">{item.name}</span>
                                    <div className="op-btns">
                                        {
                                            item.auditType ?
                                                <NavLink to={`/set-permission/${item.id}`} key={item.id}>
                                                    <Button type="text" >设置权限</Button>
                                                </NavLink> : ''
                                        }
                                        {
                                            item.userType ? <Button type="text" onClick={() => {this.showSetExpertDialog(item, true)}}>设置用户</Button> : ''
                                        }
                                        {
                                            item.auditType ? <Button type="text" onClick={() => {this.showSetExpertDialog(item, false)}}>设置专家</Button> : ''
                                        }
                                        <Button type="text" onClick={() => { this.showAddTagPop(item.id) }}>管理标签</Button>
                                        <Button type="text" onClick={() => {
                                            showLibraryDialog(item)
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
                {this.addTagPopup()}
                {this.setExpertPopup()}
            </div>
        )
    }
}
