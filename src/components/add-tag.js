import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Dialog } from 'element-react'

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
    }
    render() {
        return (
            <div className="mod-addtag">
                <Dialog
                    title="提示"
                    size="tiny"
                    visible={this.props.dialogVisible}
                    onCancel={() => this.setState({ dialogVisible: false })}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <span>这是一段信息</span>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={() => this.setState({ dialogVisible: false })}>取消</Button>
                        <Button type="primary" onClick={() => this.setState({ dialogVisible: false })}>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}
