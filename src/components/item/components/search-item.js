import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { Layout, Input, Select, Button } from 'element-react-codish';
import { inject, observer } from 'mobx-react'
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
    onChangeInput = (v) => {
        this.props.setSearchInput(v)
    }
    onSearch = () => {
        console.log(this.props.searchInput)
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
    render() {
        return (
            <Layout.Row className="search-item" gutter="20">
                <Layout.Col span="3">
                    <Select value={this.state.value}>
                        {this.state.options.map((el) => {
                            return <Select.Option key={el.value} label={el.label} value={el.value} />;
                        })}
                    </Select>
                </Layout.Col>
                <Layout.Col span="15">
                    <Input placeholder="请输入您要查询的字段" value={this.props.searchInput} onChange={this.onChangeInput} />
                </Layout.Col>
                <Layout.Col span="3">
                    <Button type="default" onClick={this.onSearch }>搜索</Button>
                </Layout.Col>
                <Layout.Col span="3" className="add-itembtn">
                    <NavLink to={`/add-item/${this.props.match.params.id}`}><Button type="primary">新增知识条目</Button></NavLink>
                </Layout.Col>
            </Layout.Row>
        );
    }
}
export default withRouter(SearchItem)
