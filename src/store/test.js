import {observable, action} from 'mobx';

class Store {
    @observable username = 'nieying'
    @action setUserName = username => {
        this.username = username
    }
}

let store = new Store()

export default store
