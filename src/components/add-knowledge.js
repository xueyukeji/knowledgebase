import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Select, Button } from 'element-react'

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
        super(props);

        this.state = {
            form: {
                name: '',
                knowledge: '',
                desc: '',
                author: '',
                tags: []
            },
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
            <Form className="mod-addknowledge" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
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
                    <Button size="small" type="primary">选择文件</Button> <span className="select-flie-tips">从个人空间选择与知识相关的文件</span>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" nativeType="submit">确定</Button>
                    <Button>取消</Button>
                </Form.Item>
            </Form>
        )
    }
}
