import React, {Component} from 'react'

export default class ProfessorItem extends Component {
    render() {
        return (
            <div className="professor-item">
                <div className="avator">
                    <img src="" alt="" />
                </div>
                <div className="info">
                    <p className="name">聂颖</p>
                    <p className="job">高级生理卫生教师</p>
                </div>
            </div>
        )
    }
}
