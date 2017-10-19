import React, { Component } from 'react';
import { withRouter, NavLink} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Tag, Layout, Pagination } from 'element-react-codish';
import * as constants from '../../utils/constants';

@inject(stores => {
    let {
        getItemList,
        itemListObj,
        searchInput,
        searchTagIds,
        setSearchTagIds,
        setSearchInput
    } = stores.item;
    let { getTags } = stores.tag;
    return {
        getItemList,
        itemListObj,
        searchInput,
        searchTagIds,
        setSearchTagIds,
        setSearchInput,
        getTags,
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
        this.getDatas(0);
    }

    componentWillReceiveProps(nextProps) {
        const {match, itemListObj, getTags, setSearchTagIds, setSearchInput } = this.props
        if (match.params.id !== nextProps.match.params.id) {
            if (itemListObj) {
                itemListObj.items.length = 0;
            }
            getTags({
                libraryId: nextProps.match.params.id
            });
            var tagIds = [];
            setSearchTagIds(tagIds);
            setSearchInput('');
            this.getDatas(0, nextProps);
        }
    }
    getDatas = (currentPage, nextProps) => {
        if (currentPage > 0) {
            currentPage  = currentPage - 1
        }
        const {match, searchTagIds, searchInput, getItemList} = this.props
        const params = {
            libraryId: nextProps
                ? parseInt(nextProps.match.params.id)
                : parseInt(match.params.id),
            start: currentPage,
            limit: 10,
            tagIds: searchTagIds,
            name: searchInput
        };
        getItemList(params);
    }
    render() {
        let { itemListObj } = this.props;
        if (itemListObj.items.length === 0) {
            return <div className="search-tips">暂无知识条目</div>;
        }
        return (
            <div className="mod-listitem">
                {itemListObj.items.map(item => {
                    return (
                        <NavLink to={`/item-detail/${item.id}`} key={item.id}>
                            <div className="list-item" >
                                <div className="title">
                                    <h5>{item.name}</h5>
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
                            </div>
                        </NavLink>
                    );
                })}
                {itemListObj &&
          itemListObj.count > 10 && (
                        <Pagination
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
