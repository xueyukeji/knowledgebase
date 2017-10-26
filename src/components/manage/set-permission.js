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
        showSetPerDailog: false
    }
    showPerDialog = () => {
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
        const curLibrary = knowledgeObj && knowledgeObj.librarys.filter((k) => {
            return k.id === parseInt(match.params.id)
        })
        if (curLibrary.length === 0) {
            return <div>正在加载......</div>
        }
        return (
            <div className="mod-setpermission">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <NavLink to={'/manage'} activeClassName="active"> {curLibrary[0].name} </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>权限设置</Breadcrumb.Item>
                </Breadcrumb>
                <div className="tc">
                    <Button type="primary" onClick={this.showPerDialog}>设置权限</Button>
                </div>
                <PermissionList showDialog={this.showPerDialog} />
                {
                    this.state.showSetPerDailog ? <SetperDialog visible={true} hideDialog={this.hidePerDialog}/> : null
                }
            </div>
        );
    }
}
