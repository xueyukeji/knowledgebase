import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog, Button, Message } from 'element-react-codish';
import {Tree, Input} from 'antd';
import _ from 'lodash';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

@inject(stores => {
    let {
        treeNodes,
        getDeptAndUser,
        searchUser,
        setTreeNodes
    } = stores.user;
    let {
        setUsers,
        setExpert,
        setIsUserDiloag,
        getAdminKnowledgeList
    } = stores.manage;
    return {
        setUsers,
        setExpert,
        treeNodes,
        getDeptAndUser,
        setIsUserDiloag,
        searchUser,
        setTreeNodes,
        getAdminKnowledgeList
    };
})
@observer
export default class SetExpert extends Component {
    state = {
        searchValue: '',
        checkedKeys: [],
        selectedNodes: [],
        searchUsers: []
    }

    constructor(props) {
        super(props);
        this.delaySearch = _.debounce(this.searchUser, 1000);
    }

    componentWillMount() {
        this.props.getDeptAndUser(-1);
        let checkedKeys = [];
        if (this.props.actionType === 'user') {
            checkedKeys = this.props.curLibrary.userIds.map(item => `${item}`);
        } else if (this.props.actionType === 'expert') {
            checkedKeys = this.props.curLibrary.professorIds.map(item => `${item}`);
        }
        this.setState({
            checkedKeys,
            selectedNodes: checkedKeys.map(item => {
                return {
                    key: item,
                    title: item,
                    isLeaf: true
                };
            })
        });
    }

    onLoadData = node => {
        return this.props.getDeptAndUser(node.props.eventKey);
    }

    handleCheck = (checkedKeys) => {
        let {treeNodes} = this.props;
        let selectedNodes = [];
        checkedKeys.forEach(item => {
            let findItem = this.findItem(treeNodes, item);
            if (!findItem) return;
            selectedNodes.push(findItem);
        });
        this.setState({
            checkedKeys,
            selectedNodes
        });
    }

    findItem = (nodes, key) => {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].key === key) {
                if (nodes[i].isLeaf) return nodes[i];
                else return false;
            } else {
                if (nodes[i].children) {
                    let a = this.findItem(nodes[i].children, key);
                    if (a) return a;
                }
            }
        }
        return false;
    }

    getTreeNodes(data) {
        if (!data || !data.length) {
            return;
        }
        const {searchValue} = this.state;
        return data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.title || item.key}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title} isLeaf={item.isLeaf}>
                        {this.getTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} isLeaf={item.isLeaf} />;
        });
    }

    handleConfirmClick = () => {
        let {selectedNodes} = this.state;
        let users = selectedNodes.map(item => {
            return item.key;
        });
        if (!users || !users.length) {
            return Message({
                type: 'error',
                message: '请选择用户!'
            });
        }
        if (this.props.actionType === 'user') {
            this.props.setUsers({
                userIds: users.slice(),
                id: this.props.curLibrary.id
            }).then(this.handleResult);
        } else if (this.props.actionType === 'expert') {
            this.props.setExpert({
                professorIds: users.slice(),
                id: this.props.curLibrary.id
            }).then(this.handleResult);
        }
        this.props.handleCancel();
    }

    handleResult = data => {
        this.props.getAdminKnowledgeList();
        if (data.code == 200) {
            Message({
                type: 'success',
                message: '设置成功!'
            });
        } else {
            Message({
                type: 'error',
                message: '设置失败!'
            });
        }
    }

    handleSearchChange = e => {
        let value = e.target.value;
        if (value === '') {
            this.setState({
                searchValue: '',
                searchUsers: []
            });
        } else {
            this.setState({
                searchValue: value
            });
            this.delaySearch(value);
        }
    }

    searchUser = value => {
        this.props.searchUser({
            key: value,
            offset: 0
        }).then(data => {
            if (this.state.searchValue === '') return;
            let nodes = data.map(item => {
                return {
                    key: `${item.userId}`,
                    title: `${item.userName}`,
                    isLeaf: true
                };
            });
            if (nodes.length) {
                this.setState({
                    searchUsers: nodes
                });
            }
        });
    }

    render() {
        let { visible, handleCancel, title } = this.props;
        return (
            <Dialog
                className="mod-setexpert"
                title={title}
                size="small"
                closeOnClickModal={false}
                visible={visible}
                onCancel={handleCancel}
                lockScroll={false}>
                <Dialog.Body>
                    <div className="user-tree-wrap">
                        <div className="user-tree-inner">
                            <Search
                                placeholder="搜索用户"
                                onChange={this.handleSearchChange} />
                            <p className="text">添加</p>
                            <div className="user-tree">
                                <Tree
                                    loadData={this.onLoadData}
                                    checkable
                                    onCheck={this.handleCheck}
                                    checkedKeys={this.state.checkedKeys}
                                    onSelect={this.handleSelect}>
                                    {this.getTreeNodes(this.state.searchUsers.length && this.state.searchUsers || this.props.treeNodes)}
                                </Tree>
                            </div>
                        </div>
                        <div className="user-tree-inner">
                            <p className="text">已添加</p>
                            <div className="user-tree">
                                <Tree
                                    checkable
                                    onCheck={this.handleCheck}
                                    checkedKeys={this.state.checkedKeys}
                                    onSelect={this.handleSelect}>
                                    {this.getTreeNodes(this.state.selectedNodes)}
                                </Tree>
                            </div>
                        </div>
                    </div>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button type="info" onClick={this.handleConfirmClick}>确定</Button>
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}
