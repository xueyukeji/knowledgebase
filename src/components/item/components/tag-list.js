import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Tag, Popover } from 'element-react-codish'

@inject(stores => {
    let {
        tags,
        parentTags,
        getTags,
    } = stores.tag
    let {
        setSearchInput,
        setTagIds,
        getItemList,
    } = stores.item
    return {
        tags,
        parentTags,
        getTags,
        setSearchInput,
        setTagIds,
        getItemList
    }
})
@observer
class TagList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
        this.props.getTags()
    }
    showScenodLevel = () => {
    }
    selectParentTag = (parentTag) => {
        var tagsIds = []
        tagsIds[0] = parentTag.id
        this.props.setTagIds(tagsIds)
        this.props.setSearchInput(parentTag.tag)
        this.getData(tagsIds)
    }
    selectChildTag = (childTag) => {
        let ptag = this.props.parentTags.filter(p => {
            return childTag.parentId === p.id
        })
        var tagsIds = []
        tagsIds[0] = childTag.id
        this.props.setTagIds(tagsIds)
        this.props.setSearchInput(ptag[0].tag + '/' + childTag.tag)
        this.getData(tagsIds)
    }
    getData(tagsIds) {
        const params = {
            libraryId: parseInt(this.props.match.params.id),
            start: 1,
            limit: 10,
            tagIds: tagsIds,
            tag: ''
        }
        this.props.getItemList(params)
    }
    render() {
        let { tags, parentTags } = this.props
        return (
            <div className="mod-taglist">
                {
                    parentTags.map(item => {
                        return (
                            <Popover key={item.id} className="first-level" placement="bottom" title="" width="400" trigger="hover" content={(
                                <ul className="scenod-level">
                                    {
                                        tags.filter(t => {
                                            return t.parentId === item.id;
                                        }).map(t => {
                                            return (
                                                <li key={t.id} onClick={() => { this.selectChildTag(t) }}>{t.tag}</li>
                                            );
                                        })
                                    }
                                </ul>

                            )}>
                                <span onClick={() => { this.selectParentTag(item) }}><Tag >{item.tag} <i className="triangle-down" ></i></Tag></span>
                            </Popover>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(TagList)

