import { observable, action } from 'mobx';

class Store {
    @observable itemList = [];
    @action setItemList = list => {
        this.itemList = list;
    }
    @action getItemList = () => {
        fetch('/pub/item').then(res => {
            return res.json();
        }).then(data => {
            if (data.data && data.data.items.length) {
                this.setItemList(data.data.items);
            }
        });
    }

    @action createItem = params => {
        console.log(JSON.stringify(params))
        debugger
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
