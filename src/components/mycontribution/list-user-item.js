import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Tag, Layout, Pagination } from 'element-react-codish';
import * as constants from '../../utils/constants';

@inject(stores => {
    let { getUserItems, userItemsObj } = stores.item;
    let { userInfo, getUserInfo } = stores.user;
    return {
        getUserItems,
        userItemsObj,
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
        const params = {
            start: currentPage,
            limit: 10,
            userId: this.props.userInfo.data.userId
        };
        this.props.getUserItems(params);
    };
    goEdit = (item, e) => {
        e.preventDefault();
    };
    render() {
        let { userItemsObj } = this.props;
        if (!userItemsObj) {
            return <div className="search-tips">暂无知识条目</div>;
        }
        return (
            <div className="mod-listitem">
                {
                    userItemsObj && userItemsObj.data.items.map(item => {
                        return (
                            <div className="list-item" key={item.id}>
                                <div className="title">
                                    <h5>{item.name}</h5>
                                    <NavLink to={`/edit-item/${item.libraryId}/${item.id}`} className="el-icon-edit" />
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
                                    <p className="p-tips">
                                        {constants.getDateStr(item.createTime, 4)}
                                    </p>
                                </div>
                                <div className="content">{item.desc}</div>
                                <div className="info">
                                    <Layout.Row gutter="20">
                                        <Layout.Col span="5">贡献者：{item.creatorName}</Layout.Col>
                                        {/* <Layout.Col span="5"><i className="icon-look"></i> 12121</Layout.Col>
                                                <Layout.Col span="5"><i className="icon-like icon-look"></i> 12121</Layout.Col>
                                                <Layout.Col span="5"><i className="icon-down icon-look"></i> 12121</Layout.Col>
                                                <Layout.Col span="4"><i className="icon-star icon-look"></i> 评分 <span className="score">4.6</span></Layout.Col> */}
                                    </Layout.Row>
                                </div>
                                <NavLink className="item-link" to={`/item-detail/${item.id}`} key={item.id} />
                            </div>
                        );
                    })
                }
                {
                    userItemsObj && userItemsObj.count > 10 && (
                        <Pagination
                            className="pagination"
                            currentPage={1}
                            layout="prev, pager, next"
                            onCurrentChange={this.getDatas}
                            total={userItemsObj.count}
                        />
                    )
                }
            </div>
        );
    }
}

export default withRouter(ListItem);
