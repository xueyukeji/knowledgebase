import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import ListItem from './item/list-item'

@inject(stores => {
    stores
})
@observer
export default class Knowledge extends Component {
    render() {
        return (
            <div className="mod-homepage">
                <h4>知识条目</h4>
                <ListItem />
            </div>
        )
    }
}
