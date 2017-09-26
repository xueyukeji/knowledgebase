import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Layout, Button, Dialog, Input, Tag } from 'element-react'
import { NavLink } from 'react-router-dom'
import SearchItem from './search-item.js'
import LeaderBoard from './leader-board.js'
import ListItem from './list-item.js'
// import AddTag from './add-tag.js'

@inject(stores => {
    let { username, setUserName } = stores.test
    return {
        username,
        setUserName
    }
})
@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogVisible: false,
            tags: [
                { key: 1, name: '标签一', type: 'gray' },
                { key: 2, name: '标签二', type: 'gray' },
                { key: 5, name: '标签三', type: 'gray' },
                { key: 3, name: '标签四', type: 'gray' },
                { key: 4, name: '标签五', type: 'gray' },
                { key: 6, name: '标签六', type: 'gray' },
                { key: 7, name: '标签一', type: 'gray' },
                { key: 8, name: '标签二', type: 'gray' },
                { key: 9, name: '标签三', type: 'gray' },
                { key: 10, name: '标签四', type: 'gray' },
                { key: 11, name: '标签五', type: 'gray' },
                { key: 12, name: '标签六', type: 'gray' }
            ]
        }
    }
    handleClose(tag) {
        const { tags } = this.state
        tags.splice(tags.map(el => el.key).indexOf(tag.key), 1)
        this.setState({ tag })
    }
    render() {
        return (
            <div className="mod-homepage">
                <Layout.Row gutter="20">
                    <Layout.Col span="12">
                        <SearchItem />
                        <div className="tr">
                            <NavLink to="/add-knowledge"><Button type="primary">新增知识条目</Button></NavLink>
                        </div>
                    </Layout.Col>
                    <Layout.Col span="12">
                        <LeaderBoard />
                        <Button type="primary" onClick={() => this.setState({ dialogVisible: true })} >增加标签</Button>
                    </Layout.Col>
                </Layout.Row>
                <h4>知识条目</h4>
                <ListItem />
                {/* <AddTag visible={this.state.dialogVisible}/> */}
                <Dialog
                    title="新增标签"
                    size="small"
                    visible={this.state.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}>
                    <Dialog.Body>
                        <div className="input-tag">
                            <p className="p-tips">知识库标签便于管理知识库和快速检索文件</p>
                            <Input placeholder="请输入内容" />
                        </div>
                        <div className="has-tags">
                            <h6>已有标签 </h6>
                            {/* <Button type="text">编辑</Button></h6> */}
                            <div className="tag-list">
                                {
                                    this.state.tags.map(tag => {
                                        return (
                                            <Tag
                                                key={tag.key}
                                                closable={true}
                                                type={tag.type}
                                                closeTransition={false}
                                                onClose={this.handleClose.bind(this, tag)}>{tag.name}</Tag>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="info" onClick={() => this.setState({ dialogVisible: false })}>创建</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}
