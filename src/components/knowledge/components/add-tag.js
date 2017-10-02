import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Dialog, Tabs, MessageBox } from 'element-react'
import AddTagItem from './add-tag-item.js'
@inject(stores => {
    let { username, setUserName } = stores.test
    return {
        username,
        setUserName
    }
})
@observer
export default class AddTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: [{
                title: '标签一',
                name: 'Tab 1',
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
            }, {
                title: '标签二',
                name: 'Tab 2',
                tags: []
            }],
            tabIndex: 1

        }
    }
    editTab(action, tab) {
        if (action === 'add') {
            this.showInputFirstLevelTagName()
        }

        if (action === 'remove') {
            const { tabs } = this.state;
            console.log(action, tab);
            tabs.splice(tab.key.replace(/^\.\$/, ''), 1);
            this.setState({
                tabs,
            });
        }
    }

    showInputFirstLevelTagName() {
        MessageBox.prompt('请输入您要创建的一级标签名称', '', {
            inputPattern: /^.{0,8}$/,
            inputErrorMessage: '标签长度在不能超过8个字符'
        }).then(({ value }) => {
            const { tabs, tabIndex } = this.state;
            const index = tabIndex + 1;
            tabs.push({
                title: value,
                name: value,
                tags: [],
            });
            this.setState({
                tabs,
                tabIndex: index,
            });
        }).catch(() => {
            // Message({
            //     type: 'info',
            //     message: '取消输入'
            // });
        });
    }
    render() {
        console.log(this.props)
        return (
            <Dialog
                className="mod-addtag"
                title="新增标签"
                size="small"
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                lockScroll={false}>
                <Dialog.Body>
                    <Tabs type="card" value="Tab 1" editable onTabEdit={(action, tab) => this.editTab(action, tab)}>
                        {
                            this.state.tabs.map((item, index) => {
                                return <Tabs.Pane key={index} closable label={item.title} name={item.name}>
                                    <AddTagItem tags={item.tags} />
                                </Tabs.Pane>
                            })
                        }
                    </Tabs>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.handleCancel}>取消</Button>
                    <Button type="info" onClick={this.props.createTag}>创建</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
