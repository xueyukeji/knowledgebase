import React, {Component} from 'react';
import ProfessorItem from './professor-item';
import {Pagination} from 'element-react-codish';
import { inject, observer } from 'mobx-react'
@inject(stores => {
    let { getBoard, boardList } = stores.user;
    return {
        getBoard,
        boardList
    };
})

@observer
export default class Professor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        }
    }
    componentWillMount() {
        const { getBoard, boardList } = this.props
        boardList.count || getBoard({
            start: 0,
            limit: 10
        })
    }
    onPageChange = currentPage => {
        this.setState({
            currentPage
        })
        this.props.getBoard({
            start: currentPage - 1,
            limit: 10
        })
    };
    render() {
        const { boardList } = this.props
        return (
            <div className="professor">
                <ProfessorItem boardList={boardList} />
                {
                    boardList.count > 10 ? <Pagination
                        className="pagination"
                        layout="prev, pager, next"
                        currentPage={this.state.currentPage}
                        onCurrentChange={this.onPageChange}
                        total={boardList.count} /> : ''
                }
            </div>
        )
    }
}
