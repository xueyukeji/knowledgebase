import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Dialog, Input, Message, MessageBox } from 'element-react-codish'

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
export default class AddKnowledge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '新增知识库',
            name: '',
            status: 1,
            audit: 1
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.curKnowledge.id ? '修改知识库' : '新增知识库',
            name: nextProps.curKnowledge.name
        })
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
        if (this.state.name.length === 0 || this.state.name.length > 8) {
            MessageBox.alert('知识库名称长度必须在1到8个字符')
            return
        }
        if (this.props.curKnowledge.id) {
            this.props.modifyKnowledge({ name: this.state.name, id: this.props.curKnowledge.id }).then(() => {
                this.getData()
            })
        } else {
            this.props.creatKnowledge({ name: this.state.name }).then(() => {
                this.getData()
            })
        }
    }
    getData = () => {
        const msg = this.props.curKnowledge.id ? '修改' : '新增'
        Message.success(msg + '知识库成功！')
        this.props.hideEditKnowledgeDialog()
        this.props.getKnowledgeList()
    }
    render() {
        return (
            <Dialog
                className="mod-addknowledge"
                title={this.state.title}
                size="small"
                closeOnClickModal={false}
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
