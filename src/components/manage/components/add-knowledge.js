import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Dialog, Input, Message } from 'element-react'

@inject(stores => {
    let {
        isShowEditKnowledgeDialog,
        hideEditKnowledgeDialog,
        curKnowledge,
        creatKnowledge,
        modifyKnowledge,
        getKnowledgeList
    } = stores.manage;
    return {
        isShowEditKnowledgeDialog,
        hideEditKnowledgeDialog,
        curKnowledge,
        creatKnowledge,
        modifyKnowledge,
        getKnowledgeList
    }
})
@observer
export default class AddTag extends Component {
    constructor(props) {
        super(props)
        console.log('--------->', this.props)
        this.state = {
            name: this.props.curKnowledge ? this.props.curKnowledge.name : '',
            status: 1,
            audit: 1
        }
    }
    componentDidMount() {
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
    onChange = (v) => {
        this.setState({
            name: v
        });
    }
    create() {
        this.props.creatKnowledge({ name: this.state.name }).then((d) => {
            console.log('ddddd', d)
            Message.success('新增知识库成功！')
            this.props.handleCancel()
            this.props.getKnowledgeList()
        })
    }
    render() {
        return (
            <Dialog
                className="mod-addknowledge"
                title="新增知识库"
                size="small"
                visible={this.props.isShowEditKnowledgeDialog}
                onCancel={() => {
                    this.props.hideEditKnowledgeDialog()
                }}
                lockScroll={false}>
                <Dialog.Body>
                    <div className="name">
                        <label>名称：</label>
                        <Input value={this.state.name} onChange={this.onChange} placeholder="请输入内容" />
                    </div>
                    {/* <div className="status">
                        <label>状态设置：</label>
                        <div className="status-content">
                            <div>
                                <span>状态：</span>
                                <Radio value="1" checked={this.state.status === 1} onChange={this.onChangeStatus}>开放</Radio>
                                <Radio value="2" checked={this.state.status === 2} onChange={this.onChangeStatus}>指定</Radio>
                            </div>
                            <div>
                                <span>审核：</span>
                                <Radio value="1" checked={this.state.audit === 1} onChange={this.onChangeAudit}>免审</Radio>
                                <Radio value="2" checked={this.state.audit === 2} onChange={this.onChangeAudit}>受审</Radio>
                            </div>
                        </div>
                    </div> */}
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={() => {
                        this.props.hideEditKnowledgeDialog()
                    }}>取消</Button>
                    <Button type="info" onClick={this.create.bind(this)}>确定</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
