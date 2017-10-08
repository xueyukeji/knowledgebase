import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Select, Button, Message } from 'element-react-codish'
import SelectFile from './components/select-file.js'

@inject(stores => {
    let {
        knowledgeList,
        getKnowledgeList
    } = stores.manage
    let {
        tags,
        parentTags,
        getTags
    } = stores.tag
    let {
        createItem
    } = stores.item
    let {
        userInfo
    } = stores.user
    return {
        tags,
        knowledgeList,
        getKnowledgeList,
        parentTags,
        getTags,
        createItem,
        userInfo
    }
})
@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false,
            curParentId: '',
            form: {
                name: '',
                desc: '',
                libraryId: '',
                creatorId: '',
                creatorName: '',
                fileIds: [1, 2, 3],
                tagIds: [],
                parentTag: '',
                childTag: '',
                tag: ''
            },
        };
    }
    componentWillMount() {
        this.props.getKnowledgeList()
        this.props.getTags()
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        let form = this.state.form;
        form[key] = value;
        if (key === 'tag') {
            let tags = this.state.form.tagIds;
            tags[2] = {
                id: '',
                tag: value
            };
            form.tagIds = tags;
        }
        this.setState({
            form
        });
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
        let form = this.state.form;
        form.tagIds[0] = {
            id: parentId
        };
        this.setState({
            curParentId: parentId,
            form
        });
    }

    selectChildTag = (cId) => {
        let form = this.state.form;
        form.tagIds[1] = {
            id: cId
        };
        this.setState({
            form
        });
    }
    confirmCreateItem() {
        if (!this.state.form.name) {
            Message('请输入标题名称')
            return
        }
        if (!this.state.form.libraryId) {
            Message('请选择知识库')
            return
        }
        if (!this.state.form.creatorName) {
            Message('请输入作者名称')
            return
        }
        if (typeof (this.state.form.tagIds[0]) === 'undefined') {
            Message('请选择一级标签')
            return
        }
        if (typeof (this.state.form.tagIds[1]) === 'undefined') {
            Message('请选择一级标签')
            return
        }
        const params = Object.assign(this.state.form, {
            creatorName: this.props.userInfo.data.userName,
            creatorId: this.props.userInfo.data.userId
        });
        this.props.createItem(params).then(() => {
            this.props.history.go(-1)
            Message({
                type: 'success',
                message: '新增成功!'
            });
        })
    }
    render() {
        let { knowledgeList, parentTags, tags, userInfo } = this.props
        return (
            <div className="mod-addknowledge-item">
                <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="标题：">
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}
                            placeholder="请输入标题"></Input>
                    </Form.Item>
                    <Form.Item label="知识库：">
                        <Select value={this.state.form.libraryId} onChange={this.selectKnowledge} placeholder="请选择知识库">
                            {
                                knowledgeList.map(item => {
                                    return <Select.Option key={item.id} label={item.name} value={item.id}></Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="描述：">
                        <Input type="textarea" placeholder="请输入描述" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <Form.Item label="作者：">
                        {userInfo && userInfo.data && userInfo.data.userName}
                    </Form.Item>
                    <Form.Item className="select-tags" label="标签：">
                        <Select value={this.state.form.parentTag} onChange={this.selectParentTag} placeholder="请选择一级标签">
                            {
                                parentTags.map(item => {
                                    return <Select.Option key={item.id} label={item.tag} value={item.id} ></Select.Option>
                                })
                            }
                        </Select>
                        <Select value={this.state.form.childTag} onChange={this.selectChildTag} placeholder="请选择二级标签">
                            {
                                tags.filter(t => {
                                    return t.parentId === this.state.curParentId
                                }).map(item => {
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
