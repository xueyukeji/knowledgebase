import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';

class Store {
    @observable itemListobj = null;
    @observable userItemsObj = null;
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
        this.itemListobj = obj;
    }
    @action getItemList = params => {
        createFetch({
            url: 'pub/items',
            params: params
        }).then(data => {
            if (data.data && data.data.items.length) {
                this.setItemList(data);
            } else {
                this.setItemList(null);
            }
        });
    }

    @action getUserItems = params => {
        createFetch({
            url: 'pub/users/items',
            params: params
        }).then(data => {
            if (data.data && data.data.items.length) {
                this.setUserItemList(data);
            } else {
                this.setUserItemList(null);
            }
        });
    }

    @action setUserItemList = obj => {
        this.userItemsObj = obj;
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
