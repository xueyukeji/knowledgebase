import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Dialog, Input, Radio, Message } from 'element-react'

@inject(() => {
    return {
    }
})
@observer
export default class AddTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 1,
            audit: 1
        }
    }
    onChangeStatus = (value) => {
        this.setState({
            status: value
        });
    }
    onChangeAudit = (value) => {
        this.setState({
            audit: value
        });
    }
    create = () => {
        Message.error('是个大傻逼')
        this.props.handleCancel()
    }
    render() {
        return (
            <Dialog
                className="mod-addknowledge"
                title="新增知识库"
                size="small"
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                lockScroll={false}>
                <Dialog.Body>
                    <div className="name">
                        <label>名称：</label>
                        <Input placeholder="请输入内容" />
                    </div>
                    <div className="status">
                        <label>状态设置：</label>
                        <div className="status-content">
                            <div>
                                <span>状态：</span>
                                <Radio value="1" checked={this.state.status === 1} onChange={this.onChangeStatus}>备选项</Radio>
                                <Radio value="2" checked={this.state.status === 2} onChange={this.onChangeStatus}>备选项</Radio>
                            </div>
                            <div>
                                <span>审核：</span>
                                <Radio value="1" checked={this.state.audit === 1} onChange={this.onChangeAudit}>备选项</Radio>
                                <Radio value="2" checked={this.state.audit === 2} onChange={this.onChangeAudit}>备选项</Radio>
                            </div>
                        </div>
                    </div>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.handleCancel}>取消</Button>
                    <Button type="info" onClick={this.create}>创建</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
