import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Tag, Popover } from 'element-react'

@inject(stores => {
    stores
})
@observer
export default class AddTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [
                {
                    key: 1, name: '语文', type: 'gray',
                    childs: [
                        { name: '一年级语文上册' },
                        { name: '一年级语文下册' },
                        { name: '一年级语文上册' },
                        { name: '一年级语文下册' },
                        { name: '一年级语文上册' },
                        { name: '一年级语文下册' },
                        { name: '一年级语文上册' },
                        { name: '一年级语文下册' },
                        { name: '一年级语文上册' },
                        { name: '一年级语文下册' },
                        { name: '一年级语文上册' },
                        { name: '一年级语文下册' },
                    ]
                },
                { key: 2, name: '数学', type: 'gray', childs: [] },
                { key: 5, name: '英语', type: 'gray', childs: [] },
                { key: 3, name: '政治', type: 'gray', childs: [] },
                { key: 4, name: '历史', type: 'gray', childs: [] },
                { key: 6, name: '地理', type: 'gray', childs: [] },
                { key: 7, name: '物理', type: 'gray', childs: [] },
                { key: 8, name: '生物', type: 'gray', childs: [] }
            ]
        }
    }
    showScenodLevel = () => {
        console.log('showScenodLevel tags')
    }
    render() {
        console.log(this.props)
        return (
            <div className="mod-taglist">
                {
                    this.state.tags.map(tag => {
                        return (
                            <Popover className="first-level" placement="bottom" title="" width="400" trigger="click" content={(
                                <ul className="scenod-level">
                                    {
                                        tag.childs.map(c => {
                                            return (<li>{c.name}</li>)
                                        })
                                    }
                                </ul>

                            )}>
                                <Tag>{tag.name} <i className="triangle-down"></i></Tag>
                            </Popover>
                        )
                    })
                }

            </div>
        )
    }
}
