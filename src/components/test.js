import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

@inject(stores => {
    return {
        username: stores.test.username
    }
})
@observer
export default class Test extends Component {
    render() {
        let {username} = this.props
        return (
            <div>
                {username}
            </div>
        )
    }
}
