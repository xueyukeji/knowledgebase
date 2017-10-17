import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Transfer } from 'element-react-codish';

@inject(stores => {
    let { userList, getUserList } = stores.user;
    return {
        userList,
        getUserList
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
        this._filterMethod = this.filterMethod.bind(this);
        this._renderFunc = this.renderFunc.bind(this);
    }

    componentWillMount() {
        this.props.getUserList(this.params);
    }


    filterMethod(query, item) {
        console.log('filterMethod', query, item)
        return item.label.indexOf(query) > -1;
    }

    // rightDefaultChecked user
    handleChange(value) {
        console.log('handleChange ==> ', value)
        // TODO
        this.setState({ value });
    }

    renderFunc(option) {
        return (
            <span>
                {option.label}
            </span>
        );
    }

    render() {
        const { value } = this.state;
        let { userList } = this.props;
        if (!userList) {
            return <div></div>
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
                        value={value}
                        filterable
                        filterMethod = {this.filterMethod}
                        leftDefaultChecked={[]}
                        rightDefaultChecked={[]}
                        renderContent={this.renderFunc}
                        titles={['添加', '已添加']}
                        footerFormat={{
                            noChecked: '${total}',
                            hasChecked: '${checked}/${total}'
                        }}
                        onChange={this._handleChange}
                        data={userList.map((u) => ({key: u.userId, label: u.userName}))}
                    />
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </Dialog.Footer>
            </Dialog>
        );
    }
}
