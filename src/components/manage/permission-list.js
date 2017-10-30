import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Message } from 'element-react-codish'
import { inject, observer } from 'mobx-react'

@inject(stores => {
    let {
        permissions,
        getPermissions,
        delPermission,
    } = stores.manage;
    return {
        permissions,
        getPermissions,
        delPermission
    };
})
@observer
class PermissionList extends Component {
    componentWillMount() {
        this.props.getPermissions(this.props.match.params)
    }
    removePermisson = (id) => {
        let params = {
            id: this.props.match.params.id,
            professorId: id
        }
        this.props.delPermission(params).then((res) => {
            if (res.code !== 200) {
                Message(res.msg);
                return;
            }
            Message('删除成功')
            this.props.getPermissions(this.props.match.params)
        })
    }
    render() {
        const { showDialog, permissions } = this.props
        if (permissions.length === 0) {
            return <div className="empty-tips">暂无权限设置</div>
        }
        return (
            <ul className="permission-list">
                {
                    permissions.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="title">{item.userInfo.userName}</span>
                                审核
                                {
                                    item.tagInfos.map((tag, index) => {
                                        return (
                                            <span className="tag" key={index}>{tag.tag}</span>
                                        )
                                    })
                                }
                                <div className="op-btns">
                                    <Button type="text" onClick={() => {showDialog(item)}}>编辑</Button>
                                    <Button type="text" onClick={() => {this.removePermisson(item.userInfo.userId)}}>删除</Button>
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
