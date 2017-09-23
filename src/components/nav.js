import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <div>
                <Link to="/test1">test1</Link>
                <Link to="/test2">test2</Link>
            </div>
        )
    }
}
