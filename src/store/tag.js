import { observable, action } from 'mobx';

class Store {
    @observable tags = [];
    @observable parentTags = [];
    @observable childTags = [];

    @action setTags = list => {
        list.push({ id: null })
        this.listToTree(list, {
            idKey: 'id',
            parentKey: 'parentId',
            childrenKey: 'children'
        })
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

    @action listToTree(data, options) {
        options = options || {};
        var ID_KEY = options.idKey || 'id';
        var PARENT_KEY = options.parentKey || 'parent';
        var CHILDREN_KEY = options.childrenKey || 'children';

        var tree = [],
            childrenOf = {};
        var item, id, parentId;

        for (var i = 0, length = data.length; i < length; i++) {
            item = data[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] === undefined ? 0 : item[PARENT_KEY]
            // every item may have children
            childrenOf[id] = childrenOf[id] || [];
            // init its children
            item[CHILDREN_KEY] = childrenOf[id];
            if (parentId !== 0) {
                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children object
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        }
        return tree;
    }

    // router.get('/pub/tags', tag.getTags) // 所有标签(默认除开自定义标签)
    // router.get('/pub/tags/:parentId', tag.getTagsById) // 根据pid获取标签
    // router.post('/pub/tags', tag.createTag) // 创建标签(是否自定义 0 | 1)
    // router.post('/pub/tags/:id/update', tag.updateTag)
    // router.post('/pub/tags/:id/del', tag.deleteTag)
}
export default new Store()
