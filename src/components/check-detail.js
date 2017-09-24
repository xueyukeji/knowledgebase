import React, {Component} from 'react'
import CheckStep from './check-step'
import {Input, Button, Tag} from 'element-react'

export default class CheckDetail extends Component {
    render() {
        return (
            <div className="check-list">
                <CheckStep />
                <div className="knowledge-info">
                    <span className="info-title">小学数学知识大全</span>
                    <span className="info-author">作者: 66</span>
                </div>
                <div className="check-table">
                    <table>
                        <tbody>
                            <tr>
                                <td>添加标签</td>
                                <td>
                                    <Tag className="tag" closable={true}>test</Tag>
                                    <Tag className="tag" closable={true}>test</Tag>
                                    <Tag className="tag" closable={true}>test</Tag>
                                </td>
                            </tr>
                            <tr>
                                <td>处理意见</td>
                                <td>
                                    <Input
                                        type="textarea" />
                                </td>
                            </tr>
                            <tr>
                                <td>操作</td>
                                <td className="align-right">
                                    <Button type="success">通过</Button>
                                    <Button>驳回</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
