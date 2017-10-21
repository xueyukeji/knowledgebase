import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog, Transfer, Message } from 'element-react-codish';
@inject(stores => {
    let { userList, getUserList } = stores.user;
    let { setUsers, setExpert, isUserDialog, getAdminKnowledgeList } = stores.manage;
    return {
        userList,
        getUserList,
        setUsers,
        setExpert,
        isUserDialog,
        getAdminKnowledgeList
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
            value: this.props.selectedUsers.slice()
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
        // TODO
        const { curLibrary, isUserDialog, setUsers, setExpert} = this.props
        let params = {
            id: curLibrary.id,
        };
        if (isUserDialog) {
            params.userIds = value
            setUsers(params).then(res => {
                this.resSuccessInfo(isUserDialog, res, value);
            });
        } else {
            params.professorIds = value
            setExpert(params).then(res => {
                this.resSuccessInfo(isUserDialog, res, value);
            });
        }
    }

    // TODO去重
    dealArray(items) {
        let temp = []
        items.forEach((a) => {
            if (temp.indexOf(a) === -1) {
                temp.push(a)
                return temp
            }
        })
    }

    resSuccessInfo(isUserDialog, res, value) {
        if (res.code === 200) {
            Message(isUserDialog ? '设置用户成功' : '设置专家成功')
            this.setState({ value });
            this.props.getAdminKnowledgeList()
        } else {
            Message(res.message);
        }
    }

    renderFunc(option) {
        return <span>{option.label}</span>;
    }

    render() {
        const { value } = this.state;
        let { userList, visible, handleCancel, title } = this.props;
        if (!userList) {
            return <div />;
        }
        return (
            <Dialog
                className="mod-setexpert"
                title={title}
                size="small"
                closeOnClickModal={false}
                visible={visible}
                onCancel={handleCancel}
                lockScroll={false}
            >
                <Dialog.Body>
                    <Transfer
                        data={userList.map(u => ({ key: u.userId, label: u.userName }))}
                        value={value}
                        filterable
                        disableFilter={true}
                        onKeyPress={this.onSeachUser}
                        leftDefaultChecked={[]}
                        rightDefaultChecked={[]}
                        renderContent={this.renderFunc}
                        titles={['添加', '已添加']}
                        footerFormat={{
                            noChecked: '${total}',
                            hasChecked: '${checked}/${total}'
                        }}
                        onChange={this._handleChange}
                    />
                </Dialog.Body>
            </Dialog>
        );
    }
}
