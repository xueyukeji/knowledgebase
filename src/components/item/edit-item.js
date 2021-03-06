import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, Message, Breadcrumb } from 'element-react-codish';
import SelectFile from './select-file.js';
import { MessageBox } from 'element-react-codish';
import { Cascader, Icon } from 'antd'
import { listToTree } from '../../utils/constants'
import uniqBy from 'lodash/uniqBy'
import FileIcon from '../../utils/FileIcon'

@inject(stores => {
    let {
        knowledgeObj,
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
            tagId1: -1, // 标签1的一级id
            tagId2: -1, // 标签2的一级id
            dialogVisible: false,
            name: '',
            desc: '',
            libraryId: parseInt(this.props.match.params.id),
            creatorId: '',
            creatorName: '',
            fileInfos: [],
            tagIds: [{ id: '' }, { id: '' }],
            tag: '',
            files: [],
            value1: [],
            value2: []
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

            tagIds: [
                {
                    validator: (rule, value, callback) => {
                        if (!this.state.tagIds[0].id) {
                            callback(new Error('请选择标签一'));
                            return
                        }
                        if (!this.state.tagIds[1].id) {
                            callback(new Error('请选择标签二'));
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
            getTags,
            match,
            getItemDetail,
        } = this.props;
        let libId = match.params.id;
        let itemId = match.params.itemId;
        getTags({
            libraryId: libId,
            isCustom: 0 // 不返回自定义标签
        });
        if (libId && itemId) {
            getItemDetail(itemId).then(() => {
                let { itemDetails } = this.props;
                const tagObj0 = itemDetails.tagArr[0]
                const tagObj1 = itemDetails.tagArr[1]
                const tagId1 = tagObj0 ? tagObj0.parentId : -1
                const tagId2 = tagObj1 ? tagObj1.parentId : -1
                const value1 = [tagId1, tagObj0.id]
                const value2 = [tagId2, tagObj1.id]
                this.setState({
                    name: itemDetails.name,
                    desc: itemDetails.desc,
                    tagIds: itemDetails.tagArr,
                    tag: itemDetails.tagArr[2] ? itemDetails.tagArr[2].tag : '',
                    files: itemDetails.fileInfos,
                    fileInfos: itemDetails.fileInfos,
                    tagId1,
                    tagId2,
                    value1,
                    value2,
                });
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    handleNameChange = name => {
        this.setState({ name });
    }

    handleDescChange = desc => {
        this.setState({ desc });
    }

    handleCustomTagChange = tag => {
        let tags = this.state.tagIds;
        tags[2].tag = tag
        this.setState({
            tagIds: tags,
            tag
        })
    }

    onChangeTag1 = (value, selectedOptions) => {
        console.log(value, selectedOptions)
        const id1 = value[1]
        const tagIds = this.state.tagIds;
        tagIds[0] = {
            id: id1
        };
        this.setState({
            tagIds,
            tagId1: value[0],
            value1: value
        });
    }

    onChangeTag2 = (value, selectedOptions) => {
        console.log(value, selectedOptions)
        const id2 = value[1]
        const tagIds = this.state.tagIds;
        tagIds[0] = {
            id: id2
        };
        this.setState({
            tagIds,
            tagId2: value[0],
            value2: value
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

    confirmCreateItem() {
        this.refs.form.validate((valid) => {
            if (valid) {
                let state = this.state;
                const params = {
                    name: state.name,
                    desc: state.desc,
                    libraryId: state.libraryId,
                    creatorId: this.props.userInfo.data.userId,
                    creatorName: this.props.userInfo.data.realName || this.props.userInfo.data.userName,
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
        let selFiles = this.props.selected.slice();
        if (selFiles.some(item => {
            return item.folder;
        })) {
            return MessageBox.alert('选择的附件不能为文件夹！');
        }
        if (selFiles.length > 30) {
            return MessageBox.alert('文件个数不能超过30个！');
        }
        const { files } = this.state
        files.forEach(function(item) {
            item.fileId ? selFiles.unshift(item) : ''
        })
        const newFiles = uniqBy(selFiles, 'fileId');
        this.setState({
            files: newFiles,
            dialogVisible: false,
            fileInfos: newFiles
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
                <div className='fj-item' key={item.fileId}>
                    <FileIcon file={item}/>  <span style={{'position': 'relative', 'top': '-15px'}} >{item.fileName}<span className="delete-file" onClick={() => {this.deleteFile(item);}}>删除</span></span>
                </div>
            );
        });
    }

    render() {
        let {
            knowledgeObj,
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
            tagId1,
            tagId2,
            value1,
            value2
        } = this.state;
        const curLibrary = knowledgeObj && knowledgeObj.librarys.find((item) => item.id === parseInt(this.props.match.params.id))
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

        tags.forEach(function(item) {
            item.value = item.id
            item.label = item.tag
        });
        const options = listToTree(tags, {
            idKey: 'id',
            parentKey: 'parentId',
            childrenKey: 'children'
        }, true)
        return (
            <div className="mod-addknowledge-item">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <NavLink
                            to={`/knowledge/${this.props.match.params.id}`}
                            activeClassName="active">
                            {
                                curLibrary && curLibrary.name
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
                        {
                            curLibrary && curLibrary.name
                        }
                    </Form.Item>
                    <Form.Item label="备注：" prop="desc">
                        <Input
                            type="textarea"
                            placeholder="请输入描述"
                            value={desc}
                            onChange={this.handleDescChange} />
                    </Form.Item>
                    <Form.Item label="作者：" required>
                        {userInfo && userInfo.data && userInfo.data.realName || userInfo.data.userName}
                    </Form.Item>
                    <Form.Item className="select-tags" label="标签：" prop="tagIds" required>
                        <Cascader
                            options={options.filter(item => {
                                return item.id !== tagId2
                            })}
                            onChange={this.onChangeTag1}
                            placeholder="请选择标签一"
                            showSearch
                            size="large"
                            style={{ width: 180 }}
                            value={value1}
                        />
                        <Cascader
                            options={options.filter(item => {
                                return item.id !== tagId1
                            })}
                            onChange={this.onChangeTag2}
                            placeholder="请选择标签二"
                            showSearch
                            size="large"
                            style={{ width: 180 }}
                            value={value2}
                        />
                        <Input
                            className="default-tag" value={this.state.tag}
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
