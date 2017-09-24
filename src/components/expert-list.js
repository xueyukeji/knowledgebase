import React, {Component} from 'react'
import {Tabs} from 'element-react'
export default class ExpertList extends Component {
    render() {
        return (
            <Tabs activeName="1">
                <Tabs.Pane label="专家榜" name="1">专家榜</Tabs.Pane>
                <Tabs.Pane label="贡献榜" name="2">贡献榜</Tabs.Pane>
            </Tabs>
        )
    }
}
