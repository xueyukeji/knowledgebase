import { observable, action, computed } from 'mobx';

class Store {
    @observable tags = [];
    @observable isAddTagPopVisible = false;
    @computed get parentTags() {
        return this.tags.filter(item => {
            return !item.parentId;
        });
    }

    @action showAddTagPop = () => {
        this.isAddTagPopVisible = true;
    }
    @action hideAddTagPop = () => {
        this.isAddTagPopVisible = false;
    }
    @action setTags = list => {
        this.tags = list;
    }
    @action getTags = () => {
        return fetch('/pub/tags').then(res => {
            return res.json()
        }).then(data => {
            if (data.data && data.data.tags.length) {
                this.setTags(data.data.tags);
            }
        });
    }
    @action getTagsById = params => {
        var parentId = params ? params.parentId : ''
        return fetch('/pub/tags/' + parentId).then(res => {
            return res.json()
        }).then(data => {
            if (data.data && data.data.tags.length) {
                return data.data.tags;
            }
        });
    }

    @action creatTag = params => {
        return fetch('/pub/tags', {
            method: 'post',
            body: JSON.stringify(params)
        }).then(this.getTags);
    }

    @action updateTag = params => {
        return fetch('/pub/tags/' + params.id + '/update', {
            method: 'post',
            body: JSON.stringify(params)
        })
    }

    @action deleteTag = params => {
        return fetch('/pub/tags/' + params.id + '/del', {
            method: 'post',
            body: JSON.stringify(params)
        })
    }
}

export default new Store()
