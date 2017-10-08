import React, { Component } from 'react'
import { Transfer, Layout } from 'element-react-codish'
import {inject, observer} from 'mobx-react'

@inject(stores => {
    let {libs, getLibs, setLib} = stores.manage
    return {
        setLib,
        getLibs,
        libs
    }
})
@observer
export default class Manage extends Component {
    componentWillMount() {
    }
    componentDidMount() {
        this.props.getLibs()
    }
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
    // get libs() {
    //     return [{
    //         name: '知识库1',
    //         id: 1
    //     }, {
    //         name: '知识库2',
    //         id: 2
    //     }]
    // }
    filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
    }
    handleChange(value) {
        this.setState({ value })
    }
    onAddLib() {
        // this.libs.unshift({
        //     name: '',
        //     isEdit: true
        // })
    }
    onDelLib(id) {
        console.log(id, this.props.libs)
    }
    onEditClick(lib, index) {
        const cloneLib = Object.assign({}, lib)
        this.props.setLib(cloneLib, index)
        // lib.isEdit = true
        // this.libs[index] = Object.assign({}, lib)
        // console.log(this.libs)
        // this.setState({libs: this.libs});
    }
    onEditLib(lib) {
        console.log(lib)
    }
    onCancelEdit(lib) {
        console.log(lib)
    }
    render() {
        const { value } = this.state;

        const listItems = this.props.libs.map((lib, index) => {
            return lib.isEdit ?
                <li key={lib.id}>
                    <input type="text" value={lib.name} />
                    <div className="btn-wrap">
                        <a href="javascript:;" className="btn-edit" onClick={this.onEditLib}>确定</a>
                        <a href="javascript:;" className="btn-del" onClick={() => this.onCancelEdit(lib)}>取消</a>
                    </div>
                </li>
                :
                <li key={lib.id}>
                    <span>{lib.name}</span>
                    <div className="btn-wrap">
                        <a href="javascript:;" className="btn-edit" onClick={() => this.onEditClick(lib, index)}>编辑</a>
                        <a href="javascript:;" className="btn-del" onClick={() => this.onDelLib(lib.id)}>删除</a>
                    </div>
                </li>
        });

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
                        <ul className="lib-list">
                            <li onClick={this.onAddLib}>添加知识库</li>
                            {listItems}
                        </ul>
                    </div>
                </Layout.Col>
            </Layout.Row>
        )
    }
}
