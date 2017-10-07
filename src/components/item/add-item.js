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
    let {
        createItem
    } = stores.item
    return {
        knowledgeList,
        getKnowledgeList,
        parentTags,
        childTags,
        getTagsById,
        createItem
    }
})
@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogVisible: false,
            knowledges: [],
            parentTags: [],
            childTags: [],
            form: {
                name: '',
                desc: '',
                libraryId: '',
                creatorId: 98,
                creatorName: '',
                fileIds: [1, 2, 3],
                tagIds: [],
                parentTag: '',
                childTag: '',
                tag: ''
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
            knowledges: nextProps.knowledgeList,
            parentTags: nextProps.parentTags,
            childTags: nextProps.childTags
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        if (key === 'tag') {
            this.state.form.tagIds[2] = {
                id: '',
                tag: value
            }
        }
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

    selectKnowledge = (v) => {
        this.state.form.libraryId = v
    }

    selectParentTag = (parentId) => {
        this.state.form.parentTag = parentId
        this.state.form.tagIds[0] = {
            id: parentId
        }
        this.props.getTagsById({ parentId })
    }

    selectChildTag = (v) => {
        this.state.form.tagIds[1] = {
            id: v
        }
        this.state.form.childTag = v
    }
    confirmCreateItem() {
        console.log(this.state.form)
        this.props.createItem(this.state.form).then(() => {
            debugger
        })
        // todo
    }
    render() {
        return (
            <div className="mod-addknowledge-item">
                <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="标题：">
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                    </Form.Item>
                    <Form.Item label="知识库：">
                        <Select value={this.state.form.libraryId} onChange={this.selectKnowledge} placeholder="请选择知识库">
                            {
                                this.state.knowledges.map(item => {
                                    return <Select.Option key={item.id} label={item.name} value={item.id}></Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="描述：">
                        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <Form.Item label="作者：">
                        <Input value={this.state.form.creatorName} onChange={this.onChange.bind(this, 'creatorName')}></Input>
                    </Form.Item>
                    <Form.Item className="select-tags" label="标签：">
                        <Select value={this.state.form.parentTag} onChange={this.selectParentTag} placeholder="请选择一级标签">
                            {
                                this.state.parentTags.map(item => {
                                    return <Select.Option key={item.id} label={item.tag} value={item.id} ></Select.Option>
                                })
                            }
                        </Select>
                        <Select value={this.state.form.childTag} onChange={this.selectChildTag} placeholder="请选择二级标签">
                            {
                                this.state.childTags.map(item => {
                                    return <Select.Option key={item.id} label={item.tag} value={item.id}></Select.Option>
                                })
                            }
                        </Select>
                        <Input className="default-tag" value={this.state.form.tag}
                            onChange={this.onChange.bind(this, 'tag')}
                            placeholder="自定义标签"></Input>
                    </Form.Item>
                    <Form.Item label="附件：">
                        <Button size="small" type="primary" onClick={this.showSelectFileDialog}>选择文件</Button> <span className="select-flie-tips">从个人空间选择与知识相关的文件</span>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit" onClick={() => { this.confirmCreateItem() }}>确定</Button>
                        <Button>取消</Button>
                    </Form.Item>
                </Form>
                <SelectFile dialogVisible={this.state.dialogVisible} closeSelecFileDialog={this.hideSelectFileDialog} />
            </div>
        )
    }
}
