import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog } from 'element-react-codish';

@inject(stores => {
    let { tags } = stores.tag;
    return {
        tags
    };
})
@observer
export default class SetPermission extends Component {
    render() {
        return (
            <Dialog
                className="mod-setpermission"
                title="设置权限"
                size="small"
                closeOnClickModal={false}
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                lockScroll={false}
            >
                <Dialog.Body>UI在调整</Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}
