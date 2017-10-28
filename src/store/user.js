import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';
import Cookies from 'js-cookie';
import when from 'when';
import _ from 'lodash';

class Store {
    @observable userInfo = { data: {
        userId: 98,
        userName: 'jeff',
        userType: 0
    } };
    @observable userList = [];
    @observable userFile = [];
    @observable curFileParents = [];
    @observable selected = [];
    @observable deptList = {};
    @observable treeNodes = [];

    @action
    getUserInfo = () => {
        return createFetch({
            url: 'user'
        })
            .then(({ data }) => {
                this.userInfo.data = data;
            })
            .catch(() => {
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
                return data.data.users
            }
            return [];
        });
    };
    @action
    getUserFile = (fi = '') => {
        return createFetch({
            url: 'files',
            method: 'get',
            params: {
                fc: 'personal',
                fi: fi,
                offset: 0,
                limit: 200
            }
        }).then(data => {
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
    @action getDeptAndUser = id => {
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
                        key: `${item.deptId}`,
                        title: `${item.deptName}`,
                        children: [],
                        isLeaf: false
                    }
                });
                u = users.map(item => {
                    return {
                        key: `${item.userId}`,
                        title: `${item.userName}`,
                        isLeaf: true
                    }
                });
                nodes = [].concat(d, u);
                if (id === -1) {
                    this.treeNodes = nodes;
                } else {
                    this.treeNodes = this.treeNodes.map(item => {
                        if (item.key === id) {
                            return _.assign({}, item, {
                                children: nodes
                            });
                        }
                        return item;
                    })
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
}

export default new Store();
