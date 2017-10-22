import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Layout, Button, Input } from 'element-react-codish';
import { inject, observer } from 'mobx-react';

@inject(stores => {
    let {
        searchInput,
        searchTagIds,
        setSearchInput,
    } = stores.item
    return {
        searchInput,
        searchTagIds,
        setSearchInput,
    }
})

@observer
class SearchItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [{
                value: '1',
                label: '标签搜索',
                clearableValue: false
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
        const { match, searchInput, searchTagIds } = this.props
        const params = {
            libraryId: parseInt(match.params.id),
            start: 0,
            limit: 10,
            tagIds: searchTagIds || [],
            name: searchInput
        }
        this.props.getItemData(params)
    }
    logChange(val) {
        // TODO
        console.log('Selected: ' + JSON.stringify(val))
    }
    render() {
        const {searchInput, match} = this.props
        return (
            <Layout.Row className="search-item">
                {/* <Layout.Col span="3">
                    <Select
                        name="form-field-name"
                        value="1"
                        clearable={false}
                        options={this.state.options}
                        onChange={this.logChange}/>
                </Layout.Col> */}
                <Layout.Col span="18">
                    <Input placeholder="请输入条目名称进行搜索" value={searchInput || ''}
                        onChange={this.onChangeInput}
                        onKeyPress={(e) => {
                            if (e.charCode === 13) { this.getData() }
                        }} />
                </Layout.Col>
                <Layout.Col span="3" className="btn-search">
                    <Button type="primary" onClick={this.onSearch}>搜索</Button>
                </Layout.Col>
                <Layout.Col span="3" className="add-itembtn">
                    <NavLink to={`/add-item/${match.params.id}`}><Button type="primary">新增知识条目</Button></NavLink>
                </Layout.Col>
            </Layout.Row>
        );
    }
}
export default withRouter(SearchItem)
