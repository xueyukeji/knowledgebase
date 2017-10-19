import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';

class Store {
    @observable itemListObj = {items: []};
    @observable myConItemObj = {items: []};
    @observable itemDetails = false; // 知识条目详情
    @observable searchInput = ''; // 知识条目搜索用到
    @observable searchTagIds = []

    @action setSearchInput = str => {
        this.searchInput = str
    }
    @action setSearchTagIds = arr => {
        this.searchTagIds = arr
    }
    @action setItemList = obj => {
        this.itemListObj = obj;
    }
    @action getItemList = params => {
        createFetch({
            url: 'pub/items',
            params: params
        }).then(data => {
            if (data && data.data) {
                this.setItemList(data.data);
            } else {
                this.setItemList({items: []});
            }
        });
    }

    @action getUserItems = params => {
        createFetch({
            url: 'pub/users/items',
            params: params
        }).then(data => {
            if (data && data.data) {
                this.setUserItemList(data.data);
            } else {
                this.setUserItemList({items: []});
            }
        });
    }

    @action setUserItemList = obj => {
        this.myConItemObj = obj;
    }

    @action getItemDetail = (itemId) => {
        return createFetch({
            url: 'pub/items/' + itemId
        }).then((data) => {
            if (data.data && data.data.item) {
                this.itemDetails = data.data.item;
            }
        })
    }

    @action createItem = params => {
        return createFetch({
            url: 'pub/items',
            method: 'post',
            body: params
        });
    }

    @action removeItem = params => {
        return createFetch({
            url: `pub/item/${params}/del`,
            method: 'post'
        });
    }

    @action modifyItem = params => {
        return createFetch({
            url: `pub/items/${params.id}`,
            method: 'post',
            body: params
        });
    }
}

export default new Store()
