import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Redirect} from 'react-router-dom';
import {Button} from 'element-react-codish';

@inject(stores => {
    let {
        userInfo
    } = stores.user
    let {
        itemDetails,
        getItemDetail,
    } = stores.item;
    return {
        itemDetails,
        getItemDetail,
        userInfo
    }
})
@observer
export default class ItemDetail extends Component {a
    componentWillMount() {
        this.handleRefresh();
    }

    handleRefresh = () => {
        let id = this.props.match.params.id;
        if (id) {
            this.props.getItemDetail(id);
        }
    }

    render() {
        let id = this.props.match.params.id;
        if (!id) {
            return <Redirect to="/knowledge" />;
        }
        let {itemDetails} = this.props;
        if (!itemDetails) {
            return (
                <div className="mod-itemdetail">
                    <p className="empty-tips">获取知识条目详情失败，请<span onClick={this.handleRefresh}>重试</span></p>
                </div>
            );
        }
        return (
            <div className="mod-itemdetail">
                <div className="item">
                    <div className="title">
                        标题:
                    </div>
                    <div className="content">
                        {itemDetails.name}
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        知识库:
                    </div>
                    <div className="content">
                        {itemDetails.libraryId}
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        描述:
                    </div>
                    <div className="content">
                        {itemDetails.desc}
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        作者:
                    </div>
                    <div className="content">
                        {itemDetails.creatorName}
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        标签:
                    </div>
                    <div className="content">
                        {
                            itemDetails.tagArr.map(item => {
                                return (
                                    <span className="tag-item" key={item.id}>{item.tag}</span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="item">
                    <div className="title">
                        附件:
                    </div>
                    <div className="content">
                        {
                            itemDetails.fileIds && itemDetails.fileIds.split(',').map(item => {
                                return (
                                    <div className="file-item" key={item}>
                                        {item}
                                        <Button
                                            className="preview"
                                            type="primary">预览</Button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="back">
                    <Button type="">返回</Button>
                </div>
            </div>
        )
    }
}
