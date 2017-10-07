import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Tag, Layout, Pagination } from 'element-react'
@inject(stores => {
    let {
        getItemList,
        itemList
    } = stores.item;
    return {
        getItemList,
        itemList
    }
})
@observer
export default class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {
                start: 1,
                limit: 10
            }
        }
    }
    componentWillMount() {
        this.props.getItemList(this.state.params)
    }
    render() {
        let { itemList } = this.props;
        return (<div className="mod-listitem">
            {
                itemList.map(item => {
                    return (
                        <div className="list-item" key={item.id}>
                            <div className="title">
                                <h5>{item.name}</h5>
                            </div>
                            <div className="tag-items">
                                <div className="tags">
                                    <Tag type="success">标签四</Tag>
                                    <Tag type="success">标签四</Tag>
                                    <Tag type="success">标签四</Tag>
                                </div>
                                <p className="p-tips">{item.createTime}</p>
                            </div>
                            <div className="content">{item.desc}</div>
                            <div className="info">
                                <Layout.Row gutter="20">
                                    <Layout.Col span="5">贡献者：{item.creatorName}</Layout.Col>
                                    <Layout.Col span="5"><i className="icon-look"></i> 12121</Layout.Col>
                                    <Layout.Col span="5"><i className="icon-like icon-look"></i> 12121</Layout.Col>
                                    <Layout.Col span="5"><i className="icon-down icon-look"></i> 12121</Layout.Col>
                                    {/* <Layout.Col span="4"><i className="icon-star icon-look"></i> 评分 <span className="score">4.6</span></Layout.Col> */}
                                </Layout.Row>
                            </div>
                        </div>
                    )
                })
            }
            <Pagination
                className="pagination"
                layout="prev, pager, next"
                total={1} />
        </div>
        )
    }
}
