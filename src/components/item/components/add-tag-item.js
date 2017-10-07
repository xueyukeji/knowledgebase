import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import { Input, Tag, Button, MessageBox } from 'element-react-codish';

@inject(stores => {
    let {
        deleteTag,
        creatTag,
        getTags
    } = stores.tag;
    return {
        deleteTag,
        creatTag,
        getTags
    };
})
@observer
export default class AddTagItem extends Component {
    state = {
        inputVisible: false,
        inputValue: ''
    }

    onChange = value => {
        this.setState({
            inputValue: value
        });
    }

    addTag = () => {
        let {parentId, creatTag} = this.props;
        let {inputValue} = this.state;
        if (parentId && inputValue) {
            creatTag({
                tag: inputValue,
                parentId,
                isCustom: 0
            }).then(() => {
                this.cancelAdd();
            });
        }
    }

    handleClose = (tag) => {
        MessageBox.confirm(`确定删除标签: ${tag.tag}吗？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            return this.props.deleteTag({
                id: tag.id
            });
        }).then(this.props.getTags);
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
        return (
            <div className="mod-addtagitem">
                {
                    this.props.tags.map(item => {
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
                        <span>
                            <Input
                                className="input-new-tag"
                                value={this.state.inputValue}
                                ref={node => this.inputNode = node}
                                size="mini"
                                onChange={this.onChange} />
                            <Button size="mini" onClick={this.addTag}>添加</Button>
                            <Button size="mini" onClick={this.cancelAdd}>取消</Button>
                        </span>
                    ) : <Button className="button-new-tag" size="small" onClick={this.showInput}>新增</Button>
                }
            </div>
        )
    }
}
