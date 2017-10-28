import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';

class Store {
    @observable checkItemDetail = {};

    @action getItemDetail = (itemId) => {
        return createFetch({
            url: 'pub/items/' + itemId
        }).then((data) => {
            if (data.data && data.data.item) {
                this.checkItemDetail = data.data.item;
                return data.data.item
            }
        });
    }
    @action audit = (id, params) => {
        return createFetch({
            url: `pub/items/${id}/audit`,
            method: 'post',
            body: params
        });
    }
}

export default new Store()
