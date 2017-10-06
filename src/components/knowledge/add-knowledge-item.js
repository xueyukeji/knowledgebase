import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Select, Button } from 'element-react'
import SelectFile from './components/select-file.js'

@inject(stores => {
    let {
        knowledgeList,
        getKnowledgeList
    } = stores.manage
    let {
        parentTags,
        childTags,
        getTagsById
    } = stores.tag
    return {
        knowledgeList,
        getKnowledgeList,
        parentTags,
        childTags,
        getTagsById
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
                knowledges: [],
                desc: '',
                author: '',
                parentTags: [],
                childTags: []
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
    componentWillMount() {
        this.props.getKnowledgeList()
        this.props.getTagsById()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            form: {
                knowledges: nextProps.knowledgeList,
                parentTags: nextProps.parentTags,
                childTags: nextProps.childTags
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    showSelectFileDialog = () => {
        this.setState({
            dialogVisible: true
        })
    }
    hideSelectFileDialog = () => {
        this.setState({
            dialogVisible: false
        })
    }
    selectParentTag = (parentId) => {
        this.props.getTagsById({ parentId })
    }
    render() {
        return (
            <div className="mod-addknowledge-item">
                <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="标题：">
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item label="知识库：">
                        <Select value={this.state.form.knowledges} placeholder="请选择知识库">
                            {
                                this.state.form.knowledges.map(item => {
                                    return <Select.Option key={item.id} label={item.name} value={item.id}></Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="描述：">
                        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <Form.Item label="作者：">
                        <Input value={this.state.form.author} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item className="select-tags" label="标签：">
                        <Select value={this.state.form.parentTags} onChange={this.selectParentTag} placeholder="请选择一级标签">
                            {
                                this.state.form.parentTags.map(item => {
                                    return <Select.Option key={item.id} label={item.tag} value={item.id} ></Select.Option>
                                })
                            }
                        </Select>
                        <Select value={this.state.form.childTags} placeholder="请选择一级标签">
                            {
                                this.state.form.childTags.map(item => {
                                    return <Select.Option key={item.id} label={item.tag} value={item.id}></Select.Option>
                                })
                            }
                        </Select>
                        <Input className="default-tag" value={this.state.form.name}
                            onChange={this.onChange.bind(this, 'name')}
                            placeholder="自定义标签"></Input>
                    </Form.Item>
                    <Form.Item label="附件：">
                        <Button size="small" type="primary" onClick={this.showSelectFileDialog}>选择文件</Button> <span className="select-flie-tips">从个人空间选择与知识相关的文件</span>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit">确定</Button>
                        <Button>取消</Button>
                    </Form.Item>
                </Form>
                <SelectFile dialogVisible={this.state.dialogVisible} closeSelecFileDialog={this.hideSelectFileDialog} />
            </div>
        )
    }
}
