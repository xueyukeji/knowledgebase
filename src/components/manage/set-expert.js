import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Transfer, Message } from 'element-react-codish';
@inject(stores => {
    let { userList, getUserList } = stores.user;
    let { setUsers, setExpert, isUserDialog } = stores.manage;
    return {
        userList,
        getUserList,
        setUsers,
        setExpert,
        isUserDialog
    };
})
@observer
export default class SetExpert extends Component {
    constructor(props) {
        super(props);
        this.params = {
            key: '',
            offset: 1,
            limit: 50
        };
        this.state = {
            value: []
        };

        this._handleChange = this.handleChange.bind(this);
        this._renderFunc = this.renderFunc.bind(this);
    }

    componentWillMount() {
        this.props.getUserList(this.params);
    }

    onSeachUser = (e) => {
        if (e.charCode === 13) {
            this.params.key = e.target.value
            this.props.getUserList(this.params);
        }
    }

    // rightDefaultChecked user
    handleChange(value) {
        let params = {
            id: this.props.curLibrary.id,
        };
        if (this.props.isUserDialog) {
            params.userIds = value
            this.props.setUsers(params).then(res => {
                console.log('setUsers--->', res);
                this.resSuccessInfo(res, value);
            });
        } else {
            params.professorIds = value
            this.props.setExpert(params).then(res => {
                console.log('setExpert--->', res);
                this.resSuccessInfo(res, value);
            });
        }
    }

    resSuccessInfo(res, value) {
        if (res.code === 200) {
            this.setState({ value });
        } else {
            Message(res.message);
        }
    }

    renderFunc(option) {
        return <span>{option.label}</span>;
    }

    render() {
        const { value } = this.state;
        let { userList } = this.props;
        console.log('selectedUsers--->', this.props.selectedUsers)
        if (!userList) {
            return <div />;
        }
        return (
            <Dialog
                className="mod-setexpert"
                title="设置专家"
                size="small"
                closeOnClickModal={false}
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                lockScroll={false}
            >
                <Dialog.Body>
                    <Transfer
                        data={userList.map(u => ({ key: u.userId, label: u.userName }))}
                        value={value}
                        filterable
                        disableFilter={true}
                        onKeyPress={this.onSeachUser}
                        leftDefaultChecked={this.props.selectedUsers}
                        rightDefaultChecked={this.props.selectedUsers}
                        renderContent={this.renderFunc}
                        titles={['添加', '已添加']}
                        footerFormat={{
                            noChecked: '${total}',
                            hasChecked: '${checked}/${total}'
                        }}
                        onChange={this._handleChange}
                    />
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}
