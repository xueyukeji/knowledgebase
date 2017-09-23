import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

@inject(stores => {
    let {username, setUserName} = stores.test
    return {
        username,
        setUserName
    }
})
@observer
export default class Test extends Component {
    handleBtnClick = () => {
        this.props.setUserName(`name: ${Math.random()}`)
    }

    render() {
        let {username} = this.props
        return (
            <div>
                {username}
                <button onClick={this.handleBtnClick}>click me</button>
            </div>
        )
    }
}
