import { observable, action } from 'mobx';
import { createFetch } from '../utils/fetch-creator';

class Store {
    @observable knowledgeList = [];
    @observable curKnowledge = null;
    @observable isShowEditKnowledgeDialog = false;
    @observable isUserDialog = false;

    @action showEditKnowledgeDialog = (params) => {
        if (params) {
            this.curKnowledge = params
        } else {
            this.curKnowledge = {}
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
            url: 'pub/librarys/admin'
        }).then(data => {
            if (data.data && data.data.librarys.length) {
                this.setKnowledgeList(data.data.librarys);
            } else {
                this.setKnowledgeList([]);
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

    @action setUsers = params => {
        return createFetch({
            url: 'pub/librarys/' + params.id + '/users',
            method: 'post',
            body: {
                userIds: params.userIds
            }
        });
    }

    @action setExpert = params => {
        return createFetch({
            url: 'pub/librarys/' + params.id + '/professors',
            method: 'post',
            body: {
                professorIds: params.professorIds
            }
        });
    }

    @action setIsUserDiloag = params => {
        this.isUserDialog = params
    }
}

export default new Store()
