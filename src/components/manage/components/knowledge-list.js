import React, { Component } from 'react'
import { Button } from 'element-react'
import { inject, observer } from 'mobx-react'
@inject(stores => {
    console.log(stores)
})
@observer
export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <ul className="manage-list">
                <li>
                    <span className="title">知识库1</span>
                    <div className="op-btns">
                        <Button type="text">设置权限</Button>
                        <Button type="text">设置专家</Button>
                        <Button type="text">编辑</Button>
                        <Button type="text">删除</Button>
                    </div>
                </li>
                <li>
                    <span className="title">知识库2</span>
                    <div className="op-btns">
                        <Button type="text">设置权限</Button>
                        <Button type="text">设置专家</Button>
                        <Button type="text">编辑</Button>
                        <Button type="text">删除</Button>
                    </div>
                </li>
            </ul>
        )
    }
}
