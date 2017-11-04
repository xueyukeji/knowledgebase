import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import defaultAvatar from '../assets/images/default-avatar.png';
import _ from 'lodash';

export default class Nav extends Component {
    isKnowledgeActive = (id, match, location) => {
        let pathname = location.pathname;
        if (match) return true;
        if (_.startsWith(pathname, '/add-item')) {
            let path = pathname.split('/');
            if (path && path[2] == id) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    render() {
        let { list, userInfo } = this.props;
        let userType = '',
            // userName = '',
            // userIcon = defaultAvatar,
            professorObj = undefined;
        if (userInfo && userInfo.data) {
            userType = userInfo.data.userType;
            // userName = userInfo.data.userName;
            // userIcon = userInfo.data.userIcon || defaultAvatar;
            professorObj = list.find(item => {
                return item.auditType === 1 && item.professorIds.indexOf(userInfo.data.userId) != -1
            })
        }
        return (
            <div className="nav">
                <div className="logo" />
                <div className="kd-list" id="scrollWrap">
                    {list.map(item => {
                        return (
                            <div className="nav-item nav-base" key={item.id}>
                                <NavLink to={`/knowledge/${item.id}`} activeClassName="active" isActive={(match, location) => {
                                    return this.isKnowledgeActive(item.id, match, location);
                                }}>
                                    {item.name}
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
                <div className="nav-item nav-my">
                    <NavLink to="/my-contribution" activeClassName="active">我的贡献</NavLink>
                </div>

                <div className="nav-item__sep" />
                {
                    professorObj ? <div className="nav-item nav-check">
                        <NavLink to="/my-check" activeClassName="active">我的审批</NavLink>
                    </div> : ''
                }
                <div className="nav-item nav-professor">
                    <NavLink to="/professor" activeClassName="active">排行榜</NavLink>
                </div>
                {userType === 0 || userType === 1 ? (
                    <div className="nav-item nav-manage">
                        <NavLink to="/manage" activeClassName="active">知识管理</NavLink>
                    </div>
                ) : null}

                <div className="nav-item nav-cloud">
                    <a target="_blank" href="/home.html">返回云盘</a>
                </div>
                <div className="user-info">
                    {/* <img src={userIcon} alt="" />
                    <p className="tc">{userName}</p> */}
                </div>
            </div>
        );
    }
}
