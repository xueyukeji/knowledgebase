import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
// import defaultAvatar from '../assets/images/default-avatar.png';
import _ from 'lodash';
import {Icon} from 'antd'

export default class Nav extends Component {

    state = {
        expertDialog: false,
        selectUsers: [],
        curLibrary: [],
        dialogTitle: '',
        showKnowList: true
    }

    toggleShowMore() {
        const {showKnowList} = this.state;
        this.setState({
            showKnowList: !showKnowList
        });
    }

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
        if (_.startsWith(pathname, '/item-detail')) {
            let path = pathname.split('/');
            if (path && path[2] == id) {
                return true;
            } else {
                return false;
            }
        }
        if (_.startsWith(pathname, '/edit-item')) {
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
        let {list, userInfo} = this.props;
        let {showKnowList} = this.state;

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
                <div className="logo"/>
                <div className="nav-item nav-my">
                    <NavLink to="/my-contribution" activeClassName="active">我的贡献</NavLink>
                </div>
                <div className="nav-item nav-know" onClick={() => {
                    this.toggleShowMore()
                }}>
                    <a>知 识 库 {showKnowList ? <Icon type="caret-down"/> : <Icon type="caret-up"/>} </a>
                </div>
                {
                    showKnowList ? <div className="kd-list" id="scrollWrap">
                        {list.map(item => {
                            return (
                                <div className="nav-item nav-base" key={item.id} title={item.name}>
                                    <NavLink to={`/knowledge/${item.id}`} activeClassName="active" isActive={(match, location) => {
                                        return this.isKnowledgeActive(item.id, match, location);}}>
                                        {item.name}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div> : null
                }
                <div className="nav-item__sep"/>
                <div className="nav-item nav-professor">
                    <NavLink to="/professor" activeClassName="active">排 行 榜</NavLink>
                </div>
                {
                    professorObj ? <div className="nav-item nav-check">
                        <NavLink to="/my-check" activeClassName="active">我的审批</NavLink>
                    </div> : ''
                }
                {userType === 0 || userType === 1 ? (
                    <div className="nav-item nav-manage">
                        <NavLink to="/manage" activeClassName="active">知识管理</NavLink>
                    </div>
                ) : null}

                <div className="nav-item nav-cloud">
                    <a href="/home.html">返回云盘</a>
                </div>
                <div className="user-info">
                    {/* <img src={userIcon} alt="" />
                    <p className="tc">{userName}</p> */}
                </div>
            </div>
        );
    }
}
