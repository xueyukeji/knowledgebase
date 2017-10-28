import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Message } from 'element-react-codish'
import { inject, observer } from 'mobx-react'

@inject(stores => {
    let {
        permissions,
        getPermissions,
        delPermisson,
    } = stores.manage;
    return {
        permissions,
        getPermissions,
        delPermisson
    };
})
@observer
class PermissionList extends Component {
    componentWillMount() {
        this.props.getPermissions(this.props.match.params)
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
        const { showDialog, permissions } = this.props
        if (permissions.length === 0) {
            return <div></div>
        }
        return (
            <ul className="permission-list">
                {
                    permissions.map((item, index) => {
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
export default withRouter(PermissionList);
