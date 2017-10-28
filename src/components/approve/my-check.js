import React, {Component} from 'react';
import { inject, observer } from 'mobx-react'
import MyItemList from '../mycontribution/my-item-list'
@inject(stores => {
    let { getAuditItem, myAuditItem } = stores.item;
    let { userInfo } = stores.user;
    return {
        getAuditItem,
        myAuditItem,
        userInfo
    };
})
@observer
export default class MyCheck extends Component {
    // 知识条目状态, 0: 待审批, 1: 审批通过, 3: 被拒绝, -1: 全部
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            status: [
                {id: 0, name: '待审核', isActive: true},
                {id: 3, name: '未通过', isActive: false},
                {id: 1, name: '已通过', isActive: false},
            ]
        }
    }
    switchState = (s) => {
        const {status, currentPage} = this.state
        status.forEach((d) => {
            d.isActive = false
            if (d.id === s.id) {
                d.isActive = true
            }
        })
        this.setState({
            status
        })
        this.onPageChange(currentPage)
    }
    getMyItemData = (params) => {
        this.props.getAuditItem(params);
    }
    onPageChange = (currentPage, pageChanged) => {
        if (pageChanged) {
            this.setState({
                currentPage
            })
        }
        let {status} = this.state
        if (currentPage > 0) {
            currentPage  = currentPage - 1
        }
        const params = {
            start: currentPage,
            limit: 10,
            userId: this.props.userInfo.data.userId,
            status: status.find(item => item.isActive).id
        };
        this.getMyItemData(params)
    }
    componentWillMount() {
        this.onPageChange(1)
    }
    render() {
        const { myAuditItem } = this.props
        let { status, currentPage } = this.state
        return (
            <div className="mod-homepage">
                <h4>知识条目{myAuditItem.count ? `(${myAuditItem.count})` : ''}
                    <div className="check-top">
                        {/* <div className="total-num">
                            {myAuditItem.count ? ('您有' + myAuditItem.count + '条知识' + status.find(item => item.isActive).name) : ''}
                        </div> */}
                        <div className="check-filter">
                            {
                                status.map((s) => {
                                    return (
                                        <span key={s.id} className={s.isActive ? 'active' : ''}
                                            onClick={() => {this.switchState(s)}}>{s.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </h4>
                <MyItemList items={myAuditItem} inMyContri={false} onPageChange={this.onPageChange} currentPage={currentPage}/>
            </div>
        )
    }
}
