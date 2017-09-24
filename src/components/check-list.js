import React, {Component} from 'react'
import CheckListItem from './check-list-item'

export default class CheckList extends Component {
    render() {
        return (
            <div className="check-list">
                <CheckListItem />
                <CheckListItem />
                <CheckListItem />
            </div>
        )
    }
}
