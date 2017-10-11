import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { Layout, Button, Input } from 'element-react-codish';
import { inject, observer } from 'mobx-react'
import Select from 'react-select';

@inject(stores => {
    let {
        searchInput,
        setSearchInput,
        getSearchInput,
        getItemList,
    } = stores.item
    return {
        searchInput,
        setSearchInput,
        getSearchInput,
        getItemList
    }
})

@observer
class SearchItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [{
                value: '1',
                label: '标签搜索'
                // }, {
                //     value: '2',
                //     label: '内容搜索'
            }],
            value: '1'
        };
    }
    onChangeInput = (e) => {
        this.props.setSearchInput(e)
    }
    onSearch = () => {
        this.getData()
    }
    getData() {
        const params = {
            libraryId: parseInt(this.props.match.params.id),
            start: 1,
            limit: 10,
            tagIds: [],
            tag: this.props.searchInput
        }
        this.props.getItemList(params)
    }
    logChange(val) {
        console.log('Selected: ' + JSON.stringify(val))
    }
    render() {
        return (
            <Layout.Row className="search-item" gutter="20">
                <Layout.Col span="3">
                    <Select
                        name="form-field-name"
                        value="1"
                        clearable={false}
                        options={this.state.options}
                        onChange={this.logChange}/>
                    {/*  <Select value={this.state.value}>
                         {this.state.options.map((el) => {
                             return <Select.Option key={el.value} label={el.label} value={el.value} />;
                         })}
                     </Select> */}
                </Layout.Col>
                <Layout.Col span="15">
                    {<Input placeholder="请输入标签名字搜索" value={this.props.searchInput || ''}
                        onChange={this.onChangeInput}
                        onKeyPress={(e) => {
                            if (e.charCode === 13) { this.getData() }
                        }} />}
                </Layout.Col>
                <Layout.Col span="3">
                    <Button type="default" onClick={this.onSearch}>搜索</Button>
                </Layout.Col>
                <Layout.Col span="3" className="add-itembtn">
                    <NavLink to={`/add-item/${this.props.match.params.id}`}><Button type="primary">新增知识条目</Button></NavLink>
                </Layout.Col>
            </Layout.Row>
        );
    }
}
export default withRouter(SearchItem)
