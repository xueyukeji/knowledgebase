import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Breadcrumb, Button} from 'element-react-codish';
import PermissionList from './permission-list'
import SetperDialog from './setper-dialog'
@inject(stores => {
    let { knowledgeObj } = stores.manage
    return {
        knowledgeObj
    };
})
@observer
export default class Setpermission extends Component {
    state = {
        showSetPerDailog: false,
        curPermission: {},
        title: ''
    }
    showPerDialog = (item) => {
        if (!item) {
            this.setState({
                curPermission: {},
                title: '添加权限'
            })
        } else {
            this.setState({
                curPermission: item,
                title: '编辑权限'
            })
        }
        this.setState({
            showSetPerDailog: true
        })
    }
    hidePerDialog = () => {
        this.setState({
            showSetPerDailog: false
        })
    }
    render() {
        const { knowledgeObj, match } = this.props
        const { curPermission, title } = this.state
        const curLibrary = knowledgeObj && knowledgeObj.librarys.find((item) => item.id === parseInt(match.params.id))
        return (
            <div className="mod-setpermission">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <NavLink to={'/manage'} activeClassName="active"> {curLibrary && curLibrary.name} </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>权限设置</Breadcrumb.Item>
                </Breadcrumb>
                <div className="tc">
                    <Button type="primary" onClick={() => {this.showPerDialog(null)}}>添加权限</Button>
                </div>
                <PermissionList showDialog={this.showPerDialog} />
                {
                    this.state.showSetPerDailog ?
                        <SetperDialog
                            visible={true}
                            title = {title}
                            curPermission={curPermission}
                            hideDialog={this.hidePerDialog}/> : null
                }
            </div>
        );
    }
}
