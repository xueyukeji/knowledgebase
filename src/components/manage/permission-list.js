import React, { Component } from 'react'
import { Button } from 'element-react-codish'
import { inject, observer } from 'mobx-react'

@inject(stores => {
    let {
        setIsUserDiloag,
    } = stores.manage;
    let {
        setTags
    } = stores.tag
    return {
        setTags,
        setIsUserDiloag
    };
})
@observer
export default class Manage extends Component {
    state = {
        permissionList: [
            {
                id: 1,
                name: 'jeff',
                tags: [{id: 1, name: '语文'}, {id: 1, name: '语文1'}, {id: 1, name: '语文2'}]
            },
            {
                id: 2,
                name: 'jeff',
                tags: [{id: 1, name: '语文'}, {id: 1, name: '语文1'}, {id: 1, name: '语文2'}]
            }, {
                id: 3,
                name: 'jeff',
                tags: [{id: 1, name: '语文'}, {id: 1, name: '语文1'}, {id: 1, name: '语文2'}]
            }, {
                id: 4,
                name: 'jeff',
                tags: [{id: 1, name: '语文'}, {id: 1, name: '语文1'}, {id: 1, name: '语文2'}]
            }
        ]
    }

    componentWillMount() {
    }
    showEdit = () => {

    }
    delPermisson = () => {

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
                                    <Button type="text" onClick={showDialog}>编辑</Button>
                                    <Button type="text" onClick={() => {this.delPermisson()}}>删除</Button>
                                </div>
                            </li>
                        )
                    })

                }
            </ul>
        )
    }
}
