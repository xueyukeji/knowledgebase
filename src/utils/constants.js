export function returnDate(str) {
    if (typeof str === 'string') {
        str = str.split('.')[0] // 去除毫秒
        // 替换T为空格
        str = str.replace(/T/g, ' ')
        const a = str.split(' ')
        const d = a[0].split('-')
        const t = a[1] && a[1].split(':') || []
        return new Date(d[0], (d[1] - 1), d[2], t[0] || 0, t[1] || 0, t[2] || 0)
    } else if (typeof str === 'number') {
        return new Date(str)
    } else if (str instanceof Date) {
        return str
    } else {
        return new Date()
    }
}

export const YYYY_MM_DD = 1
export const MM_DD_HH_SS = 2
export const YYYY_MM_DD_HH_MM = 3 // default
export const YYYY_MM_DD_HH_MM_SS = 4
export const MM_DD = 5
export const HH_MM = 6
export const YYYYMMDD = 7

export function getDateStr(timestamp, mode = 3) {
    if (!timestamp) { return '' }
    const d = returnDate(timestamp)
    const year = d.getFullYear()
    const month = `${('0' + (d.getMonth() + 1)).slice(-2)}`
    const day = `${('0' + d.getDate()).slice(-2)}`
    const hour = `${('0' + d.getHours()).slice(-2)}`
    const minute = `${('0' + d.getMinutes()).slice(-2)}`
    const second = `${('0' + d.getSeconds()).slice(-2)}`
    switch (mode) {
        case YYYY_MM_DD:
            return `${year}-${month}-${day}`
        case MM_DD_HH_SS:
            return `${month}-${day} ${hour}:${minute}`
        case YYYY_MM_DD_HH_MM_SS:
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        case '':
            return `${month}-${day} ${hour}:${minute}`
        case YYYY_MM_DD_HH_MM:
            return `${year}-${month}-${day} ${hour}:${minute}`
        case MM_DD:
            return `${month}-${day}`
        case HH_MM:
            return `${hour}:${minute}`
        case YYYYMMDD:
            return `${year}${month}${day}`
        default:
            return `${year}-${month}-${day} ${hour}:${minute}`
    }
}

export function listToTree(data, options, deleteEmptyChildren) {
    options = options || {};
    var ID_KEY = options.idKey || 'id';
    var PARENT_KEY = options.parentKey || 'parent';
    var CHILDREN_KEY = options.childrenKey || 'children';

    var tree = [], childrenOf = {};
    var item, id, parentId;

    for (var i = 0, length = data.length; i < length; i++) {
        item = data[i];
        id = item[ID_KEY];
        parentId = item[PARENT_KEY] || 0;
        // every item may have children
        childrenOf[id] = childrenOf[id] || [];
        // init its children
        item[CHILDREN_KEY] = childrenOf[id];
        if (parentId != 0) {
            // init its parent's children object
            childrenOf[parentId] = childrenOf[parentId] || [];
            // push it into its parent's children object
            childrenOf[parentId].push(item);
        } else {
            tree.push(item);
        }
    }
    // add by liuchang
    if (deleteEmptyChildren) {
        for (var k = data.length - 1; k >= 0; k--) {
            item = data[k];
            if (!item[CHILDREN_KEY].length && item[PARENT_KEY]) {
                // 不展示空的三级
                delete item[CHILDREN_KEY]
            }
        }
        for (var j = tree.length - 1; j >= 0; j--) {
            item = tree[j];
            if (!item[CHILDREN_KEY].length && item[PARENT_KEY] === null) {
                // 没有二级标签不展示一级标签
                tree.splice(j, 1)
            }
        }
    }
    return tree;
}

export function getStatusStr(status) {
    // 知识条目状态, 0: 待审批, 1: 审批通过, 3: 被拒绝, -1: 全部
    switch (status) {
        case 0:
            return '待审核'
        case 1:
            return '已通过'
        case 3:
            return '未通过'
    }
}
