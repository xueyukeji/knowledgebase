import React, {Component} from 'react'

export default class Top extends Component {
    render() {
        return (
            <div className="top">
                <div className="top__item cloud">
                    <a href="">云盘</a>
                </div>
                <div className="top__item base active">
                    <a href="">知识库</a>
                </div>
            </div>
        )
    }
}
