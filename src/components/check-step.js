import React, {Component} from 'react'

export default class CheckStep extends Component {
    render() {
        return (
            <div className="check-step">
                <div className="step-item">
                    <span className="step-num">1</span>
                    <span className="step-title">发起审核</span>
                </div>
                <div className="step-item cur">
                    <span className="step-num">2</span>
                    <span className="step-title">正在处理</span>
                </div>
                <div className="step-item">
                    <span className="step-num">3</span>
                    <span className="step-title">审核完成</span>
                </div>
            </div>
        )
    }
}
