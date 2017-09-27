import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Select, Button, Dialog, Breadcrumb, Table } from 'element-react'

@inject(stores => {
    let { username, setUserName } = stores.test
    return {
        username,
        setUserName
    }
})

@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogVisible: false,
            form: {
                name: '',
                knowledge: '',
                desc: '',
                author: '',
                tags: []
            },
            columns: [
                {
                    type: 'selection'
                },
                {
                    label: '名称',
                    prop: 'name',
                    width: 200
                },
                {
                    label: '日期',
                    prop: 'date',
                    width: 120

                },
                {
                    label: '类型',
                    prop: 'type',
                    width: 100
                }
            ],
            data: [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                type: '1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                type: '1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                type: '1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                type: '1518 弄',
                zip: 200333
            }]
        };
    }
    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    render() {
        return (
            <div className="mod-addknowledge">
                <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="标题：">
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item label="类别：">
                        <Select value={this.state.form.region} placeholder="请选择活动区域">
                            <Select.Option label="区域一" value="shanghai"></Select.Option>
                            <Select.Option label="区域二" value="beijing"></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="描述：">
                        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <Form.Item label="作者：">
                        <Input value={this.state.form.author} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item label="标签：">
                        <Select value={this.state.form.tags} placeholder="请选择活动区域">
                            <Select.Option label="区域一" value="shanghai"></Select.Option>
                            <Select.Option label="区域二" value="beijing"></Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="附件：">
                        <Button size="small" type="primary" onClick={() => this.setState({ dialogVisible: true })}>选择文件</Button> <span className="select-flie-tips">从个人空间选择与知识相关的文件</span>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit">确定</Button>
                        <Button>取消</Button>
                    </Form.Item>
                </Form>
                {/* <selectfile */}
                <Dialog
                    title="选择云盘文件"
                    size="small"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}>
                    <Dialog.Body>
                        <Breadcrumb separator="/">
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                            <Breadcrumb.Item>活动列表</Breadcrumb.Item>
                            <Breadcrumb.Item>活动详情</Breadcrumb.Item>
                        </Breadcrumb>
                        <Table
                            style={{ width: '100%' }}
                            columns={this.state.columns}
                            data={this.state.data}
                            border={true}
                            height={250}
                            onSelectChange={(dataItem, checked) => { console.log(dataItem, checked) }}
                            onSelectAll={(dataList, checked) => { console.log(dataList, checked); }}
                        />
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="info" onClick={() => this.setState({ dialogVisible: false })}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}
