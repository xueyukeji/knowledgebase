import {observable, action} from 'mobx';

class Store {
    // 还有问题
    @observable libs = []
    @action getLibs = () => {
        this.libs.push({
            name: '知识库1',
            id: 1
        })
        // , {
        //     name: '知识库2',
        //     id: 2
        // }]
    }
    @action setLib = (lib, index) => {
        this.libs[index] = lib
    }
}

export default new Store()
