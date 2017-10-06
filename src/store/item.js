import { observable, action } from 'mobx';

class Store {
    @observable knowledgeItemList = [];
    @action setKnowledgeItemList = list => {
        this.knowledgeItemList = list;
    }
    @action getKnowledgeItemList = () => {
        fetch('/pub/item').then(res => {
            return res.json();
        }).then(data => {
            console.log('item item --->', data.data.items)
            if (data.data && data.data.items.length) {
                this.setKnowledgeItemList(data.data.items);
            }
        });
    }

    @action creatKnowledgeItem = params => {
        return fetch('/pub/librarys', {
            method: 'post',
            body: JSON.stringify(params)
        })
    }

    @action removeKnowledgeItem = params => {
        return fetch('pub/librarys/' + params + '/del', {
            method: 'post'
        })
    }

    @action modifyKnowledgeItem = params => {
        return fetch('pub/librarys/' + params.id, {
            method: 'post',
            body: JSON.stringify(params)
        })
    }
}

export default new Store()
