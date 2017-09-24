import React, {Component} from 'react'

export default class CheckTop extends Component {
    render() {
        return (
            <div className="check-top">
                <div className="total-num">
                    您有120条知识待审核
                </div>
                <div className="check-filter">
                    <span className="active">全部</span>
                    <span>待审核</span>
                    <span>未通过</span>
                    <span>已通过</span>
                </div>
            </div>
        )
    }
}
