import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Breadcrumb, Table } from 'element-react-codish';
import FileIcon from '../../utils/FileIcon';
import { Input} from 'antd';

const Search = Input.Search;

@inject(stores => {
    let {
        userFile,
        getUserFile,
        setSelected,
        selected,
        curFileParents
    } = stores.user;
    return {
        userFile,
        getUserFile,
        setSelected,
        selected,
        curFileParents
    };
})
@observer
export default class Knowledge extends Component {
    constructor(props) {
        super(props);
        this.COLUMNS = [
            {
                type: 'selection',
                width: 40,
            },
            {
                label: '名称',
                prop: 'fileName',
                render: data => {
                    return (
                        <div onClick={() => {
                            if(data.folder){
                                this.handleFolderClick(data);
                            }
                        }}>
                            <FileIcon file={data}/>  <span style={{ 'position': 'absolute',
                            'top':'10px',
                            'left': '70px',
                            'bottom': '10px',
                            'right':'110px',
                            'overflow':'hidden',
                            'textOverflow' : 'ellipsis',
                            'whiteSpace' : 'nowrap'}} >{data.fileName}</span>
                        </div>
                    );
                }
            },
            {
                label: '日期',
                prop: 'createTime',
                width: 180,

            },

        ];
    }

    searchFiles (value){
        this.props.getUserFile(undefined,value);
    }

    handleSelectedItem = (data, checked) => {
        let arr = new Set(this.props.selected.slice());
        if (checked) {
            arr.add(data);
        } else {
            arr.delete(data);
        }
        this.props.setSelected(Array.from(arr));
    }

    handleSelectAll = (list, checked) => {
        if (checked) {
            this.props.setSelected(list.slice());
        } else {
            this.props.setSelected([]);
        }
    }

    handleFolderClick = data => {
        if (data && data.folder) {
            this.props.getUserFile(data.fileId);
        } else {
            this.props.getUserFile();
        }
    }

    render() {
        let {curFileParents} = this.props;
        return (
            <Dialog
                className="select-file-dialog"
                title="选择云盘文件"
                size="small"
                closeOnClickModal={false}
                visible={this.props.dialogVisible}
                onCancel={this.props.closeSelecFileDialog}
                lockScroll={false}>
                <Dialog.Body>

                    <Search
                        placeholder="根据文件名搜索"
                        style={{width: 200,float:'right'}}
                        onSearch={(value) => this.searchFiles(value)}
                    />

                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            <span onClick={() => {
                                this.handleFolderClick();
                            }}>个人空间 > </span>
                        </Breadcrumb.Item>
                        {
                            curFileParents.map(item => {
                                return (
                                    <Breadcrumb.Item key={item.fileId}>
                                        <span onClick={() => {
                                            this.handleFolderClick(item);
                                        }}>{item.fileName}</span>
                                    </Breadcrumb.Item>
                                );
                            })
                        }
                    </Breadcrumb>
                    <Table
                        className="table-file"
                        style={{width: '100%'}}
                        columns={this.COLUMNS}
                        data={this.props.userFile}
                        border={true}
                        height={350}
                        stripe={true}
                        onSelectChange={this.handleSelectedItem}
                        onSelectAll={this.handleSelectAll}
                    />
                </Dialog.Body>
                <Dialog.Footer className="dialog-footer">
                    <Button onClick={this.props.closeSelecFileDialog}>取消</Button>
                    <Button type="info" onClick={this.props.handleConfirm}>确定</Button>
                </Dialog.Footer>
            </Dialog>
        )
    }
}
