import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <div className="logo"></div>
                <div className="nav-item nav-base">
                    <NavLink to="/knowledge" activeClassName="active">知识库1</NavLink>
                </div>
                <div className="nav-item nav-base">
                    <NavLink to="/t1" activeClassName="active">知识库2</NavLink>
                </div>
                <div className="nav-item__sep"></div>
                <div className="nav-item nav-my">
                    <NavLink to="/test1" activeClassName="active">我的贡献</NavLink>
                </div>
                <div className="nav-item nav-check">
                    <NavLink to="/my-check" activeClassName="active">我的审批</NavLink>
                </div>
                <div className="nav-item nav-professor">
                    <NavLink to="/professor" activeClassName="active">知识专家</NavLink>
                </div>
                <div className="nav-item nav-manage">
                    <NavLink to="/manage" activeClassName="active">知识管理</NavLink>
                </div>
            </div>
        )
    }
}
