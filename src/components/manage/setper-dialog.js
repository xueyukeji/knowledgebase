import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Message } from 'element-react-codish';
import { Select, Modal } from 'antd';
import { Loading } from 'element-react-codish';

@inject(stores => {
    let {
        professors,
        getProfessors,
        firstLevelTags,
        getFirstLevelTags,
        addPermission,
        editPermission,
        getPermissions
    } = stores.manage;
    return {
        professors,
        getProfessors,
        firstLevelTags,
        getFirstLevelTags,
        addPermission,
        editPermission,
        getPermissions
    };
})
@observer
class SetPerDialog extends Component {
    componentWillMount() {
        this.props.getProfessors(this.props.match.params.id)
        this.props.getFirstLevelTags(this.props.match.params.id)
    }
    handleChangeProfessor=(value) => {
        this.setState({
            professorId: value
        })
    }
    handleChangeTags = (value) => {
        this.setState({
            tagIds: value
        })
    }
    comfirm = () => {
        const {title, match, addPermission, editPermission, curPermission} = this.props
        let params = {
            id: match.params.id,
            professorId: this.state.professorId ? this.state.professorId : curPermission.userInfo.userId,
            tagIds: this.state.tagIds
        }
        if (title === '添加权限') {
            addPermission(params).then((res) => {
                this.dealResMsg(title, res)
            })
        } else {
            editPermission(params).then((res) => {
                this.dealResMsg(title, res)
            })
        }
    }
    dealResMsg = (title, res) => {
        if (res.code !== 200) {
            Message(res.msg);
            return;
        }
        this.props.getPermissions(this.props.match.params)
        title === '添加权限' ? Message('添加权限成功') : Message('编辑权限成功')
        this.props.hideDialog()
    }
    render() {
        const Option = Select.Option;
        const {
            visible,
            title,
            hideDialog,
            curPermission,
            professors,
            firstLevelTags
        } = this.props
        let defaultProfessor = '', defaultTags = []
        if (curPermission.tagInfos.length && firstLevelTags && firstLevelTags.length) {
            defaultProfessor = curPermission.userInfo.userName
            curPermission.tagInfos.forEach((tag) => {
                defaultTags.push(tag.id + '')
            })
        } else {
            if (firstLevelTags === null) {
                return <Loading text="拼命加载中" />
            } else {
                Modal.warning({
                    title: '提示',
                    content: '请先添加一级标签',
                });
                return <div></div>
            }
        }
        return (
            <Dialog
                className="mod-setper-dialog"
                title={title}
                size="small"
                closeOnClickModal={false}
                visible={visible}
                onCancel={hideDialog}
                lockScroll={false}
            >
                <Dialog.Body>
                    <div className="check-expert">
                        <label>审核人：</label>
                        <Select
                            showSearch
                            placeholder="请选择专家"
                            optionFilterProp="children"
                            defaultValue={defaultProfessor}
                            onChange={this.handleChangeProfessor}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                professors.map((user) => {
                                    return (
                                        <Option key={user.userId} value={user.userId.toString()}>{user.userName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="check-tags">
                        <label>审核标签：</label>
                        <Select
                            mode="multiple"
                            placeholder="请选择要审核的标签"
                            defaultValue={defaultTags}
                            onChange={this.handleChangeTags}
                        >
                            {
                                firstLevelTags.map((tag) => {
                                    return (
                                        <Option key={tag.id} value={tag.id + ''}>{tag.tag}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button  onClick={ hideDialog } >取消</Button>
                    <Button type="info" onClick={this.comfirm}>确定</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}
export default withRouter(SetPerDialog)
