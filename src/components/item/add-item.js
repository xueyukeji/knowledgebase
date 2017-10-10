import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, NavLink } from 'react-router-dom'
import { Form, Input, Select, Button, Message, Breadcrumb } from 'element-react-codish'
import SelectFile from './components/select-file.js';
import { MessageBox } from 'element-react-codish';

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
                libraryId: parseInt(this.props.match.params.id),
                creatorId: '',
                creatorName: '',
                fileIds: [],
                tagIds: [],
                parentTag: '',
                childTag: '',
                tag: ''
            },
            files: [],
            rules: {
                name: [
                    { required: true, message: '请输入标题', trigger: 'change' },
                    {
                        validator: (rule, value, callback) => {
                            if (value.length > 32) {
                                callback(new Error('标题名称长度不能超过32个字符'));
                                return
                            }
                            callback()
                        },
                        trigger: 'blur'
                    }
                ],
                desc: [
                    { required: true, message: '请输入描述', trigger: 'change' },
                    {
                        validator: (rule, value, callback) => {
                            if (value.length > 500) {
                                callback(new Error('标题描述长度不能超过500个字符'));
                                return
                            }
                            callback()
                        },
                        trigger: 'blur'
                    }
                ],
                tagIds: [
                    {
                        validator: (rule, value, callback) => {
                            if (value.length === 0) {
                                callback(new Error('请选择一级标签'));
                                return
                            }
                            callback()
                        },
                        trigger: 'change'
                    }
                ],
                fileIds: [
                    {
                        validator: (rule, value, callback) => {
                            if (this.state.form.fileIds.length < 1) {
                                callback(new Error('请选择文件'));
                                return
                            }
                            callback()
                        },
                        trigger: 'change'
                    }
                ]
            }
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
    selectKnowledge = (libraryId) => {
        this.state.form.libraryId = libraryId
        this.props.getTags(libraryId)
    }
    selectParentTag = (parentId) => {
        let form = this.state.form;
        form.tagIds[0] = {
            id: parentId
        };
        form.tagIds[1] = {
            id: ''
        }
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
        this.refs.form.validate((valid) => {
            if (valid) {
                const params = Object.assign(this.state.form, {
                    creatorName: this.props.userInfo.data.userName,
                    creatorId: this.props.userInfo.data.userId
                });
                this.props.createItem(params).then((res) => {
                    if (res.code !== 200) {
                        Message(res.msg)
                        return
                    }
                    this.props.history.go(-1)
                    Message({
                        type: 'success',
                        message: '新增成功!'
                    });
                })
            } else {
                return false;
            }
        })
    }
    handleConfirm = () => {
        let { form } = this.state;
        let files = this.props.selected.slice();
        if (files.some(item => {
            return item.folder;
        })) {
            return MessageBox.alert('选择的附件不能为文件夹！');
        }
        if (files.length > 30) {
            return MessageBox.alert('文件个数不能超过30个！');
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
    deleteFile = data => {
        let { form, files } = this.state;
        form = Object.assign(form, {
            fileIds: files.filter(item => {
                return item !== data.fileId;
            })
        });
        this.setState({
            files: files.filter(item => item.fileId !== data.fileId),
            form: form
        });
    }
    getSelectedFile = () => {
        return this.state.files.map(item => {
            return (
                <div key={item.fileId}>
                    {item.fileName}
                    <span className="delete-file" onClick={() => {
                        this.deleteFile(item);
                    }}>删除</span>
                </div>
            );
        });
    }

    render() {
        let { knowledgeList, parentTags, tags, userInfo } = this.props;
        let { files, dialogVisible } = this.state;
        return (
            <div className="mod-addknowledge-item">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <NavLink
                            to={`/knowledge/${this.props.match.params.id}`}
                            activeClassName="active">
                            {
                                this.props.knowledgeList && this.props.knowledgeList.filter((k) => {
                                    return k.id === parseInt(this.props.match.params.id)
                                })[0].name
                            }
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>创建知识条目</Breadcrumb.Item>
                </Breadcrumb>
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="标题：" prop="name">
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}
                            placeholder="请输入标题"></Input>
                    </Form.Item>
                    <Form.Item label="知识库：" required>
                        <Select value={this.state.form.libraryId} onChange={this.selectKnowledge} placeholder="请选择知识库">
                            {
                                knowledgeList.map(item => {
                                    return <Select.Option key={item.id} label={item.name} value={item.id}></Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="描述：" prop="desc">
                        <Input type="textarea" placeholder="请输入描述" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <Form.Item label="作者：" required>
                        {userInfo && userInfo.data && userInfo.data.userName}
                    </Form.Item>
                    <Form.Item className="select-tags" label="标签：" prop="tagIds" required>
                        <Select value={this.state.form.parentTag} onChange={this.selectParentTag} placeholder="一级标签">
                            {
                                parentTags.map(item => {
                                    return <Select.Option key={item.id} label={item.tag} value={item.id} ></Select.Option>
                                })
                            }
                        </Select>
                        <Select value={this.state.form.childTag} onChange={this.selectChildTag} placeholder="二级标签">
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
                    <Form.Item label="附件：" prop="fileIds" required>
                        {
                            files.length ?
                                this.getSelectedFile() : null
                        }
                        <Button size="small" type="primary" onClick={this.showSelectFileDialog}>选择文件</Button>
                        <span className="select-flie-tips">从个人空间选取（请先将文件上传到云盘）</span>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" nativeType="submit" onClick={() => { this.confirmCreateItem() }}>确定</Button>
                        <Button>
                            <NavLink to={`/knowledge/${this.props.match.params.id}`}> 取消 </NavLink>
                        </Button>
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
