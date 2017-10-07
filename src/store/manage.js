import { observable, action } from 'mobx';
import {createFetch} from './fetch-creator';

class Store {
    @observable knowledgeList = [];
    @observable curKnowledge = null;
    @observable isShowEditKnowledgeDialog = false;

    @action showEditKnowledgeDialog = (params) => {
        if (params) {
            this.curKnowledge = { name: params.name, id: params.id }
        } else {
            this.curKnowledge = { name: '', id: '' }
        }
        this.isShowEditKnowledgeDialog = true
    }

    @action hideEditKnowledgeDialog = () => {
        this.isShowEditKnowledgeDialog = false
    }

    @action setKnowledgeList = list => {
        this.knowledgeList = list;
    }
    @action getKnowledgeList = () => {
        createFetch({
            url: 'pub/librarys'
        }).then(data => {
            if (data.data && data.data.librarys.length) {
                this.setKnowledgeList(data.data.librarys);
            }
        });
    }

    @action creatKnowledge = params => {
        return createFetch({
            url: 'pub/librarys',
            method: 'post',
            body: params
        });
    }

    @action removeKnowledge = params => {
        return createFetch({
            url: 'pub/librarys/' + params + '/del',
            method: 'post'
        });
    }

    @action modifyKnowledge = params => {
        return createFetch({
            url: 'pub/librarys/' + params.id,
            method: 'post',
            body: params
        });
    }
}

export default new Store()
