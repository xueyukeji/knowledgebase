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
        setTreeNodes,
        setSearchUsers,
        setSearchValue,
        searchUsers,
        searchValue,
        selectedNodes,
        setSelectedNodes
    } = stores.user;
    let {
        setUsers,
        setExpert,
        setIsUserDiloag,
    } = stores.manage;
    return {
        setUsers,
        setExpert,
        treeNodes,
        getDeptAndUser,
        setIsUserDiloag,
        searchUser,
        setTreeNodes,
        setSearchUsers,
        setSearchValue,
        searchUsers,
        searchValue,
        selectedNodes,
        setSelectedNodes
    };
})
@observer
export default class SetExpert extends Component {
    state = {
        checkedKeys: [],
        rightCheckedKeys: [],
    }

    constructor(props) {
        super(props);
        this.delaySearch = _.debounce(this.searchUser, 1000);
    }

    componentWillMount() {
        this.props.getDeptAndUser(-1);
        let users = [];
        if (this.props.actionType === 'user') {
            users = this.props.curLibrary.users
        } else if (this.props.actionType === 'expert') {
            users = this.props.curLibrary.professors
        }
        this.props.setSelectedNodes(users.map(item => {
            return {
                key: item.key,
                title: item.value,
                isLeaf: true
            };
        }));
    }

    componentWillUnmount() {
        this.props.setSearchValue('');
        this.props.setSearchUsers([]);
    }

    onLoadData = node => {
        return this.props.getDeptAndUser(node.props.eventKey);
    }

    handleCheck = (keys) => {
        this.setState({
            checkedKeys: keys
        });
    }

    handleRightCheck = keys => {
        this.setState({
            rightCheckedKeys: keys
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
        const {searchValue} = this.props;
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
        let {selectedNodes} = this.props;
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
        this.props.getDatas()
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
            this.props.setSearchValue('');
            this.props.setSearchUsers([]);
        } else {
            this.props.setSearchValue(value);
            this.delaySearch(value);
        }
    }

    searchUser = value => {
        this.props.searchUser({
            key: value,
            offset: 0
        });
    }

    add = () => {
        let {treeNodes, searchUsers, selectedNodes, setSelectedNodes} = this.props;
        let {checkedKeys} = this.state;
        let curNodeslist = treeNodes;
        if (searchUsers.length) {
            curNodeslist = searchUsers;
        }
        let rightKeys = selectedNodes.map(item => {
            return item.key;
        });
        checkedKeys.forEach(item => {
            if (!rightKeys.includes(item)) {
                let findItem = this.findItem(curNodeslist, item);
                findItem && selectedNodes.push(findItem);
            }
        });
        setSelectedNodes(selectedNodes);
    }

    remove = () => {
        let {selectedNodes, setSelectedNodes} = this.props;
        let {rightCheckedKeys} = this.state;
        let newArr = selectedNodes.filter(item => {
            return !rightCheckedKeys.includes(item.key);
        });
        setSelectedNodes(newArr);
        this.setState({
            rightCheckedKeys: []
        });
    }

    render() {
        let { visible, handleCancel, title, searchUsers, treeNodes, selectedNodes } = this.props;
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
                                    checkedKeys={this.state.checkedKeys}>
                                    {this.getTreeNodes(searchUsers.length && searchUsers || treeNodes)}
                                </Tree>
                            </div>
                        </div>
                        <div className="opt-wrap">
                            <div className="opt-item add" onClick={this.add}></div>
                            <div className="opt-item remove" onClick={this.remove}></div>
                        </div>
                        <div className="user-tree-inner">
                            <p className="text">已添加</p>
                            <div className="user-tree">
                                <Tree
                                    checkable
                                    onCheck={this.handleRightCheck}
                                    checkedKeys={this.state.rightCheckedKeys}>
                                    {this.getTreeNodes(selectedNodes)}
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
