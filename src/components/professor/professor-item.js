import React, {Component} from 'react';
import defaultAvatar from '../../assets/images/default-avatar.png';

export default class ProfessorItem extends Component {
    renderIconfun = (index) => {
        if (index === 0) {
            return (<i className='medals guanjun'></i>)
        } else if (index === 1) {
            return (<i className='medals yajun'></i>)
        } else if (index === 2) {
            return (<i className='medals jijun'></i>)
        }
    }
    render() {
        return (
            <div className="professor-list">
                {this.props.boardList.users.map((item, index) => {
                    return (
                        <div className="professor-item" key={index}>
                            {this.renderIconfun(index)}
                            <div className="avator ">
                                {/*<img src={item.userIcon || defaultAvatar} alt={item.userName} />*/}
                                <p className="name">{item.realName || item.userName}</p>
                            </div>
                            <div className="info">
                                <p className="job">贡献指数：{item.total || 0}</p>
                                <p className="job">排名：{index + 1}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
