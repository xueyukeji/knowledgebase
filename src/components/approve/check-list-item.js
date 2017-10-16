import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class CheckListItem extends Component {
    render() {
        return (
            <div className="check-list-item">
                <div className="col file-icon">
                    <span className="word"></span>
                </div>
                <div className="col info">
                    <div className="info-title">
                        小学数学知识点大全
                    </div>
                    <div className="info-date">
                        提交时间：2017/2/2
                    </div>
                </div>
                <div className="col opt">
                    <span className="cur-state state-pass">通过</span>
                    <span className="cur-state state-reject">未通过</span>
                    <span className="cur-state state-ready">待审核</span>
                    <span className="pass">通过</span>
                    <span className="reject">驳回</span>
                    <Link className="detail" to="/my-check/detail">详情</Link>
                </div>
            </div>
        )
    }
}
