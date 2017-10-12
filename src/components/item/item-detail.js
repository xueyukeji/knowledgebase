import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import { Table } from 'element-react-codish'

@inject(stores => {
    let {
        userInfo
    } = stores.user
    let {
        itemDetails,
        getItemDetail,
    } = stores.item;
    return {
        itemDetails,
        getItemDetail,
        userInfo
    }
})
@observer
class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.COLUMNS = [
            {
                label: '名称',
                prop: 'fileName',
                width: 240,
                render: data => {
                    return (
                        <div onClick={() => {
                            this.handleFolderClick(data);
                        }}>
                            <span className={data.folder ? 'folder' : ''}></span>
                            {data.fileName}
                        </div>
                    );
                }
            },
            {
                label: '日期',
                prop: 'createTime',
                width: 180
            },
            {
                label: '类型',
                prop: 'filename',
                width: 80,
                render: data => {
                    return (
                        <div>
                            <span>{data.folder ? '文件夹' : '文件'}</span>
                        </div>
                    );
                }
            },
            {
                label: '操作',
                prop: 'option',
                width: 100
            }
        ];
    }
    componentWillMount() {
        this.props.getItemDetail(this.props.match.params.id)
    }
    render() {
        return (
            <div className="mod-itemdetail">
                <div className="tc">
                    <h4>一李云知识库</h4>
                    <p className="author">作者：jeff &nbsp;&nbsp;&nbsp; 时间：2017-01-20 12:32:23</p>
                    <Table
                        className="table-file"
                        style={{width: '60%'}}
                        columns={this.COLUMNS}
                        data={this.props.userFile}
                        border={true}
                        height={250}
                        stripe={true}
                        onSelectAll={this.handleSelectAll}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(ItemDetail)
