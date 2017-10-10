import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react'
@inject(stores => {
    let {
        userInfo,
        getUserInfo
    } = stores.user
    return {
        userInfo,
        getUserInfo
    }
})
@observer
export default class Nav extends Component {
    render() {
        let { list } = this.props;
        return (
            <div className="nav">
                <div className="logo"></div>
                <div className="kd-list">
                    {
                        list.map(item => {
                            return (
                                <div className="nav-item nav-base" key={item.id}>
                                    <NavLink
                                        to={`/knowledge/${item.id}`}
                                        activeClassName="active">
                                        {item.name}
                                    </NavLink>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="nav-item__sep"></div>
                {/**
                <div className="nav-item nav-my">
                    <NavLink to="/my-contribution" activeClassName="active">我的贡献</NavLink>
                </div>
                <div className="nav-item nav-check">
                    <NavLink to="/my-check" activeClassName="active">我的审批</NavLink>
                </div>
                <div className="nav-item nav-professor">
                    <NavLink to="/professor" activeClassName="active">知识专家</NavLink>
                </div>**/}
                {
                    (this.props.userInfo.data.userType === 0 || this.props.userInfo.data.userType === 1) ?
                        <div className="nav-item nav-manage">
                            <NavLink to="/manage" activeClassName="active">知识管理</NavLink>
                        </div> : null
                }
                <div className="user-info">
                    <p className="tc">{this.props.userInfo.data.userName}</p>
                    {/* <img src={this.props.userInfo.data.userIcon} alt="" /> */}
                </div>
            </div>
        )
    }
}
