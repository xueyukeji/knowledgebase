import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Dialog, Breadcrumb, Table } from 'element-react-codish'

@inject(stores => {
    stores
})

@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dialogVisible: false,
            form: {
                name: '',
                knowledge: '',
                desc: '',
                author: '',
                tags: []
            },
        };
    }

    render() {
        return (
            <Dialog
                title="选择云盘文件"
                size="small"
                visible={this.props.dialogVisible}
                onCancel={this.props.closeSelecFileDialog}
                lockScroll={false}>
                <Dialog.Body>
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>活动管理</Breadcrumb.Item>
                        <Breadcrumb.Item>活动列表</Breadcrumb.Item>
                        <Breadcrumb.Item>活动详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <Table
                        style={{ width: '100%' }}
                        columns={this.props.columns}
                        data={this.props.data}
                        border={true}
                        height={250}
                        onSelectChange={(dataItem, checked) => { console.log(dataItem, checked) }}
                        onSelectAll={(dataList, checked) => { console.log(dataList, checked); }}
                    />
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.closeSelecFileDialog}>取消</Button>
                    <Button type="info" onClick={this.props.closeSelecFileDialog}>确定</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
