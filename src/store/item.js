import { observable, action } from 'mobx';
import { createFetch } from './fetch-creator';

class Store {
    @observable itemListobj = null;
    @observable searchInput = null;// 知识条目搜索用到
    @observable tagIds = []; // 知识条目搜索用到
    @action setTagIds = arr => {
        this.tagIds = arr
    }
    @action setSearchInput = str => {
        this.searchInput = str
    }
    @action setItemList = obj => {
        this.itemListobj = obj;
    }
    @action getItemList = (params) => {
        createFetch({
            url: 'pub/getItem',
            method: 'post',
            body: params
        }).then(data => {
            if (data.data && data.data.items.length) {
                this.setItemList(data);
            } else {
                this.setItemList(null);
            }
        });
    }

    @action createItem = params => {
        return createFetch({
            url: 'pub/item',
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
            url: `pub/item/${params.id}`,
            method: 'post',
            body: params
        });
    }
}

export default new Store()
