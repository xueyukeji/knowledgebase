import { observable, action } from 'mobx';

class Store {
    @observable itemListobj = null;
    @action setItemList = obj => {
        this.itemListobj = obj;
    }
    @action getItemList = (params) => {
        fetch('/pub/item/?libraryId=' + params.libraryId + '&start=' + params.start + '&limit=' + params.limit).then(res => {
            return res.json();
        }).then(data => {
            if (data.data && data.data.items.length) {
                this.setItemList(data);
            }
        });
    }

    @action createItem = params => {
        return fetch('/pub/item', {
            method: 'post',
            body: JSON.stringify(params)
        })
    }

    @action removeItem = params => {
        return fetch('pub/item/' + params + '/del', {
            method: 'post'
        })
    }

    @action modifyItem = params => {
        return fetch('pub/item/' + params.id, {
            method: 'post',
            body: JSON.stringify(params)
        })
    }
}

export default new Store()
