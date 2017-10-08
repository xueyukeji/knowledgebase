import { observable, action } from 'mobx';
import {createFetch} from './fetch-creator';

class Store {
    @observable userInfo = {};
    @observable userFile = [];

    @action getUserInfo = () => {
        return createFetch({
            url: 'apps/user'
        }).then(data => {
            this.userInfo = data;
        });
    }
    @action getUserFile = () => {
        return createFetch({
            url: 'file',
            method: 'get',
            params: {
                fc: 'personal'
            }
        });
    }
}

export default new Store()
