import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Dialog, Breadcrumb, Table } from 'element-react-codish';

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
            },
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
                width: 180,
                render: data => {
                    return (
                        <div>
                            <span>{data.folder ? '文件夹' : '文件'}</span>
                        </div>
                    );
                }
            }
        ];
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
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            <span onClick={() => {
                                this.handleFolderClick();
                            }}>首页</span>
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
                        height={250}
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
