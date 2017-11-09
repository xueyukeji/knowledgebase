import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Button, Dialog, Tag, Message} from 'element-react-codish';
import * as constants from '../../utils/constants';
import LightBox from 'react-images';
import Cookies from 'js-cookie';
import AES from 'crypto-js/aes'
import {Icon} from 'antd'
import FileIcon from '../../utils/FileIcon'

@inject(stores => {
    let {viewFile} = stores.user
    let {
        itemDetails,
        getItemDetail,
        updateItemNum,
        downFile
    } = stores.item;
    return {
        itemDetails,
        getItemDetail,
        viewFile,
        updateItemNum,
        downFile
    }
})
@observer
export default class ItemDetail extends Component {
    state = {
        lightboxIsOpen: false,
        image: ''
    }

    componentWillMount() {
        //this.handleRefresh();
    }

    handleRefresh = () => {
        let {itemDetails} = this.props;
        if (itemDetails.id) {
            this.props.getItemDetail(itemDetails.id)
        }
    }

    handlePreviewClick = (item) => {
        if (!item) return;
        //"jpg", "jpeg", "png", "gif", "ico", "bpm", "psd", "pic", "svg", "eps", "cdr", "ai", "ps", "wmf"
        if (/(\.jpg|\.jpeg|\.png|\.gif|\.ico|\.bpm|\.psd|\.pic|\.svg|\.eps|\.cdr|\.ai|\.ps|\.wmf)$/.test(item.fileName)) {
            this.props.viewFile(item).then(data => {
                if (data.data) {
                    this.setState({
                        image: data.data.view ? data.data.view : data.data.file,
                        lightboxIsOpen: true
                    });
                } else {
                    Message('文件已删除，无法预览！')
                }
            });
        } else {
            this.props.viewFile(item).then(res => {
                if (res.status !== 'ok') {
                    console.error('文件预览出错');
                    return
                }
                res = res.data
                var view = null;
                if (res.file) {
                    view = res.file;
                } else {
                    view = res.view ? res.view : res.fileUri;
                }
                var encrypt = function (str) {
                    return AES.encrypt(str, 'yliyun123').toString();
                };
                var en = encrypt(view);
                Cookies.set('url', en);
                Cookies.set('doc-viewer-Title', item.fileName);
            });

            let newWindow = window.open('about:blank');
            newWindow.location = `/views.html?fc=personal&fi=${item.fileId}`;
        }
    }

    downloadFile = (item) => {
        const {itemDetails, updateItemNum, downFile} = this.props
        downFile(item.fileId).then((res) => {
            if (res.status === 'ok') {
                var params = {
                    id: itemDetails.id,
                    field: 'downNum'
                }
                updateItemNum(params)
                window.location = res.data.fileUri + '&fn=' + encodeURIComponent(item.fileName);
            } else {
                Message('文件已删除，无法下载！')
            }
        })
    }


    bdl = () => {
        const {itemDetails, updateItemNum, downFile} = this.props

        let fis = itemDetails.fileInfos.map(item => {
            return item.fileId
        });

        downFile(fis).then((res) => {
            if (res.status === 'ok') {
                var params = {
                    id: itemDetails.id,
                    field: 'downNum'
                }
                updateItemNum(params)
                window.location = res.data.fileUri;
            } else {
                Message('文件已删除，无法下载！')
            }
        })
    }

    closeLightbox = () => {
        this.setState({
            lightboxIsOpen: false
        });
    }

    render() {
        // let id = this.props.match.params.id;
        // if (!id) {
        //     return <Redirect to="/knowledge" />;
        // }
        let {itemDetails} = this.props;
        if (!itemDetails) {
            return (
                <div className="mod-itemdetail">
                    <p className="empty-tips">获取知识条目详情失败，请<span className="refresh"
                                                                onClick={this.handleRefresh}>重试</span></p>
                </div>
            );
        }
        return (
            <Dialog
                className="item-detail-dialog"
                title={itemDetails ? '预览：' + itemDetails.name : '预览'}
                closeOnClickModal={false}
                visible={this.props.dialogVisible}
                onCancel={this.props.closeSelecFileDialog}
                lockScroll={false}>
                <Dialog.Body>
                    <div className="mod-itemdetail">
                        <div className="item">
                            <span className="item-info">
                                作者 : {itemDetails.creatorName}
                            </span>
                            <span className="item-info">
                                创建时间 : {constants.getDateStr(itemDetails.createTime, 1)}
                            </span>
                            <span className="item-info">
                                <Icon type="eye"/> 查看 : {itemDetails.viewNum}
                            </span>
                            <span className="item-info">
                                <Icon type="download"/> 下载 : {itemDetails.downNum}
                            </span>
                            <span className="item-info">
                                 知识库: {itemDetails.libraryName}
                            </span>

                            {itemDetails.rate > 0 ? <span className="item-info item-right">
                                评分 : <span className="score-text">{itemDetails.rate || 0}</span>
                            </span> : ''
                            }

                        </div>
                        <div className="item">

                            <Button className='batch-dl' type="text" onClick={this.bdl}>批量下载</Button>

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
                                            <div className="file-item" key={item.fileId}>
                                                <FileIcon file={item}/> <span className="f-name"
                                                                              title={item.fileName}>{item.fileName} </span>
                                                <Button
                                                    className="preview"
                                                    type="text"
                                                    onClick={() => {
                                                        this.handlePreviewClick(item)
                                                    }}>预览</Button>
                                                <Button
                                                    className="preview"
                                                    type="text"
                                                    onClick={() => {
                                                        this.downloadFile(item)
                                                    }}>下载</Button>
                                            </div>
                                        )
                                    }) : <div>暂无附件</div>
                                }
                            </div>
                        </div>
                        <LightBox
                            images={[{src: this.state.image}]}
                            isOpen={this.state.lightboxIsOpen}
                            onClose={this.closeLightbox}/>
                    </div>
                    <div className="item-desc">
                        {itemDetails.desc}
                    </div>
                </Dialog.Body>
            </Dialog>
        )
    }
}
