import React, {Component} from 'react';

export default class ProfessorItem extends Component {
    state = {
        professorList: [
            {id: 1, name: 'one', job: 123},
            {id: 1, name: 'one', job: 123},
            {id: 1, name: 'one', job: 123},
            {id: 1, name: 'one', job: 123},
            {id: 1, name: 'one', job: 123}
        ]
    }
    renderIconfun = (index) => {
        if (index === 0) {
            return (<i className='medals guanjun'></i>)
        } else if (index === 1) {
            return (<i className='medals jijun'></i>)
        } else if (index === 2) {
            return (<i className='medals yajun'></i>)
        }
    }
    render() {
        return (
            <div className="professor-list">
                {this.state.professorList.map((item, index) => {
                    return (
                        <div className="professor-item" key={index}>
                            {this.renderIconfun(index)}
                            <div className="avator ">
                                <img src="" alt="" />
                            </div>
                            <div className="info">
                                <p className="name">{item.name}</p>
                                <p className="job">贡献指数：{item.job}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
