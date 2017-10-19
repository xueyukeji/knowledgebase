import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Redirect, NavLink} from 'react-router-dom';
import {Button, Breadcrumb, Tag} from 'element-react-codish';
import LightBox from 'react-images';

@inject(stores => {
    let { viewFile } = stores.user
    let {
        itemDetails,
        getItemDetail,
    } = stores.item;
    return {
        itemDetails,
        getItemDetail,
        viewFile
    }
})
@observer
export default class ItemDetail extends Component {
    state = {
        lightboxIsOpen: false,
        image: ''
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

    handlePreviewClick = (item) => {
        if (!item) return;
        //"jpg", "jpeg", "png", "gif", "ico", "bpm", "psd", "pic", "svg", "eps", "cdr", "ai", "ps", "wmf"
        if (/(\.jpg|\.jpeg|\.png|\.gif|\.ico|\.bpm|\.psd|\.pic|\.svg|\.eps|\.cdr|\.ai|\.ps|\.wmf)$/.test(item.filename)) {
            this.props.viewFile(item).then(data => {
                if (data.data) {
                    this.setState({
                        image: data.data.thumb,
                        lightboxIsOpen: true
                    });
                }
            });
        } else {
            let newWindow = window.open('about:blank');
            newWindow.location = `/views.html?fc=personal&fi=${item.fileid}`;
        }
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
        let {itemDetails} = this.props;
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
                            {itemDetails.libraryName}
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
                        {itemDetails.libraryName}
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
                            itemDetails.fileInfos.length ? itemDetails.fileInfos.map(item => {
                                return (
                                    <div className="file-item" key={item.fileid}>
                                        {item.filename}
                                        <Button
                                            className="preview"
                                            type="primary"
                                            onClick={() => {this.handlePreviewClick(item)}}>预览</Button>
                                    </div>
                                )
                            }) : <div>暂无附件</div>
                        }
                    </div>
                </div>
                <LightBox
                    images={[{src: this.state.image}]}
                    isOpen={this.state.lightboxIsOpen}
                    onClose={this.closeLightbox} />
            </div>
        )
    }
}
