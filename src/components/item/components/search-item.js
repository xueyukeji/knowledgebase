import React, { Component } from 'react';
import { Layout, Input, Select, Button } from 'element-react-codish';
export default class SearchItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [{
                value: '1',
                label: '标签搜索'
            }, {
                value: '2',
                label: '内容搜索'
            }],
            value: '1'
        };
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
                <Layout.Col span="19">
                    <Input placeholder="请输入您要查询的字段" />
                </Layout.Col>
                <Layout.Col span="2">
                    <Button type="default">搜索</Button>
                </Layout.Col>
            </Layout.Row>
        );
    }
}
