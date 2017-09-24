import {observable, action} from 'mobx';

class Store {
    @observable username = 'nieying'
    @action setUserName = username => {
        this.username = username
    }
}

export default new Store()
