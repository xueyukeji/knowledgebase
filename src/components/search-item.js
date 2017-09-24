import React, {Component} from 'react'
import {Input, Button} from 'element-react'
export default class SearchItem extends Component {
    render() {
        return (
            <div className="search-item">
                <div className="s-qiehuan">
                    <span>智能搜索</span>
                    <span>标签搜索</span>
                </div>
                <Input placeholder="可以搜索您的知识标签，知识条目，知识库等" />
                <Button type="text">搜索</Button>
            </div>
        )
    }
}
