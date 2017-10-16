import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import defaultAvatar from '../assets/images/default-avatar.png';

export default class Nav extends Component {
    render() {
        let { list, userInfo } = this.props;
        let userType = '',
            userName = '',
            userIcon = defaultAvatar;
        if (userInfo && userInfo.data) {
            userType = userInfo.data.userType;
            userName = userInfo.data.userName;
            userIcon = userInfo.data.userIcon || defaultAvatar;
        }
        return (
            <div className="nav">
                <div className="logo" />
                <div className="kd-list" id="scrollWrap">
                    {list.map(item => {
                        return (
                            <div className="nav-item nav-base" key={item.id}>
                                <NavLink to={`/knowledge/${item.id}`} activeClassName="active">
                                    {item.name}
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
                <div className="nav-item nav-cloud">
                    <a target="_blank" href="/home.html">
            云盘
                    </a>
                </div>
                <div className="nav-item__sep" />
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
                {userType === 0 || userType === 1 ? (
                    <div className="nav-item nav-manage">
                        <NavLink to="/manage" activeClassName="active">
              知识管理
                        </NavLink>
                    </div>
                ) : null}
                <div className="user-info">
                    <img src={userIcon} alt="" />
                    <p className="tc">{userName}</p>
                </div>
            </div>
        );
    }
}
