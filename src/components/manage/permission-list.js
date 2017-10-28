import React, { Component } from 'react'
import { Button, Message } from 'element-react-codish'
import { inject, observer } from 'mobx-react'

@inject(stores => {
    let {
        getPermissionList,
        delPermisson,
    } = stores.manage;
    return {
        getPermissionList,
        delPermisson
    };
})
@observer
export default class Manage extends Component {
    state = {
        permissionList: [
            {
                id: 1,
                professorId: 1,
                name: 'jeff',
                tags: [{id: 1, name: 'one'}, {id: 2, name: 'two'}, {id: 3, name: 'three'}]
            },
            {
                id: 2,
                professorId: 2,
                name: 'jeff',
                tags: [{id: 1, name: '语文'}, {id: 1, name: '语文1'}, {id: 1, name: '语文2'}]
            }, {
                id: 3,
                professorId: 3,
                name: 'jeff',
                tags: [{id: 1, name: '语文'}, {id: 1, name: '语文1'}, {id: 1, name: '语文2'}]
            }, {
                id: 4,
                professorId: 4,
                name: 'jeff',
                tags: [{id: 1, name: '语文'}, {id: 1, name: '语文1'}, {id: 1, name: '语文2'}]
            }
        ]
    }

    componentWillMount() {

    }
    removePermisson = (id) => {
        this.props.delPermisson(id).then((res) => {
            if (res.code !== 200) {
                Message(res.msg);
                return;
            }
            console.log('removePermissiom event:', res)
        })
    }
    render() {
        const {permissionList} = this.state
        const { showDialog } = this.props
        if (permissionList.length === 0) {
            return <div>正在加载......</div>
        }
        return (
            <ul className="permission-list">
                {
                    permissionList.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="title">{item.name}</span>
                                审核
                                {
                                    item.tags.map((tag, index) => {
                                        return (
                                            <span className="tag" key={index}>{tag.name}</span>
                                        )
                                    })
                                }
                                <div className="op-btns">
                                    <Button type="text" onClick={() => {showDialog(item)}}>编辑</Button>
                                    <Button type="text" onClick={() => {this.removePermisson(item.id)}}>删除</Button>
                                </div>
                            </li>
                        )
                    })

                }
            </ul>
        )
    }
}
