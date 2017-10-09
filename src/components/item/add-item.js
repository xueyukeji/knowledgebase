import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, Button, Message } from 'element-react-codish'
import SelectFile from './components/select-file.js';
import {MessageBox} from 'element-react-codish';

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
        setUserFile,
        userInfo,
        setCurFileParents,
        setSelected,
        getUserFile,
        selected,
        userFile
    } = stores.user;
    return {
        tags,
        knowledgeList,
        getKnowledgeList,
        parentTags,
        getTags,
        createItem,
        userInfo,
        setUserFile,
        setCurFileParents,
        setSelected,
        getUserFile,
        selected,
        userFile
    }
})
@observer
class AddItem extends Component {
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
                fileIds: [],
                tagIds: [],
                parentTag: '',
                childTag: '',
                tag: ''
            },
            files: []
        };
    }
    componentWillMount() {
        this.props.getKnowledgeList()
        this.props.getTags(this.props.match.params.id)
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
        }, () => {
            this.props.getUserFile();
        });
    }
    hideSelectFileDialog = () => {
        this.setState({
            dialogVisible: false
        });
        this.clearUserFile();
    }

    clearUserFile() {
        this.props.setUserFile([]);
        this.props.setCurFileParents([]);
        this.props.setSelected([]);
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
        if (typeof (this.state.form.tagIds[0]) === 'undefined') {
            Message('请选择一级标签')
            return
        }
        if (typeof (this.state.form.tagIds[1]) === 'undefined') {
            Message('请选择一级标签')
            return
        }
        if (this.state.form.fileIds.length < 1) {
            Message('请选择文件')
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

    handleConfirm = () => {
        let {form} = this.state;
        let files = this.props.selected.slice();
        if (files.some(item => {
            return item.folder;
        })) {
            return MessageBox.alert('选择的附件不能为文件夹！');
        }
        form = Object.assign(form, {
            fileIds: files.map(item => {
                return item.fileId;
            })
        });
        this.setState({
            files: files,
            dialogVisible: false,
            form: form
        });
        this.clearUserFile();
    }

    getSelectedFile = () => {
        return this.state.files.map(item => {
            return (
                <div key={item.fileId}>{item.fileName}</div>
            );
        });
    }
    render() {
        let { knowledgeList, parentTags, tags, userInfo } = this.props;
        let {files, dialogVisible} = this.state;
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
                        {
                            files.length ?
                                this.getSelectedFile() : null
                        }
                        <Button size="small" type="primary" onClick={this.showSelectFileDialog}>选择文件</Button>
                        <span className="select-flie-tips">从个人空间选择与知识相关的文件</span>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit" onClick={() => { this.confirmCreateItem() }}>确定</Button>
                        <Button>取消</Button>
                    </Form.Item>
                </Form>
                {
                    dialogVisible ?
                        <SelectFile
                            dialogVisible={true}
                            handleConfirm={this.handleConfirm}
                            closeSelecFileDialog={this.hideSelectFileDialog} /> : null
                }
            </div>
        )
    }
}
export default withRouter(AddItem)
