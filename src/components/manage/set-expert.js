import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Transfer } from 'element-react-codish';

@inject(stores => {
    let {
        tags,
    } = stores.tag;
    return {
        tags
    };
})
@observer
export default class SetExpert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [1]
        }

        this._handleChange = this.handleChange.bind(this);
        this._filterMethod = this.filterMethod.bind(this);
        this._renderFunc = this.renderFunc.bind(this);
    }
    get data() {
        const data = [];
        for (let i = 1; i <= 15; i++) {
            data.push({
                key: i,
                label: `备选项 ${ i }`,
                disabled: i % 4 === 0
            });
        }
        return data;
    }

    filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
    }

    handleChange(value) {
        this.setState({ value })
    }

    renderFunc(option) {
        return <span>{ option.key } - { option.label }</span>;
    }

    render() {
        const { value } = this.state;
        return (
            <Dialog
                className="mod-setexpert"
                title="设置专家"
                size="small"
                closeOnClickModal={false}
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                lockScroll={false}>
                <Dialog.Body>
                    <Transfer
                        value={value}
                        filterable
                        leftDefaultChecked={[2, 3]}
                        rightDefaultChecked={[1]}
                        renderContent={this.renderFunc}
                        titles={['添加', '已添加']}
                        footerFormat={{
                            noChecked: '${total}',
                            hasChecked: '${checked}/${total}'
                        }}
                        onChange={this._handleChange}
                        data={this.data}
                    >
                    </Transfer>
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.handleCancel}>取消</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
