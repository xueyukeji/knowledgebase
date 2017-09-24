import React, {Component} from 'react'
import CheckTop from './check-top'
import CheckList from './check-list'

export default class MyCheck extends Component {
    render() {
        return (
            <div className="my-check">
                <CheckTop />
                <CheckList />
            </div>
        )
    }
}
