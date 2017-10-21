import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Message, Breadcrumb } from 'element-react-codish';
import SelectFile from './select-file.js';
import { MessageBox } from 'element-react-codish';
import Select from 'react-select';

@inject(stores => {
    let {
        knowledgeObj,
        getKnowledgeList
    } = stores.manage
    let {
        tags,
        parentTags,
        getTags
    } = stores.tag
    let {
        getItemDetail,
        itemDetails,
        modifyItem
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
        knowledgeObj,
        getKnowledgeList,
        parentTags,
        getTags,
        modifyItem,
        userInfo,
        setUserFile,
        setCurFileParents,
        setSelected,
        getUserFile,
        selected,
        userFile,
        getItemDetail,
        itemDetails
    }
})
@observer
export default class EditItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false,
            curParentId: '',
            name: '',
            desc: '',
            libraryId: parseInt(this.props.match.params.id),
            creatorId: '',
            creatorName: '',
            fileInfos: [],
            tagIds: [{ id: '' }, { id: '' }],
            tag: '',
            files: [],
        };
        this.rules = {
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
                        if (!this.state.tagIds[0].id) {
                            callback(new Error('请选择一级标签'));
                            return
                        }
                        if (this.state.tag.length > 8) {
                            callback(new Error('请输入8个字符以内的标签'));
                            return
                        }
                        callback()
                    },
                    trigger: 'change'
                }
            ],
            fileInfos: [
                {
                    validator: (rule, value, callback) => {
                        if (this.state.fileInfos.length < 1) {
                            callback(new Error('请选择文件'));
                            return
                        }
                        callback()
                    },
                    trigger: 'change'
                }
            ]
        };
    }

    componentWillMount() {
        let {
            getKnowledgeList,
            getTags,
            match,
            getItemDetail,
            userInfo
        } = this.props;
        let libId = match.params.id;
        let itemId = match.params.itemId;
        let type = 'user'
        if (userInfo.data.userType === 0 || userInfo.data.userType === 1) {
            type = 'admin'
        }
        getKnowledgeList({
            type
        });
        getTags({
            libraryId: libId,
            isCustom: 0 // 不返回自定义标签
        });
        if (libId && itemId) {
            getItemDetail(itemId).then(() => {
                let {itemDetails} = this.props;
                this.setState({
                    name: itemDetails.name,
                    desc: itemDetails.desc,
                    tagIds: itemDetails.tagArr,
                    tag: itemDetails.tagArr[2] ? itemDetails.tagArr[2].tag : '',
                    files: itemDetails.fileInfos,
                    fileInfos: itemDetails.fileInfos,
                    curParentId: itemDetails.tagArr[0] && itemDetails.tagArr[0].id
                });
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    handleNameChange = name => {
        this.setState({name});
    }

    handleDescChange = desc => {
        this.setState({desc});
    }

    handleCustomTagChange = tag => {
        let tags = this.state.tagIds;
        tags[2] = tag;
        this.setState({
            tagIds: tags
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

    selectParentTag = (parentTag) => {
        if (!parentTag) return false;
        let parentId = parentTag.value;
        if (!parentId) return false;
        let tagIds = this.state.tagIds;
        tagIds[0] = {
            id: parentId
        };
        tagIds[1] = {
            id: ''
        }
        this.setState({
            curParentId: parentId,
            tagIds
        });
    }

    selectChildTag = (childTag) => {
        if (!childTag) return false;
        let cId = childTag.value;
        if (!cId) return false;
        let tagIds = this.state.tagIds;
        tagIds[1] = {
            id: cId
        };
        this.setState({
            tagIds
        });
    }

    confirmCreateItem() {
        this.refs.form.validate((valid) => {
            if (valid) {
                let state = this.state;
                const params = {
                    name: state.name,
                    desc: state.desc,
                    libraryId: state.libraryId,
                    creatorId: this.props.userInfo.data.userId,
                    creatorName: this.props.userInfo.data.userName,
                    fileInfos: state.fileInfos,
                    tagIds: state.tagIds,
                    tag: state.tag,
                    id: this.props.itemDetails.id
                };
                this.props.modifyItem(params).then((res) => {
                    if (res.code !== 200) {
                        Message(res.msg)
                        return
                    }
                    this.props.history.go(-1)
                    Message({
                        type: 'success',
                        message: '修改成功!'
                    });
                })
            } else {
                return false;
            }
        })
    }

    handleConfirm = () => {
        let files = this.props.selected.slice();
        if (files.some(item => {
            return item.folder;
        })) {
            return MessageBox.alert('选择的附件不能为文件夹！');
        }
        if (files.length > 30) {
            return MessageBox.alert('文件个数不能超过30个！');
        }
        let fileInfos = files.map(item => {
            return {
                fileId: item.fileId,
                fileVersion: item.fileVersion,
                fileName: item.fileName,
            };
        })
        this.setState({
            files: files,
            dialogVisible: false,
            fileInfos
        });
        this.clearUserFile();
    }

    deleteFile = data => {
        let { files, fileInfos } = this.state;
        this.setState({
            files: files.filter(item => item.fileId !== data.fileId),
            fileInfos: fileInfos.filter(item => item.fileId !== data.fileId),
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
        let {
            knowledgeObj,
            parentTags,
            tags,
            userInfo,
            itemDetails
        } = this.props;
        let {
            files,
            dialogVisible,
            name,
            desc,
            tagIds,
            tag,
            curParentId
        } = this.state;
        const curLibrary = knowledgeObj && knowledgeObj.librarys.filter((k) => {
            return k.id === parseInt(this.props.match.params.id)
        })
        if (!itemDetails) {
            return (
                <div className="mod-addknowledge-item">
                    <p>正在获取条目详情...</p>
                </div>
            );
        }
        let formMod = {
            name,
            desc,
            tagIds,
            tag
        };
        return (
            <div className="mod-addknowledge-item">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <NavLink
                            to={`/knowledge/${this.props.match.params.id}`}
                            activeClassName="active">
                            {
                                curLibrary && curLibrary[0] && curLibrary[0].name
                            }
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>修改知识条目</Breadcrumb.Item>
                </Breadcrumb>
                <Form ref="form" model={formMod} rules={this.rules} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="标题：" prop="name">
                        <Input
                            value={name}
                            onChange={this.handleNameChange}
                            placeholder="请输入标题" />
                    </Form.Item>
                    <Form.Item label="知识库：" required>
                        {curLibrary[0] && curLibrary[0].name}
                    </Form.Item>
                    <Form.Item label="描述：" prop="desc">
                        <Input
                            type="textarea"
                            placeholder="请输入描述"
                            value={desc}
                            onChange={this.handleDescChange} />
                    </Form.Item>
                    <Form.Item label="作者：" required>
                        {userInfo && userInfo.data && userInfo.data.userName}
                    </Form.Item>
                    <Form.Item className="select-tags" label="标签：" prop="tagIds" required>
                        <Select value={tagIds[0].id}
                            onChange={this.selectParentTag}
                            placeholder="标签一"
                            noResultsText="暂无数据"
                            options={parentTags.map(item => ({label: item.tag, value: item.id}))}/>
                        <Select
                            value={tagIds[1].id}
                            onChange={this.selectChildTag}
                            placeholder="标签二"
                            noResultsText="暂无数据"
                            options={tags.filter(t => t.parentId === curParentId).map(item => ({label: item.tag, value: item.id}))} />
                        <Input
                            className="default-tag"
                            value={tag}
                            onChange={this.handleCustomTagChange}
                            placeholder="自定义标签" />
                    </Form.Item>
                    <Form.Item label="附件：" prop="fileInfos" required>
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
