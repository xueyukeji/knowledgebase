import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import MyItemList from './my-item-list'

@inject(stores => {
    let {
        knowledgeObj
    } = stores.manage;
    let {getUserItems, myConItemObj} = stores.item;
    let {userInfo} = stores.user;
    return {
        knowledgeObj,
        getUserItems,
        myConItemObj,
        userInfo
    };
})
@observer
export default class Knowledge extends Component {
    // 知识条目状态, 0: 待审批, 1: 审批通过, 3: 被拒绝, -1: 全部
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            status: [
                {id: -1, name: '全部', isActive: true},
                {id: 0, name: '待审核', isActive: false},
                {id: 3, name: '未通过', isActive: false},
                {id: 1, name: '已通过', isActive: false},
            ]
        }
    }

    switchState(s) {

        const {status} = this.state

        if (s.id === status.find(item => item.isActive).id) {
            return
        }
        status.forEach((d) => {
            d.isActive = false
            if (d.id === s.id) {
                d.isActive = true
            }
        })
        this.setState({
            status
        })

        this.onPageChange(1, undefined, this.props.knowledgeObj)
    }

    getMyItemData = (params, libs) => {
        this.props.getUserItems(params, libs);
    }

    onPageChange = (currentPage, pageChanged, libs) => {
        this.setState({
            currentPage: currentPage
        })
        if (pageChanged) {
            this.setState({
                currentPage
            })
        }
        let {status} = this.state
        if (currentPage > 0) {
            currentPage = currentPage - 1
        }
        const params = {
            start: currentPage,
            limit: 12,
            userId: this.props.userInfo.data.userId,
            status: status.find(item => item.isActive).id
        };

        this.getMyItemData(params, libs || this.props.knowledgeObj)
    }

    componentWillMount() {

        if (this.props.knowledgeObj) {

            this.onPageChange(1, undefined, this.props.knowledgeObj)
        }
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.knowledgeObj != nextProps.knowledgeObj) {

            this.onPageChange(1, undefined, nextProps.knowledgeObj)

        }

    }

    render() {
        const {myConItemObj} = this.props
        return (
            <div className="mod-homepage">
                <h4>知识条目{myConItemObj.count ? `(${myConItemObj.count})` : ''}
                    <div className="check-top">
                        <div className="check-filter">
                            {
                                this.state.status.map((s) => {
                                    return (
                                        <span key={s.id} className={s.isActive ? 'active' : ''}
                                              onClick={() => {
                                                  this.switchState(s)
                                              }}>{s.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </h4>
                <MyItemList items={myConItemObj} inMyContri={true} onPageChange={this.onPageChange}
                            currentPage={this.state.currentPage}/>
            </div>
        )
    }
}
