import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Tabs, MessageBox } from 'element-react-codish';
import AddTagItem from './add-tag-item';

@inject(stores => {
    let {
        tags,
        parentTags,
        creatTag,
        deleteTag,
        getTags,
        curLibId
    } = stores.tag;
    return {
        tags,
        parentTags,
        creatTag,
        deleteTag,
        getTags,
        curLibId
    };
})
@observer
export default class AddTag extends Component {


    addParentTag = () => {
        MessageBox.prompt('请输入您要创建的一级标签名称', '', {
            inputPattern: /^.{0,8}$/,
            inputErrorMessage: '标签长度在不能超过8个字符'
        }).then(({ value }) => {
            this.props.creatTag({
                libraryId: this.props.curLibId,
                tag: value,
                parentId: null,
                isCurtom: 0
            });
        }).catch(() => { });
    }

    removeParentTag = tab => {
        let { id, label } = tab.props;
        if (id) {
            MessageBox.confirm(`确定删除标签: ${label} 吗？对应的二级标签和知识条目里面的标签也会删除`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return this.props.deleteTag({
                    id
                });
            }).then(() => {
                this.props.getTags(this.props.curLibId);
            });
        }
        return false;
    }

    renderPopupBody() {
        let { parentTags } = this.props;
        if (parentTags.length) {
            return (
                <Tabs
                    type="card"
                    editable
                    onTabRemove={this.removeParentTag}
                    onTabAdd={this.addParentTag}
                    onTabEdit={() => { }}>
                    {
                        parentTags.map(item => {
                            return (
                                <Tabs.Pane
                                    key={item.id}
                                    closable
                                    label={item.tag}
                                    name={item.tag}
                                    id={item.id}>
                                    <AddTagItem parentId={item.id} tags={this.getChildTags(item.id)} />
                                </Tabs.Pane>
                            );
                        })
                    }
                </Tabs>
            );
        }
        return (
            <div className="add-tag-button-wrap">
                <Button size="small" onClick={this.addParentTag}>添加标签</Button>
            </div>
        );
    }

    getChildTags = id => {
        return this.props.tags.filter(item => {
            return item.parentId === id;
        });
    }

    render() {
        return (
            <Dialog
                className="mod-addtag"
                title="管理标签"
                size="small"
                closeOnClickModal={false}
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                lockScroll={false}>
                <Dialog.Body>{this.renderPopupBody()}</Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
