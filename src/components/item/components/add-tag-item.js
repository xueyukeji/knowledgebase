import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Input, Tag, Button } from 'element-react'

@inject(stores => {
    stores
})
@observer
export default class AddTagItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
        }
    }

    onKeyUp(e) {
        if (e.keyCode === 13) {
            this.handleInputConfirm();
        }
    }

    onChange(value) {
        this.setState({ inputValue: value });
    }

    handleClose(index) {
        // todo
        this.state.dynamicTags.splice(index, 1);
        this.forceUpdate();
    }

    showInput() {
        this.setState({ inputVisible: true }, () => {
            this.refs.saveTagInput.focus();
        });
    }

    handleInputConfirm() {
        let inputValue = this.state.inputValue;

        if (inputValue) {
            // todo
            // this.state.dynamicTags.push(inputValue);
        }

        this.state.inputVisible = false;
        this.state.inputValue = '';

        this.forceUpdate();
    }

    render() {
        return (
            <div className="mod-addtagitem">
                {
                    this.props.tags.map((tag, index) => {
                        return (
                            <Tag
                                key={index}
                                closable={true}
                                closeTransition={false}
                                onClose={this.handleClose.bind(this, index)}>{tag.name}</Tag>
                        )
                    })
                }
                {
                    this.state.inputVisible ? (
                        <Input
                            className="input-new-tag"
                            value={this.state.inputValue}
                            ref="saveTagInput"
                            size="mini"
                            onChange={this.onChange.bind(this)}
                            onKeyUp={this.onKeyUp.bind(this)}
                            onBlur={this.handleInputConfirm.bind(this)}
                        />
                    ) : <Button className="button-new-tag" size="small" onClick={this.showInput.bind(this)}> 新增 </Button>
                }
            </div>
        )
    }
}
