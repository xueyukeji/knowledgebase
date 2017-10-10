import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';

class Store {
    // todo
    @observable userInfo = {
        data: {
            // userName: 'jeff',
            // userId: 98,
            // userType: 0,
            // userIcon: ''
        }
    };
    @observable userFile = [];
    @observable curFileParents = [];
    @observable selected = [];

    @action getUserInfo = () => {
        return createFetch({
            url: 'user'
        }).then(data => {
            this.userInfo = data;
        }).catch(() => {
            // todo
            window.location = window.location.origin + '/login.html';
        });
    }
    @action getUserFile = (fi = '') => {
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
    }
    @action setUserFile = data => {
        this.userFile = data;
    }
    @action setCurFileParents = data => {
        this.curFileParents = data;
    }
    @action setSelected = data => {
        this.selected = data;
    }
}

export default new Store()
