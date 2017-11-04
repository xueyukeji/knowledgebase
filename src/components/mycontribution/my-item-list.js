import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, NavLink } from 'react-router-dom';
import { Tag, Layout, Pagination } from 'element-react-codish';
import { Popover, Button } from 'antd';
import * as constants from '../../utils/constants';

@inject(stores => {
    let {
        updateItemNum
    } = stores.item;
    return {
        updateItemNum
    };
})
@observer
class ListItem extends Component {
    getDatas = currentPage => {
        this.props.onPageChange(currentPage, true)
    };
    goEdit = (item, e) => {
        e.preventDefault();
    };
    renderStatus = (item) => {
        let statusClass = 'item-status'
        if (item.status === 0) {
            statusClass += ' ready'
        } else if (item.status === 1) {
            statusClass += ' pass'
        } else {
            statusClass += ' reject'
        }
        return (<div className={statusClass}>
            {constants.getStatusStr(item.status)}
        </div>)
    }
    viewNum(item) {
        let params = {
            id: item.id,
            field: 'viewNum'
        }
        this.props.updateItemNum(params)
    }
    render() {
        let { items, currentPage, inMyContri, showDialog } = this.props;
        if (items.items.length === 0) {
            return <div className="empty-tips">暂无知识条目</div>;
        }
        return (
            <div className="mod-listitem">
                {
                    items && items.items.map(item => {
                        return (
                            <NavLink className="item-link" to={`/item-detail/${item.id}`} key={item.id}>
                                <div className="list-item" key={item.id} onClick={() => {this.viewNum(item)}}>
                                    <div className="title">
                                        <h5>{item.name}</h5>
                                        {this.renderStatus(item)}
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
                                                inMyContri && item.status === 3 ? <Popover placement="bottom" content={item.auditDesc} trigger="click">
                                                    <Button>查看原因</Button>
                                                </Popover> : ''
                                            }
                                            {
                                                // // 我的审批中：待审核可以审核
                                                // !inMyContri && item.status === 0 ? <NavLink to={`/my-check/detail/${item.id}`}>
                                                //     <Button type="text" onClick={showDialog(item.id)}>审核</Button>
                                                // </NavLink> : ''
                                                !inMyContri && item.status === 0 ?
                                                    <Button type="text" onClick={() => {showDialog(item.id, event)}}>审核</Button> : ''
                                            }
                                        </div>

                                        {/* <p className="p-tips">
                                                {constants.getDateStr(item.createTime, 4)}
                                            </p> */}
                                    </div>
                                    <div className="content">{item.desc}</div>
                                    <div className="info">
                                        <Layout.Row gutter="20">
                                            <Layout.Col span="6"> <i className="icon user"></i> {item.creatorName}</Layout.Col>
                                            <Layout.Col span="6 tc"><i className="icon look"></i>{item.viewNum || 0}</Layout.Col>
                                            <Layout.Col span="6 tc"><i className="icon download"></i>{item.downNum || 0}</Layout.Col>
                                            <Layout.Col span="6">
                                                {
                                                    item.rate ?
                                                        <div className="tr">
                                                            <i className="icon rate"></i><span className="score">{item.rate || 0}</span>
                                                        </div> : null
                                                }
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
