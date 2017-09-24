import React, {Component} from 'react'
import {Transfer, Layout} from 'element-react'

export default class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        }
        this._handleChange = this.handleChange.bind(this);
        this._filterMethod = this.filterMethod.bind(this);
    }
    get data() {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
            data.push({
                label: city,
                key: index,
                pinyin: pinyin[index]
            });
        });
        return data;
    }
    filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
    }
    handleChange(value) {
        this.setState({ value })
    }
    render() {
        const { value } = this.state;
        return (
            <Layout.Row className="mod-manage" gutter="10">
                <Layout.Col span="12">
                    <div className="manage-wrap">
                        <div className="manage-title">
                            设置专家
                        </div>
                        <Transfer
                            filterable
                            filterMethod={this._filterMethod}
                            filterPlaceholder="查找用户"
                            titles={['添加', '已添加']}
                            value={value}
                            onChange={this._handleChange}
                            data={this.data}>
                        </Transfer>
                    </div>
                </Layout.Col>
                <Layout.Col span="12">
                    <div className="manage-wrap">
                        <div className="manage-title">
                            知识库管理
                        </div>
                    </div>
                </Layout.Col>
            </Layout.Row>
        )
    }
}
