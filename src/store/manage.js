import {observable, action} from 'mobx';

class Store {
    @observable knowledgeList = [];
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
}

export default new Store()
