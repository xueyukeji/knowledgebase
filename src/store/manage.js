import { observable, action } from 'mobx';

class Store {
    @observable knowledgeList = [];
    @observable curKnowledge = null;
    @observable isShowEditKnowledgeDialog = false;

    @action showEditKnowledgeDialog = (params) => {
        console.log('stores-->', params)
        this.curKnowledge = {name: params.name, id: params.id}
        this.isShowEditKnowledgeDialog = true
    }

    @action hideEditKnowledgeDialog = () => {
        this.isShowEditKnowledgeDialog = false
    }

    @action setKnowledgeList = list => {
        this.knowledgeList = list;
    }
    @action getKnowledgeList = () => {
        fetch('/pub/librarys').then(res => {
            return res.json();
        }).then(data => {
            if (data.data && data.data.librarys.length) {
                this.setKnowledgeList(data.data.librarys);
            }
        });
    }

    @action creatKnowledge = params => {
        return fetch('/pub/librarys', {
            method: 'post',
            body: JSON.stringify(params)
        })
    }

    @action removeKnowledge = params => {
        return fetch('pub/librarys/' + params + '/del', {
            method: 'post'
        })
    }

    @action modifyKnowledge = params => {
        return fetch('pub/librarys/' + params.id, {
            method: 'post',
            body: JSON.stringify(params)
        })
    }
}

export default new Store()
