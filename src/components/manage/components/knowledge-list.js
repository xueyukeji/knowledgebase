import React, { Component } from 'react'
import { Button, MessageBox, Message } from 'element-react-codish'
import { inject, observer } from 'mobx-react'
import AddTag from './add-tag.js';

@inject(stores => {
    let {
        showEditKnowledgeDialog,
        knowledgeList,
        getKnowledgeList,
        removeKnowledge,
    } = stores.manage;
    let {
        isAddTagPopVisible,
        showAddTagPop,
        hideAddTagPop,
        setCurLibId,
        getTags
    } = stores.tag
    return {
        showEditKnowledgeDialog,
        knowledgeList,
        getKnowledgeList,
        removeKnowledge,
        isAddTagPopVisible,
        showAddTagPop,
        hideAddTagPop,
        setCurLibId,
        getTags
    };
})
@observer
export default class Manage extends Component {
    componentWillMount() {
        this.props.getKnowledgeList();
    }

    showAddTagPop = (id) => {
        this.props.showAddTagPop();
        this.props.setCurLibId(id)
        this.props.getTags(id)
    }

    hideAddTagPop = () => {
        this.props.hideAddTagPop();
    }

    delKnowledge = (id) => {
        MessageBox.confirm('此操作将永久删除该知识库, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            this.props.removeKnowledge(id).then(() => {
                Message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.props.getKnowledgeList();
            })
        }).catch(() => { });

    }

    render() {
        let { knowledgeList } = this.props;
        return (
            <div>
                <ul className="manage-list">
                    {
                        knowledgeList.map(item => {
                            return (
                                <li key={item.id}>
                                    <span className="title">{item.name}</span>
                                    <div className="op-btns">
                                        <Button type="text" onClick={() => {this.showAddTagPop(item.id)} }>添加标签</Button>
                                        <Button type="text" onClick={() => {
                                            this.props.showEditKnowledgeDialog(item)
                                        }}>编辑</Button>
                                        <Button type="text" onClick={() => {
                                            this.delKnowledge(item.id)
                                        }}>删除</Button>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                <AddTag visible={this.props.isAddTagPopVisible} handleCancel={this.hideAddTagPop} />
            </div>
        )
    }
}
