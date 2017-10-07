import { observable, action, computed } from 'mobx';

class Store {
    @observable tags = [];
    @computed get parentTags() {
        return this.tags.filter(item => {
            return !item.parentId;
        });
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
        })
    }

    @action updateTag = params => {
        return fetch('/pub/tags' + params.id + '/update', {
            method: 'post',
            body: JSON.stringify(params)
        })
    }

    @action deleteTag = params => {
        return fetch('/pub/tags' + params.id + '/del', {
            method: 'post',
            body: JSON.stringify(params)
        })
    }

    // router.get('/pub/tags', tag.getTags) // 所有标签(默认除开自定义标签)
    // router.get('/pub/tags/:parentId', tag.getTagsById) // 根据pid获取标签
    // router.post('/pub/tags', tag.createTag) // 创建标签(是否自定义 0 | 1)
    // router.post('/pub/tags/:id/update', tag.updateTag)
    // router.post('/pub/tags/:id/del', tag.deleteTag)
}
export default new Store()
