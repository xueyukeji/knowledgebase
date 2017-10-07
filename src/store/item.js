import { observable, action } from 'mobx';
import {createFetch} from './fetch-creator';

class Store {
    @observable itemListobj = null;
    @action setItemList = obj => {
        this.itemListobj = obj;
    }
    @action getItemList = (params) => {
        createFetch({
            url: 'pub/getItem',
            method: 'post',
            params: {
                libraryId: params.libraryId,
                start: params.start,
                limit: params.limit
            }
        }).then(data => {
            if (data.data && data.data.items.length) {
                this.setItemList(data);
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
