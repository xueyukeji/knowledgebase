import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {
    Button,
    Dialog,
    Input,
    Message,
    Radio
} from 'element-react-codish';

@inject(stores => {
    let {
        userInfo
    } = stores.user
    let {
        curKnowledge,
        creatKnowledge,
        modifyKnowledge,
        getKnowledgeList
    } = stores.manage;
    return {
        userInfo,
        curKnowledge,
        creatKnowledge,
        modifyKnowledge,
        getKnowledgeList
    };
})
@observer
export default class AddKnowledge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '新增知识库',
            name: '',
            userType: 0,
            auditType: 0
        };
    }
    componentDidMount() {
        const {curKnowledge} = this.props
        this.setState({
            title: curKnowledge.id ? '修改知识库' : '新增知识库',
            name: curKnowledge.name,
            userType: curKnowledge.userType || 0,
            auditType: curKnowledge.auditType || 0
        });
    }

    onChangeStatus = value => {
        this.setState({
            userType: value
        });
    };
    onChangeAudit = value => {
        this.setState({
            auditType: value
        });
    };
    onChange = v => {
        this.setState({
            name: v
        });
    };
    create() {
        // if (this.state.name.length === 0 || this.state.name.length > 8) {
        //     MessageBox.alert('知识库名称长度必须在1到8个字符');
        //     return;
        // }
        const {curKnowledge, modifyKnowledge, creatKnowledge} = this.props
        var params = {
            name: this.state.name,
            userType: parseInt(this.state.userType),
            auditType: parseInt(this.state.auditType)
        };
        if (curKnowledge.id) {
            params.id = curKnowledge.id
            modifyKnowledge(params).then(res => {
                if (res.code !== 200) {
                    Message(res.msg);
                    return;
                }
                this.getDatas();
            });
        } else {
            creatKnowledge(params).then(res => {
                if (res.code !== 200) {
                    Message(res.msg);
                    return;
                }
                this.getDatas();
            });
        }
    }
    getDatas() {
        const { curKnowledge, hideLibraryDialog, userInfo, getKnowledgeList} = this.props;
        let type = 'user'
        if (userInfo.data.userType === 0 || userInfo.data.userType === 1) {
            type = 'admin'
        }
        Message.success(curKnowledge.id ? '修改' : '新增' + '知识库成功！');
        hideLibraryDialog();
        getKnowledgeList({
            userId: userInfo.data.userId,
            type
        });
    }
    render() {
        const { visible, hideLibraryDialog } = this.props
        return (
            <Dialog
                className="mod-addknowledge"
                title={this.state.title}
                size="small"
                closeOnClickModal={false}
                visible={visible}
                onCancel={hideLibraryDialog}
                lockScroll={false}
            >
                <Dialog.Body>
                    <div className="name">
                        <label className="attr">名称：</label>
                        <Input
                            value={this.state.name}
                            onChange={this.onChange}
                            placeholder="请输入内容"
                        />
                    </div>
                    {
                        <div className="status">
                            <label className="attr">状态设置：</label>
                            <div className="status-content">
                                <div>
                                    <span>状态：</span>
                                    <Radio.Group
                                        value={this.state.userType}
                                        onChange={this.onChangeStatus}
                                    >
                                        <Radio value="0">开放</Radio>
                                        <Radio value="1">指定</Radio>
                                    </Radio.Group>
                                </div>
                                <div>
                                    <span>审核：</span>
                                    <Radio.Group
                                        value={this.state.auditType}
                                        onChange={this.onChangeAudit}
                                    >
                                        <Radio value="0">免审</Radio>
                                        <Radio value="1">受审</Radio>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                    }
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button
                        onClick={ hideLibraryDialog }
                    >
                取消
                    </Button>
                    <Button type="info" onClick={this.create.bind(this)}>
                确定
                    </Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}
