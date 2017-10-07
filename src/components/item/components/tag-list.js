import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Tag, Popover } from 'element-react'

@inject(stores => {
    let {
        tags,
        parentTags,
        getTags
    } = stores.tag
    return {
        tags,
        parentTags,
        getTags
    }
})
@observer
export default class TagList extends Component {
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
    componentWillMount() {
        this.props.getTags()
    }
    showScenodLevel = () => {
        console.log('showScenodLevel tags')
    }
    render() {
        let { tags, parentTags } = this.props
        return (
            <div className="mod-taglist">
                {/* {
                    tags.map(tag => {
                        return (
                            tag.id ? <Popover key={tag.id} className="first-level" placement="bottom" title="" width="400" trigger="click" content={(
                                <ul className="scenod-level">
                                    {
                                        tag.children.length > 0 ? tag.children.map(child => {
                                            return (<li key={child.id}>{child.tag}</li>)
                                        })
                                            :
                                            <li>暂无子标签</li>
                                    }
                                </ul>

                            )}>
                                <Tag>{tag.tag} <i className="triangle-down"></i></Tag>
                            </Popover>
                                : ''
                        )
                    })
                } */}
                {
                    parentTags.map(item => {
                        return (
                            <Popover key={item.id} className="first-level" placement="bottom" title="" width="400" trigger="click" content={(
                                <ul className="scenod-level">
                                    {
                                        tags.filter(t => {
                                            return t.parentId === item.id;
                                        }).map(t => {
                                            return (
                                                <li key={t.id}>{t.tag}</li>
                                            );
                                        })
                                    }
                                </ul>

                            )}>
                                <Tag>{item.tag} <i className="triangle-down"></i></Tag>
                            </Popover>
                        )
                    })
                }
            </div>
        )
    }
}
