import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter, NavLink} from 'react-router-dom';
import {Form, Input, Button, Message, Breadcrumb} from 'element-react-codish';
import SelectFile from './select-file.js';
import {MessageBox} from 'element-react-codish';
import {Cascader} from 'antd'
import {listToTree} from '../../utils/constants'
import FileIcon from '../../utils/FileIcon'
import uniqBy from 'lodash/uniqBy'

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
        createItem,
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
        createItem,
        userInfo,
        setUserFile,
        setCurFileParents,
        setSelected,
        getUserFile,
        selected,
        userFile,
    }
})
@observer
class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisible: false,
            tagId1: '', // 标签1的一级id
            tagId2: '', // 标签2的一级id
            form: {
                name: '',
                desc: '',
                libraryId: parseInt(this.props.match.params.id),
                creatorId: '',
                creatorName: '',
                fileInfos: [],
                tagIds: [{id: ''}, {id: ''}],
                tag: ''
            },
            files: [],
            rules: {
                name: [
                    {required: true, message: '请输入标题', trigger: 'change'},
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
                            if (!this.state.form.tagIds[0].id) {
                                callback(new Error('请选择标签一'));
                                return
                            }
                            if (!this.state.form.tagIds[1].id) {
                                callback(new Error('请选择标签二'));
                                return
                            }

                            if (this.state.form.tag.length > 8) {
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
                            if (this.state.form.fileInfos.length < 1) {
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
        const {getTags} = this.props
        getTags({
            libraryId: this.props.match.params.id,
            isCustom: 0 // 不返回自定义标签
        })
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

    selectKnowledge = ({value: libraryId}) => {
        this.state.form.libraryId = libraryId
        this.props.getTags({
            libraryId,
            isCustom: 0
        })
    }

    onChangeTag1 = (value, selectedOptions) => {
        console.log(value, selectedOptions)
        const id1 = value[1]
        let form = this.state.form;
        form.tagIds[0] = {
            id: id1
        };
        this.setState({
            form,
            tagId1: value[0]
        });
    }

    onChangeTag2 = (value, selectedOptions) => {
        console.log(value, selectedOptions)
        const id2 = value[1]
        let form = this.state.form;
        form.tagIds[1] = {
            id: id2
        };
        this.setState({
            form,
            tagId2: value[0]
        });
    }

    confirmCreateItem() {
        const {userInfo, createItem, history} = this.props
        this.refs.form.validate((valid) => {
            if (valid) {
                const params = Object.assign(this.state.form, {
                    creatorName: userInfo.data.realName || userInfo.data.userName,
                    creatorId: userInfo.data.userId
                });
                createItem(params).then((res) => {
                    if (res.code !== 200) {
                        Message(res.msg)
                        return
                    }
                    history.go(-1)
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
        let {form} = this.state;
        let selFiles = this.props.selected.slice();
        if (selFiles.some(item => {return item.folder;}))
        {
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

        form = Object.assign(form, {
            fileInfos: newFiles.map(item => {
                return {
                    fileId: item.fileId,
                    fileVersion: item.fileVersion,
                    fileName: item.fileName,
                };
            })
        });

        this.setState({
            files: newFiles,
            dialogVisible: false,
            form: form
        });
        this.clearUserFile();
    }

    deleteFile = data => {
        let {form, files} = this.state;
        form = Object.assign(form, {
            fileInfos: files.filter(item => {
                return item.fileId !== data.fileId;
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
            match
        } = this.props;
        let {
            files,
            dialogVisible,
            tagId1,
            tagId2
        } = this.state;
        tags.forEach(function (item) {
            item.value = item.id
            item.label = item.tag
        });
        const options = listToTree(tags, {
            idKey: 'id',
            parentKey: 'parentId',
            childrenKey: 'children'
        }, true)
        const curLibrary = knowledgeObj && knowledgeObj.librarys.find((item) => item.id === parseInt(match.params.id))
        return (
            <div className="mod-addknowledge-item">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <NavLink
                            to={`/knowledge/${match.params.id}`}
                            activeClassName="active">
                            {
                                curLibrary && curLibrary.name
                            }
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>创建知识条目</Breadcrumb.Item>
                </Breadcrumb>
                <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>

                    <Form.Item className="autor" label="作者：" required>
                        {userInfo && userInfo.data && userInfo.data.realName || userInfo.data.userName}
                    </Form.Item>

                    <Form.Item label="知识库：" required>
                        {
                            curLibrary && curLibrary.name
                        }
                    </Form.Item>
                    <Form.Item label="标题：" prop="name" required>
                        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} placeholder="请输入标题"></Input>
                    </Form.Item>
                    <br/>
                    <Form.Item label="备注：" prop="desc">
                        <Input type="textarea" placeholder="请输入描述" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                    </Form.Item>
                    <br/>
                    <Form.Item className="select-tags" label="标签：" prop="tagIds" required>
                        <Cascader
                            options={options.filter(item => {
                                return item.id !== tagId2
                            })}
                            onChange={this.onChangeTag1}
                            placeholder="请选择标签一"
                            showSearch
                            size="large"
                            style={{width: 140}}
                        /> &nbsp;&nbsp;
                        <Cascader
                            options={options.filter(item => {
                                return item.id !== tagId1
                            })}
                            onChange={this.onChangeTag2}
                            placeholder="请选择标签二"
                            showSearch
                            size="large"
                            style={{width: 140}}
                        />
                        &nbsp;&nbsp;
                        <Input className="default-tag" value={this.state.form.tag} onChange={this.onChange.bind(this, 'tag')}  placeholder="自定义标签"></Input>
                    </Form.Item>
                    <br/>
                    <Form.Item label="附件：" prop="fileInfos" required>
                        {
                            files.length ?
                                this.getSelectedFile() : null
                        }
                        <Button size="small" type="primary" onClick={this.showSelectFileDialog}>选择文件</Button>
                        <span className="select-flie-tips">从个人空间选取（请先将文件上传到云盘）</span>
                    </Form.Item>

                    <hr/>

                    <Form.Item>
                        <div className='btn_st'>
                            <Button type="primary" size="large" nativeType="submit" onClick={() => {
                                this.confirmCreateItem()
                            }}>确定</Button>
                            &nbsp;&nbsp;
                            <Button size="large">
                                <NavLink to={`/knowledge/${this.props.match.params.id}`}> 取消 </NavLink>
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
                {
                    dialogVisible ?
                        <SelectFile
                            dialogVisible={true}
                            handleConfirm={this.handleConfirm}
                            closeSelecFileDialog={this.hideSelectFileDialog}/> : null
                }
            </div>
        )
    }
}

export default withRouter(AddItem)
