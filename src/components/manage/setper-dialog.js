import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog } from 'element-react-codish';
import { Select } from 'antd';

@inject(stores => {
    let {
        curKnowledge,
        creatKnowledge,
        modifyKnowledge,
        getAdminKnowledgeList
    } = stores.manage;
    return {
        curKnowledge,
        creatKnowledge,
        modifyKnowledge,
        getAdminKnowledgeList
    };
})
@observer
export default class AddKnowledge extends Component {
    state = {
        checkExperts: [
            {id: 1, name: 'one'},
            {id: 2, name: 'two'},
            {id: 3, name: 'three'},
            {id: 4, name: 'four'},
            {id: 5, name: 'five'},
            {id: 6, name: 'six'},
        ]
    }
    componentDidMount() {
    }
    handleChange=(value) => {
        console.log(`selected ${value}`);
    }
    handleMultipeChange = (value) => {
        console.log(`Multipe selected ${value}`);
    }
    comfirm = () => {

    }
    render() {
        const Option = Select.Option;
        const { visible, hideDialog } = this.props
        return (
            <Dialog
                className="mod-setper-dialog"
                title="权限设置"
                size="small"
                closeOnClickModal={false}
                visible={visible}
                onCancel={hideDialog}
                lockScroll={false}
            >
                <Dialog.Body>
                    <div className="check-expert">
                        <label>审核人：</label>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择专家"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.state.checkExperts.map((user, index) => {
                                    return (
                                        <Option key={index} value={user.id.toString()}>{user.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="check-tags">
                        <label>审核范围：</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="请选择要审核的标签"
                            defaultValue={['1', '6']}
                            onChange={this.handleMultipeChange}
                        >
                            {
                                this.state.checkExperts.map((user, index) => {
                                    return (
                                        <Option key={index} value={user.id.toString()}>{user.name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button  onClick={ hideDialog } >取消</Button>
                    <Button type="info" onClick={this.comfirm}>确定</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}
