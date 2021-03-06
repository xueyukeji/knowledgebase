import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';
import Cookies from 'js-cookie';
import when from 'when';
import _ from 'lodash';

class Store {
    @observable userInfo = { data: {} };
    @observable userList = [];
    @observable userFile = [];
    @observable curFileParents = [];
    @observable selected = [];
    @observable deptList = {};
    @observable treeNodes = [];
    @observable boardList = {users: []};
    @observable searchUsers = [];
    @observable searchValue = '';
    @observable selectedNodes = [];

    @action
    getUserInfo = () => {
        return createFetch({
            url: 'user'
        }).then(({ data }) => {
            this.userInfo.data = data;
        }).catch(() => {
            Cookies.set('ct', '');
            process.env.NODE_ENV !== 'development' && (window.location = '/login.html');
        });
    };
    @action
    getUserList = params => {
        return createFetch({
            url: 'users',
            params
        }).then(data => {
            if (data && data.data.users.length > 0) {
                this.userList = data.data.users;
            } else {
                this.userList = [];
            }
            return this.userList;
        });
    };
    @action searchUser = params => {
        return createFetch({
            url: 'users',
            params
        }).then(data => {
            if (data && data.data.users.length > 0) {
                if (this.searchValue === '') return;
                let nodes = data.data.users.map(item => {
                    return {
                        key: `${item.userId}`,
                        title: `${item.realName}`,
                        isLeaf: true
                    };
                });
                if (nodes.length) {
                    this.setSearchUsers(nodes);
                } else {
                    this.setSearchUsers([]);
                }
            }
        });
    };
    @action
    getUserFile = (fi = '',key ='') => {
        return createFetch({
            url: 'files',
            method: 'get',
            params: {
                fc: 'personal',
                fi: fi,
                key: key,
                offset: 0,
                limit: 200
            }
        }).then(data => {
            console.log('data:', data);
            this.userFile = data.data.files;
            if (data.data.parents) {
                this.setCurFileParents(data.data.parents);
            }
        });
    };
    @action
    setUserFile = data => {
        this.userFile = data;
    };
    @action
    setCurFileParents = data => {
        this.curFileParents = data;
    };
    @action
    setSelected = data => {
        this.selected = data;
    };
    @action
    viewFile = params => {
        return createFetch({
            url: '/file/view',
            params: {
                fc: 'personal',
                fi: params.fileId,
                fv: params.fileVersion
            }
        });
    };
    @action getDeptAndUser = node => {


        if(node != -1 && node.props.children){
            return  Promise.resolve();
        }

        let id = -1;

        if(node != -1){
            id = node.props.eventKey;
        }

        if (!id) return;

        return when.all([
            this.getDeptList({id}),
            this.getUserList({di: id})
        ]).then(data => {
            try {
                let depts = data[0];
                let users = data[1];
                let d = [], u = [], nodes = [];
                d = depts.map(item => {
                    return {
                        pid: id,
                        key: `${item.deptId}`,
                        title: `${item.deptName}`,
                        children: [],
                        isLeaf: false
                    }
                });
                u = users.map(item => {
                    return {
                        pid: id,
                        key: `${item.userId}`,
                        title: `${item.realName}`,
                        isLeaf: true
                    }
                });
                nodes = [].concat(d, u);
                if (id === -1) {
                    this.treeNodes = nodes;
                } else {

                    node.props.dataRef.children = nodes;

                    this.treeNodes = [...this.treeNodes]

                    // this.treeNodes = this.treeNodes.map(item => {
                    //     if (item.key === id) {
                    //         return _.assign({}, item, {
                    //             children: nodes
                    //         });
                    //     }
                    //     return item;
                    // })
                }
            } catch (e) {e}
        });
    }
    @action getDeptList = params => {
        return createFetch({
            url: 'depts',
            params: {
                di: (params && params.id) || -1
            }
        }).then(data => {
            return data.data.depts;
        });
    }
    @action setTreeNodes = nodes => {
        this.treeNodes = nodes;
    }

    @action getBoard = params => {
        return createFetch({
            url: 'pub/users/board',
            params
        }).then(data => {
            if (data && data.data.users.count > 0) {
                this.boardList = data.data.users;
            } else {
                this.boardList = {
                    count: 0,
                    users: []
                };
            }
        });
    }
    @action setSearchUsers = list => {
        this.searchUsers = list;
    }
    @action setSearchValue = v => {
        this.searchValue = v;
    }
    @action setSelectedNodes = list => {
        this.selectedNodes = list;
    }
}

export default new Store();
