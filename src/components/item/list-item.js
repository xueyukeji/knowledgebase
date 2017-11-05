import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {Tag, Layout, Pagination} from 'element-react-codish';
import * as constants from '../../utils/constants';
import FileIcon from '../../utils/FileIcon'
import {Icon} from 'antd'

@inject(stores => {
    let {
        itemListObj,
        searchInput,
        searchTagIds,
        setSearchTagIds,
        updateItemNum
    } = stores.item;
    let {getTags} = stores.tag;
    return {
        itemListObj,
        searchInput,
        searchTagIds,
        setSearchTagIds,
        getTags,
        updateItemNum
    };
})
@observer
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        // 返回所有标签只传libraryId即可
        this.props.getTags({
            libraryId: this.props.match.params.id
        });
        // itemlist
        this.getDatas(0);
    }

    getDatas = (currentPage, nextProps) => {
        if (currentPage > 0) {
            currentPage = currentPage - 1
        }
        const {match, searchTagIds, searchInput} = this.props
        const params = {
            libraryId: nextProps
                ? parseInt(nextProps.match.params.id)
                : parseInt(match.params.id),
            start: currentPage,
            limit: 10,
            tagIds: searchTagIds,
            name: searchInput
        };
        this.props.getItemData(params)
    }

    viewNum(item) {
        let params = {
            id: item.id,
            field: 'viewNum'
        }
        this.props.updateItemNum(params)
    }

    render() {
        let {itemListObj} = this.props;
        if (itemListObj.items.length === 0) {
            return <div className="empty-tips">暂无知识条目</div>;
        }
        return (
            <div className="mod-listitem">
                {itemListObj.items.map(item => {
                    return (
                        <NavLink className='kn-item' to={`/item-detail/${item.libraryId}/${item.id}`} key={item.id}>
                            <div className="list-item" onClick={() => {
                                this.viewNum(item)
                            }}>
                                <div className="title">
                                    <h3><Icon type="copy"/> {item.name}</h3>
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
                                </div>
                                <hr className='item-hr'/>
                                <div className="files">
                                    {item.fileInfos.map(file => {
                                        return (
                                            <div key={file.fileId}>
                                                <FileIcon file={file}/> <span title={file.fileName}>{file.fileName} </span>
                                            </div>)
                                    })}
                                </div>
                                <div className="content">备注：{item.desc}</div>
                            </div>
                        </NavLink>
                    );
                })}
                {itemListObj && itemListObj.count > 10 && (<Pagination
                        className="pagination"
                        currentPage={0}
                        layout="prev, pager, next"
                        onCurrentChange={this.getDatas}
                        total={itemListObj.count}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(ListItem);
