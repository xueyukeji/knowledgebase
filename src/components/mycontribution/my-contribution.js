import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import MyContributionList from './my-contribution-list'

@inject(stores => {
    stores
})
@observer
export default class Knowledge extends Component {
    render() {
        return (
            <div className="mod-homepage">
                <h4>知识条目
                    <div className="check-top">
                        <div className="check-filter">
                            <span className="active">全部</span>
                            <span>待审核</span>
                            <span>未通过</span>
                            <span>已通过</span>
                        </div>
                    </div>
                </h4>
                <MyContributionList />
            </div>
        )
    }
}
