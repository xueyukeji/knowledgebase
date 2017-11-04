import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Input, Tag, Button, MessageBox } from 'element-react-codish';

@inject(stores => {
    let {
        deleteTag,
        creatTag,
        getTags,
        curLibId,
    } = stores.tag;
    return {
        deleteTag,
        creatTag,
        getTags,
        curLibId
    };
})
@observer
export default class AddTagItem extends Component {
    state = {
        inputVisible: false,
        inputValue: '',
    }

    onChange = value => {
        this.setState({
            inputValue: value
        });
    }

    addTag = () => {
        let { parentId, creatTag } = this.props;
        let { inputValue } = this.state;
        if (inputValue.length > 42) {
            return MessageBox.alert('标签长度在不能超过42个字符!', '提示');
        }
        if (parentId && inputValue) {
            creatTag({
                libraryId: this.props.curLibId,
                tag: inputValue,
                parentId,
                isCustom: 0
            }).then(() => {
                this.cancelAdd();
            });
        }
    }

    handleClose = (tag) => {
        const {deleteTag, getTags, curLibId} = this.props
        MessageBox.confirm(`确定删除标签: ${tag.tag}吗？对应知识条目里面的标签也会删除`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            return deleteTag({
                id: tag.id
            });
        }).then(() => {
            getTags({
                libraryId: curLibId,
                isCustom: 0
            })
        });
        return false;
    }

    showInput = () => {
        this.setState({
            inputVisible: true
        }, () => {
            this.inputNode.focus();
        });
    }

    cancelAdd = () => {
        this.setState({
            inputVisible: false,
            inputValue: ''
        });
    }

    render() {
        const { tags } = this.props
        return (
            <div className="mod-addtagitem">
                {
                    tags.map(item => {
                        return (
                            <Tag
                                key={item.id}
                                closable={true}
                                closeTransition={false}
                                onClose={() => {
                                    return this.handleClose(item);
                                }}>{item.tag}</Tag>
                        )
                    })
                }
                {
                    this.state.inputVisible ? (
                        <div className="add-tag-input-wrap">
                            <Input
                                className="input-new-tag"
                                value={this.state.inputValue}
                                ref={node => this.inputNode = node}
                                size="mini"
                                onChange={this.onChange} />
                            <Button size="mini" onClick={this.addTag}>添加</Button>
                            <Button size="mini" onClick={this.cancelAdd}>取消</Button>
                        </div>
                    ) : <Button className="button-new-tag" size="small" onClick={this.showInput}>新增二级标签</Button>
                }
            </div>
        )
    }
}
