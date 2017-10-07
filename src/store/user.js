import { observable, action } from 'mobx';
import {createFetch} from './fetch-creator';

class Store {
    @observable userInfo = {};

    @action getUserInfo = () => {
        return createFetch({
            url: 'apps/user'
        }).then(data => {
            this.userInfo = data;
        });
    }
}

export default new Store()
