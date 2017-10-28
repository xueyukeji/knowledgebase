import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Message } from 'element-react-codish';
import { Select } from 'antd';

@inject(stores => {
    let {
        curPermissio11n,
    } = stores.manage;
    return {
        curPermissio11n,
    };
})
@observer
export default class AddKnowledge extends Component {
    state = {
        checkExperts: [
            {professorId: 1, name: 'one'},
            {professorId: 2, name: 'two'},
            {professorId: 3, name: 'three'},
            {professorId: 4, name: 'four'},
            {professorId: 5, name: 'five'},
            {professorId: 6, name: 'six'},
        ],
        tags: [
            {id: 1, name: 'one'},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'},
            {id: 4, name: 'four'},
            {id: 5, name: 'five'},
            {id: 6, name: 'six'},
        ],
        professorId: null,
        tagIds: [],
    }
    componentDidMount() {
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
        // const {title, addPermission, editPermission} = this.props
        // let params = {
        //     professorId: this.state.professorId,
        //     tagIds: this.state.tagIds
        // }
        // if (title === '添加权限') {
        //     addPermission(params).then((res) => {
        //         if (res.code !== 200) {
        //             Message(res.msg);
        //             return;
        //         }
        //         console.log('addPermission event', res)
        //     })
        // } else {
        //     editPermission(params).then((res) => {
        //         if (res.code !== 200) {
        //             Message(res.msg);
        //             return;
        //         }
        //         console.log('editPermission event', res)
        //     })
        // }
    }
    render() {
        console.log('setPermissionDialig: curPermission', this.props.curPermission)
        const Option = Select.Option;
        const { visible, title, hideDialog, curPermission } = this.props
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
                            style={{ width: 200 }}
                            placeholder="请选择专家"
                            optionFilterProp="children"
                            defaultValue={curPermission.name}
                            onChange={this.handleChangeProfessor}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.state.checkExperts.map((user, index) => {
                                    return (
                                        <Option key={index} value={user.professorId.toString()}>{user.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="check-tags">
                        <label>审核标签：</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="请选择要审核的标签"
                            defaultValue={['1', '6']}
                            onChange={this.handleChangeTags}
                        >
                            {
                                this.state.tags.map((user, index) => {
                                    return (
                                        <Option key={index} value={user.id.toString()}>{user.name}</Option>
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
