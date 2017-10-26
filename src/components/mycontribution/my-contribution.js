import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import MyContributionList from './my-contribution-list'

@inject(stores => {
    stores
})
@observer
export default class Knowledge extends Component {
    status = [
        {id: 1, name: '全部', isActive: true},
        {id: 2, name: '待审核', isActive: false},
        {id: 3, name: '未通过', isActive: false},
        {id: 4, name: '已通过', isActive: false},
    ]
    getDatas = (s) => {
        this.setState({})
        this.status.forEach((d) => {
            d.isActive = false
            if (d.id === s.id) {
                d.isActive = true
            }
        })
    }
    render() {
        return (
            <div className="mod-homepage">
                <h4>知识条目
                    <div className="check-top">
                        <div className="check-filter">
                            {
                                this.status.map((s) => {
                                    return (
                                        <span key={s.id} className={s.isActive ? 'active' : ''}
                                            onClick={() => {this.getDatas(s)}}>{s.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </h4>
                <MyContributionList />
            </div>
        )
    }
}
