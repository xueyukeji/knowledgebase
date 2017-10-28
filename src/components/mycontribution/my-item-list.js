import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Tag, Layout, Pagination } from 'element-react-codish';
import { Popover, Button } from 'antd';
import * as constants from '../../utils/constants';

class ListItem extends Component {
    getDatas = currentPage => {
        this.props.onPageChange(currentPage, true)
    };
    render() {
        let { items, currentPage, inMyContri } = this.props;
        if (items.items.length === 0) {
            return <div className="search-tips">暂无知识条目</div>;
        }
        return (
            <div className="mod-listitem">
                {
                    items && items.items.map(item => {
                        return (
                            <NavLink className="item-link" to={`/item-detail/${item.id}`} key={item.id}>
                                <div className="list-item" key={item.id}>
                                    <div className="title">
                                        <h5>{item.name}</h5>
                                        <div className="item-status pass">
                                            <span>{constants.getStatusStr(item.status)}</span>
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
                                            {
                                                // 我的贡献中：待审核和未通过才可以编辑
                                                inMyContri && (item.status === 0 || item.status === 3) ? <NavLink to={`/edit-item/${item.libraryId}/${item.id}`}>
                                                    <Button type="primary">编辑</Button>
                                                </NavLink> : ''
                                            }
                                            {
                                                // 我的贡献中：未通过可以查看原因
                                                inMyContri && item.status === 3 ? <Popover placement="topLeft" content={item.auditDesc} trigger="click">
                                                    <Button>查看原因</Button>
                                                </Popover> : ''
                                            }
                                            {
                                                // 我的审批中：待审核可以审核
                                                !inMyContri && item.status === 0 ? <NavLink to={`/my-check/detail/${item.id}`}>
                                                    <Button type="text">审核</Button>
                                                </NavLink> : ''
                                            }
                                        </div>

                                        {/* <p className="p-tips">
                                            {constants.getDateStr(item.createTime, 4)}
                                        </p> */}
                                    </div>
                                    <div className="content">{item.desc}</div>
                                    <div className="info">
                                        <Layout.Row gutter="20">
                                            <Layout.Col span="6">贡献者：{item.creatorName}</Layout.Col>
                                            <Layout.Col span="6 tc"><i className="icon look"></i> {item.viewNum || 0}</Layout.Col>
                                            <Layout.Col span="6 tc"><i className="icon download"></i> {item.downNum || 0}</Layout.Col>
                                            <Layout.Col span="6">
                                                <div className="tr">
                                                    <i className="icon-star icon-look"></i> 评分 <span className="score">{item.rate || 0}</span>
                                                </div>
                                            </Layout.Col>
                                        </Layout.Row>
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })
                }
                {
                    items && items.count > 10 && (
                        <Pagination
                            className="pagination"
                            currentPage={currentPage}
                            layout="prev, pager, next"
                            onCurrentChange={this.getDatas}
                            total={items.count}
                        />
                    )
                }
            </div>
        );
    }
}

export default withRouter(ListItem);
