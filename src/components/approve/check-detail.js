import React, {Component} from 'react';
import {Dialog, Input, Button, Slider, Loading, MessageBox, Message} from 'element-react-codish';
import {inject, observer} from 'mobx-react';
import {getDateStr, listToTree} from '../../utils/constants';
import { Cascader } from 'antd';
import _ from 'lodash';

@inject(stores => {
    let {
        checkItemDetail,
        getItemDetail,
        audit
    } = stores.check;
    let {
        tags,
        getTags
    } = stores.tag;
    let {userInfo} = stores.user;
    return {
        checkItemDetail,
        getItemDetail,
        tags,
        getTags,
        userInfo,
        audit
    }
})
@observer
export default class CheckDetail extends Component {
    state = {
        tagValue1: [],
        tagValue2: [],
        tagId1: -1,
        tagId2: -1,
        tagIds1: '',
        tagIds2: '',
        customTag: '',
        customTagId: '',
        desc: '',
        rate: ''
    }

    componentWillMount() {
        let id = this.props.curItemId;
        if (!id) return;
        this.props.getItemDetail(id).then(data => {
            const tagObj0 = data.tagArr[0];
            const tagObj1 = data.tagArr[1];
            const tagId1 = tagObj0 ? tagObj0.parentId : -1;
            const tagId2 = tagObj1 ? tagObj1.parentId : -1;
            const tagValue1 = [tagId1, tagObj0.id];
            const tagValue2 = [tagId2, tagObj1.id];
            this.setState({
                tagValue1,
                tagValue2,
                tagId1,
                tagId2,
                tagIds1: data.tagIds[0],
                tagIds2: data.tagIds[1],
                customTag: data.tagArr[2] && data.tagArr[2].tag,
                customTagId: data.tagArr[2] && data.tagArr[2].id,
                rate: data.rate
            });
            this.props.getTags({
                libraryId: data.libraryId,
                isCustom: 0 // 不返回自定义标签
            });
        });
    }

    onChangeTag1 = value => {
        this.setState({
            tagValue1: value,
            tagId1: value[0],
            tagIds1: value[1]
        });
    }

    onChangeTag2 = value => {
        this.setState({
            tagValue2: value,
            tagId2: value[0],
            tagIds2: value[1]
        });
    }

    handleCustomTagChange = value => {
        this.setState({
            customTag: value
        });
    }

    handleReasonChange = value => {
        this.setState({
            desc: value
        });
    }

    checkLogin = () => {
        let {userInfo} = this.props;
        if (!userInfo || !userInfo.data || !userInfo.data.userId) {
            MessageBox.alert('请先登录', '提示');
            return false;
        }
        return true;
    }

    getAuditParams = type => {
        let {userInfo} = this.props;
        let {
            desc,
            rate,
            tagIds1,
            tagIds2,
            customTag,
            customTagId
        } = this.state;
        let params = {
            auditor: userInfo.data.userId,
            auditDesc: desc,
            status: type === 'pass' ? 1 : 3,
            tagIds: [{
                id: tagIds1
            }, {
                id: tagIds2
            }, {
                id: customTagId,
                tag: customTag
            }],
            rate
        };
        return params;
    }

    handlePassClick = () => {
        if (!this.checkLogin()) return;
        let itemId = this.props.checkItemDetail.id;
        let params = this.getAuditParams('pass');
        MessageBox.confirm('您确定审批通过此条目吗?', '提示', {
            type: 'warning'
        }).then(() => {
            return this.props.audit(itemId, params);
        }).then(data => {
            if (data.code == 200) {
                Message({
                    type: 'success',
                    message: '审批成功!'
                });
                this.props.getDatas()
                this.props.hideDialog()
            } else {
                Message({
                    type: 'error',
                    message: `${data.msg || '审批失败!'}`
                });
            }
        }).catch(e => e);
    }

    handleRejectClick = () => {
        if (!this.checkLogin()) return;
        let itemId = this.props.checkItemDetail.id;
        let params = this.getAuditParams('reject');
        MessageBox.confirm('您确定审批驳回此条目吗?', '提示', {
            type: 'warning'
        }).then(() => {
            return this.props.audit(itemId, params);
        }).then(data => {
            if (data.code == 200) {
                Message({
                    type: 'success',
                    message: '审批成功!'
                });
                this.props.getDatas()
                this.props.hideDialog()
            } else {
                Message({
                    type: 'error',
                    message: `${data.msg || '审批失败!'}`
                });
            }
        }).catch(e => e);
    }

    handleSliderChange = value => {
        this.setState({
            rate: value
        });
    }

    render() {
        let {checkItemDetail, tags, visible, hideDialog} = this.props;
        if (!checkItemDetail.id || !tags.length) {
            return (
                <Loading text="拼命加载中" />
            );
        }
        let mapTags = tags.map((item) => {
            return _.assign({}, item, {
                value: item.id,
                label: item.tag
            });
        });
        const options = listToTree(mapTags, {
            idKey: 'id',
            parentKey: 'parentId',
            childrenKey: 'children'
        }, true);
        let {
            tagValue1,
            tagValue2,
            tagId1,
            tagId2,
            customTag,
            desc,
            rate
        } = this.state;
        return (
            <Dialog
                className="mod-checkdetail-dialog"
                title={checkItemDetail.name}
                size="small"
                closeOnClickModal={false}
                visible={visible}
                onCancel={hideDialog}
                lockScroll={false}
            >
                <Dialog.Body>
                    <div className="check-list">
                        {/* <div className="knowledge-info">
                            <span className="info-title">{checkItemDetail.name}</span>
                        </div> */}
                        <div className="check-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>时间： {getDateStr(checkItemDetail.createTime)}</td>
                                        <td>作者： {checkItemDetail.creatorName}</td>
                                    </tr>
                                    <tr>
                                        <td>添加标签</td>
                                        <td className="tags-wrap">
                                            <Cascader
                                                options={options.filter(item => {
                                                    return item.id !== tagId2
                                                })}
                                                onChange={this.onChangeTag1}
                                                placeholder="请选择标签一"
                                                size="small"
                                                style={{ width: 100 }}
                                                value={tagValue1}
                                                className="item"
                                                allowClear={false}
                                            />
                                            <Cascader
                                                options={options.filter(item => {
                                                    return item.id !== tagId1
                                                })}
                                                onChange={this.onChangeTag2}
                                                placeholder="请选择标签二"
                                                size="small"
                                                style={{ width: 100 }}
                                                value={tagValue2}
                                                className="item"
                                                allowClear={false}
                                            />
                                            <Input
                                                className="default-tag item"
                                                value={customTag}
                                                onChange={this.handleCustomTagChange}
                                                placeholder="自定义标签"
                                                size="mini" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>处理意见</td>
                                        <td>
                                            <Input
                                                type="textarea"
                                                value={desc}
                                                onChange={this.handleReasonChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>打分</td>
                                        <td>
                                            <Slider
                                                value={rate || 0}
                                                onChange={this.handleSliderChange} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.handleRejectClick} >驳回</Button>
                    <Button type="success" onClick={this.handlePassClick}>通过</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
