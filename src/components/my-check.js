import React, {Component} from 'react'
import CheckTop from './check-top'
import CheckList from './check-list'
import {Pagination} from 'element-react-codish'

export default class MyCheck extends Component {
    render() {
        return (
            <div className="my-check">
                <CheckTop />
                <CheckList />
                <Pagination
                    className="pagination"
                    layout="prev, pager, next"
                    total={100} />
            </div>
        )
    }
}
