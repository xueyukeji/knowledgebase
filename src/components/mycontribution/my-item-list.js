import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter, NavLink} from 'react-router-dom';
import {Tag, Layout, Pagination} from 'element-react-codish';
import {Popover, Button,Popconfirm} from 'antd';
import * as constants from '../../utils/constants';
import {Icon} from 'antd'
import FileIcon from '../../utils/FileIcon'
import ItemDetail from '../item/item-detail'

@inject(stores => {
    let {
        getItemDetail,
        updateItemNum,
        removeItem
    } = stores.item;
    return {
        getItemDetail,
        updateItemNum,
        removeItem
    };
})
@observer
class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

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
        return (<span className={statusClass}>
            {constants.getStatusStr(item.status)}
        </span>)
    }

    viewNum(item) {
        // let params = {
        //     id: item.id,
        //     field: 'viewNum'
        // }
        // this.props.updateItemNum(params)
        this.props.getItemDetail(item.id)
    }

    showDetailDialog = (item) => {
        this.setState({
            dialogVisible: true
        }, () => {
            this.viewNum(item);
        });
    }

    delItem (id){
        this.props.removeItem(id);
    }

    hideDetailDialog = () => {
        this.setState({
            dialogVisible: false
        });
        //this.clearUserFile();
    }

    render() {
        let {items, currentPage, inMyContri, showDialog} = this.props;
        let {dialogVisible} = this.state;

        if (items.items.length === 0) {
            return <div className="empty-tips">暂无知识条目</div>;
        }
        return (
            <div className="mod-listitem">
                {
                    items && items.items.map(item => {
                        return (
                            <div className='kn-item'  key={item.id}>
                                <div className="list-item" >
                                    <div className="title">
                                        <h3> {this.renderStatus(item)} {item.name}  </h3>
                                        <div className="info">
                                            <Layout.Row gutter="10">
                                                <Layout.Col span="7"> <Icon type="user"/> {item.creatorName}
                                                </Layout.Col>
                                                <Layout.Col span="5 tc">   {constants.getDateStr(item.createTime, 1)}
                                                </Layout.Col>
                                                <Layout.Col span="4 tc"><Icon type="eye"/>{item.viewNum || 0}
                                                </Layout.Col>
                                                <Layout.Col span="4 tc"><Icon type="download"/> {item.downNum || 0}
                                                </Layout.Col>
                                                <Layout.Col span="4">
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
                                                inMyContri && (item.status === 0 || item.status === 3 ||item.auditType === 0) ?
                                                    <NavLink to={`/edit-item/${item.libraryId}/${item.id}`}>
                                                        <Button type="primary">编辑</Button>
                                                    </NavLink> : ''
                                            }
                                            {
                                                // 我的贡献中：未通过可以查看原因
                                                inMyContri && item.status === 3 ?
                                                    <Popover placement="bottom" content={item.auditDesc}trigger="click">
                                                        <Button>查看原因</Button>
                                                    </Popover> : ''
                                            }
                                            {
                                                // 未通过的，与免审的，可以删除
                                                inMyContri && (item.status === 3 ||item.auditType === 0 || item.status === 0)?
                                                    <Popconfirm title="你确认要删除这个知识？" onConfirm={() =>{
                                                        this.delItem(item.id);
                                                    }}   okText="是的" cancelText="不删">
                                                        <a >删除 </a>
                                                    </Popconfirm> : ''
                                            }
                                            {
                                                // // 我的审批中：待审核可以审核
                                                // !inMyContri && item.status === 0 ? <NavLink to={`/my-check/detail/${item.id}`}>
                                                //     <Button type="text" onClick={showDialog(item.id)}>审核</Button>
                                                // </NavLink> : ''
                                                !inMyContri && item.status === 0 ?
                                                    <Button type="primary" onClick={() => {
                                                        showDialog(item.id, event)
                                                    }}>审核</Button> : ''
                                            }
                                        </div>

                                    </div>
                                    <hr className='item-hr'/>
                                    <div className="files">
                                        {item.fileInfos.map(file => {
                                            return (
                                                <div className="item-file" key={file.fileId}>
                                                    <FileIcon file={file}/> <span title={file.fileName}>{file.fileName} </span>
                                                </div>)
                                        })}
                                    </div>
                                    <div className="content">
                                        <div className='more' onClick={() => this.showDetailDialog(item)}>查看详情>></div>
                                        {item.desc}
                                    </div>

                                </div>
                            </div>
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
                {
                    dialogVisible ?
                        <ItemDetail
                            dialogVisible={true} closeSelecFileDialog={this.hideDetailDialog}/> : null
                }
            </div>

        );
    }
}

export default withRouter(ListItem);
