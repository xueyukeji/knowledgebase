import { observable, action, computed } from 'mobx';
import { createFetch } from '../utils/fetch-creator';
import { Message } from 'element-react-codish';
class Store {
    @observable tags = [];
    @observable curLibId = '';
    @observable isAddTagPopVisible = false;
    @computed get parentTags() {
        return this.tags.filter(item => {
            return !item.parentId;
        });
    }

    @action setCurLibId = (id) => {
        this.curLibId = id
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
    @action getTags = (id) => {
        return createFetch({
            url: 'pub/tags',
            params: { libraryId: id }
        }).then(data => {
            if (data.data && data.data.tags.length) {
                this.setTags(data.data.tags);
            } else {
                this.setTags([]);
            }
        });
    }
    @action getTagsById = params => {
        var parentId = params ? params.parentId : ''
        return createFetch({
            url: 'pub/tags/' + parentId
        }).then(data => {
            if (data.data && data.data.tags.length) {
                return data.data.tags;
            }
        });
    }

    @action creatTag = params => {
        return createFetch({
            url: 'pub/tags',
            method: 'post',
            body: params
        }).then((res) => {
            if (res.code !== 200) {
                Message(res.msg)
                return
            }
            this.getTags(this.curLibId)
        });
    }

    @action updateTag = params => {
        return createFetch({
            url: 'pub/tags/' + params.id + '/update',
            method: 'post',
            body: params
        });
    }

    @action deleteTag = params => {
        return createFetch({
            url: 'pub/tags/' + params.id + '/del',
            method: 'post',
            body: params
        });
    }
}

export default new Store()
