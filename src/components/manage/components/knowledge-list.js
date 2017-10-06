import React, { Component } from 'react'
import { Button } from 'element-react'
import { inject, observer } from 'mobx-react'

@inject(stores => {
    let {
        knowledgeList,
        getKnowledgeList
    } = stores.manage;
    return {
        knowledgeList,
        getKnowledgeList
    };
})
@observer
export default class Manage extends Component {
    componentWillMount() {
        this.props.getKnowledgeList();
    }

    render() {
        let {knowledgeList} = this.props;
        return (
            <ul className="manage-list">
                {
                    knowledgeList.map(item => {
                        return (
                            <li key={item.id}>
                                <span className="title">{item.name}</span>
                                <div className="op-btns">
                                    <Button type="text">编辑</Button>
                                    <Button type="text">删除</Button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}
