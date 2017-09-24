import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Layout} from 'element-react'
import SearchItem from './search-item.js'
import ExpertList from './expert-list.js'
import ListItem from './list-item.js'

@inject(stores => {
    let {username, setUserName} = stores.test
    return {
        username,
        setUserName
    }
})
@observer
export default class Home extends Component {
    render() {
        return (
            <div className="mod-homepage">
                <Layout.Row gutter="20">
                    <Layout.Col span="12">
                        <SearchItem />
                    </Layout.Col>
                    <Layout.Col span="12">
                        <ExpertList />
                    </Layout.Col>
                </Layout.Row>
                <ListItem />
            </div>
        )
    }
}
