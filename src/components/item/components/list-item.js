import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Tag, Layout, Pagination } from 'element-react-codish'
import * as constants from '../../../utils/constants'
@inject(stores => {
    let {
        getItemList,
        itemListobj,
        tagIds,
        setTagIds,
        setSearchInput
    } = stores.item;
    let {
        getTags
    } = stores.tag
    return {
        getItemList,
        itemListobj,
        tagIds,
        setTagIds,
        setSearchInput,
        getTags
    }
})
@observer
class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
        this.props.getTags(this.props.match.params.id)
        this.getDatas(1)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            if (this.props.itemListobj) {
                this.props.itemListobj.data.items.length = 0
            }
            this.props.getTags(nextProps.match.params.id)
            var tagIds = []
            this.props.setTagIds(tagIds)
            this.props.setSearchInput('')
            this.getDatas(1, nextProps)
        }
    }
    getDatas = (currentPage, nextProps) => {
        const params = {
            libraryId: nextProps ? parseInt(nextProps.match.params.id) : parseInt(this.props.match.params.id),
            start: currentPage,
            limit: 10,
            tagIds: this.props.tagIds,
            tag: ''
        }
        this.props.getItemList(params)
    }
    render() {
        let { itemListobj } = this.props;
        if (!itemListobj) {
            return <div className="search-tips">暂无内容</div>
        }
        return (<div className="mod-listitem">
            {
                itemListobj && itemListobj.data.items.map(item => {
                    return (
                        <NavLink to={`/item-detail/${this.props.match.params.id}`}>
                            <div className="list-item" key={item.id}>
                                <div className="title">
                                    <h5>{item.name}</h5>
                                </div>
                                <div className="tag-items">
                                    <div className="tags">
                                        {
                                            item.tagArr.map(t => {
                                                return <Tag key={t.id} type="success">{t.tag ? t.tag : null}</Tag>
                                            })
                                        }
                                    </div>
                                    <p className="p-tips">{constants.getDateStr(item.createTime, 4)}</p>
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
                    )
                })
            }
            {
                itemListobj && itemListobj.count > 10 &&
                <Pagination
                    className="pagination"
                    currentPage={1}
                    layout="prev, pager, next"
                    onCurrentChange={this.getDatas}
                    total={itemListobj.count} />
            }
        </div>
        )
    }
}

export default withRouter(ListItem)
