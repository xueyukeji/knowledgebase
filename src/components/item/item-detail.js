import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Redirect, NavLink} from 'react-router-dom';
import {Button, Breadcrumb, Tag} from 'element-react-codish';
import LightBox from 'react-images';

@inject(stores => {
    let {
        itemDetails,
        getItemDetail,
    } = stores.item;
    return {
        itemDetails,
        getItemDetail,
    }
})
@observer
export default class ItemDetail extends Component {
    state = {
        lightboxIsOpen: false
    }

    componentWillMount() {
        this.handleRefresh();
    }

    handleRefresh = () => {
        let id = this.props.match.params.id;
        if (id) {
            this.props.getItemDetail(id)
        }
    }

    handlePreviewClick = () => {
        this.setState({
            lightboxIsOpen: true
        });
    }

    closeLightbox = () => {
        this.setState({
            lightboxIsOpen: false
        });
    }

    render() {
        let id = this.props.match.params.id;
        if (!id) {
            return <Redirect to="/knowledge" />;
        }
        let {itemDetails, knowledgeInfo} = this.props;
        if (!itemDetails) {
            return (
                <div className="mod-itemdetail">
                    <p className="empty-tips">获取知识条目详情失败，请<span className="refresh" onClick={this.handleRefresh}>重试</span></p>
                </div>
            );
        }
        return (
            <div className="mod-itemdetail">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <NavLink
                            to={`/knowledge/${itemDetails.libraryId}`}
                            activeClassName="active">
                            {
                                knowledgeInfo && knowledgeInfo.name || '知识库'
                            }
                        </NavLink>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>知识条目详情</Breadcrumb.Item>
                </Breadcrumb>
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
                                    <Tag type="success" key={item.id}>{item.tag}</Tag>
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
                            itemDetails.fileIds ? itemDetails.fileIds.split(',').map(item => {
                                return (
                                    <div className="file-item" key={item}>
                                        {item}
                                        <Button
                                            className="preview"
                                            type="primary"
                                            onClick={this.handlePreviewClick}>预览</Button>
                                    </div>
                                )
                            }) : <div>暂无附件</div>
                        }
                    </div>
                </div>
                <LightBox
                    images={[{ src: 'https://images.unsplash.com/photo-1454991727061-be514eae86f7?dpr=2&auto=format&crop=faces&fit=crop&w=300&h=300' }]}
                    isOpen={this.state.lightboxIsOpen}
                    onClose={this.closeLightbox} />
            </div>
        )
    }
}
