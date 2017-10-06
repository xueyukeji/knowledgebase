import { observable, action } from 'mobx';

class Store {
    @observable parentTags = [];
    @observable childTags = [];

    @action getTags = params => {
        return fetch('/pub/tags', params).then(() => {
            // todo
        })
    }
    @action setParentTags = list => {
        this.parentTags = list;
    }
    @action setChildTags = list => {
        this.childTags = list;
    }
    @action getTagsById = params => {
        var parentId = params ? params.parentId : ''
        return fetch('/pub/tags/' + parentId).then(res => {
            return res.json()
        }).then(data => {
            if (data.data && data.data.tags.length) {
                if (parentId) {
                    this.setChildTags(data.data.tags);
                } else {
                    this.setParentTags(data.data.tags);
                }
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
