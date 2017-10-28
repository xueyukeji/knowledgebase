import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Tag, Layout, Pagination } from 'element-react-codish';
import { Button } from 'antd';

// import * as constants from '../../utils/constants';

@inject(stores => {
    let { getUserItems, myConItemObj } = stores.item;
    let { userInfo, getUserInfo } = stores.user;
    return {
        getUserItems,
        myConItemObj,
        userInfo,
        getUserInfo
    };
})
@observer
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        this.props.getUserInfo().then(() => {
            this.getDatas(0);
        });
    }
    getDatas = currentPage => {
        if (currentPage > 0) {
            currentPage  = currentPage - 1
        }
        const params = {
            start: currentPage,
            limit: 10,
            userId: this.props.userInfo.data.userId,
            status: -1
        };
        this.props.getUserItems(params);
    };
    goEdit = (item, e) => {
        e.preventDefault();
    };
    render() {
        let { myConItemObj } = this.props;
        if (myConItemObj.items.length === 0) {
            return <div className="search-tips">暂无知识条目</div>;
        }
        return (
            <div className="mod-listitem">
                {
                    myConItemObj && myConItemObj.items.map(item => {
                        return (
                            <div className="list-item" key={item.id}>
                                <div className="title">
                                    <h5>{item.name}</h5>
                                    <div className="item-status pass">
                                        <span>未通过</span>
                                    </div>
                                </div>
                                <div className="tag-items">
                                    <div className="tags">
                                        {item.tagArr.map(t => {
                                            return (
                                                <Tag key={t.id} type="success">
                                                    {t.tag ? t.tag : null}
                                                </Tag>
                                            );
                                        })}
                                    </div>
                                    <div className="op-btns fr">
                                        <NavLink to={`/my-check/detail/${item.id}`}>
                                            <Button type="text">审核</Button>
                                        </NavLink>
                                    </div>
                                    {/* <p className="p-tips">
                                        {constants.getDateStr(item.createTime, 4)}
                                    </p> */}
                                </div>
                                <div className="content">{item.desc}</div>
                                <div className="info">
                                    <Layout.Row gutter="20">
                                        <Layout.Col span="5">贡献者：{item.creatorName}</Layout.Col>
                                        <Layout.Col span="5"><i className="icon-look"></i> 12121</Layout.Col>
                                        <Layout.Col span="5"><i className="icon-like icon-look"></i> 12121</Layout.Col>
                                        <Layout.Col span="5"><i className="icon-down icon-look"></i> 12121</Layout.Col>
                                        <Layout.Col span="4">

                                        </Layout.Col>
                                    </Layout.Row>
                                </div>
                                {/* <NavLink className="item-link" to={`/item-detail/${item.id}`} key={item.id} /> */}
                            </div>
                        );
                    })
                }
                {
                    myConItemObj && myConItemObj.count > 10 && (
                        <Pagination
                            className="pagination"
                            currentPage={1}
                            layout="prev, pager, next"
                            onCurrentChange={this.getDatas}
                            total={myConItemObj.count}
                        />
                    )
                }
            </div>
        );
    }
}

export default withRouter(ListItem);
