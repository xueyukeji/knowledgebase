import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Tag, Button } from 'element-react-codish';
import groupBy from 'lodash/groupBy';

@inject(stores => {
    let { tags, parentTags } = stores.tag
    let { knowledgeObj } = stores.manage
    let {
        searchInput,
        setSearchTagIds,
    } = stores.item
    return {
        tags,
        parentTags,
        searchInput,
        setSearchTagIds,
        knowledgeObj,
    }
})
@observer
class TagList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selTags: [
            ],
            showThree: true
        }
    }
    showScenodLevel = () => {
    }
    selectChildTag = (childTag) => {
        // let ptag = this.props.parentTags.filter(p => {
        //     return childTag.parentId === p.id
        // })
        var tagsIds = []
        tagsIds[0] = childTag.id
        const { selTags } = this.state
        selTags.push({
            id: childTag.id,
            tag: childTag.tag,
        })
        this.setState({
            selTags
        })
        this.props.setSearchTagIds(tagsIds)
        this.getData(selTags.map(item => item.id), this.props.searchInput)
    }
    getData(tagsIds, name) {
        const params = {
            libraryId: parseInt(this.props.match.params.id),
            start: 0,
            limit: 10,
            tagIds: tagsIds,
            name: name
        }
        this.props.getItemData(params)
    }

    handleClose(tag) {
        const { selTags } = this.state;
        selTags.splice(selTags.map(el => el.id).indexOf(tag.id), 1);
        this.setState({
            selTags
        });
        this.getData(selTags.map(item => item.id), this.props.searchInput)
    }

    clearSelect() {
        this.setState({
            selTags: []
        })
    }

    handleClear() {
        this.clearSelect()
        this.getData([], '')
    }
    toggleShowMore () {
        const { showThree } = this.state;
        this.setState({
            showThree: !showThree
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clearTag) {
            this.clearSelect()
        }
    }

    render() {
        let { tags, parentTags } = this.props
        const allTagsObj = groupBy(tags, function({parentId, isCustom}) {
            if (parentId && !isCustom) {
                return parentId
            } else {
                return `${parentId}${isCustom}`
            }
        })
        for (let i = parentTags.length - 1; i > 0; i--) {
            const item = parentTags[i]
            if (!allTagsObj[item.id] || allTagsObj[item.id].length === 0) {
                parentTags.splice(i, 1)
            }
        }
        const customName = '自定义标签'
        allTagsObj[customName] = allTagsObj.null1
        if (allTagsObj.null1 && allTagsObj.null1.length) {
            parentTags.push({
                id: customName,
                tag: customName
            })
        }
        delete allTagsObj.null0
        delete allTagsObj.null1
        const {selTags, showThree} = this.state
        let { knowledgeObj, match } = this.props;
        const curLibrary = knowledgeObj && knowledgeObj.librarys.filter((k) => {
            return k.id === parseInt(match.params.id)
        })
        return (
            <div className="mod-taglist">
                <div className="filter-wrap">
                    <span className="lib-name">
                        {curLibrary[0] && curLibrary[0].name}
                        {/* <NavLink
                            to={`/knowledge/${match.params.id}`}
                            activeClassName="active">
                            {
                                curLibrary[0] && curLibrary[0].name
                            }
                        </NavLink> */}
                        <span>></span>
                    </span>
                    {
                        selTags.map(tag => {
                            return (
                                <Tag
                                    key={tag.id}
                                    closable={true}
                                    closeTransition={false}
                                    onClose={this.handleClose.bind(this, tag)}>{tag.tag}</Tag>
                            )
                        })
                    }
                    {
                        selTags.length ? <Button type="text" onClick={this.handleClear.bind(this)}>清空筛选</Button> : ''
                    }
                </div>
                <div className= {parentTags.length === selTags.length ? 'hidden tag-wrap' : 'tag-wrap' }>
                    {
                        parentTags.map((item, index) => {
                            return allTagsObj[item.id] && allTagsObj[item.id].length > 0 && selTags.filter(cTag => {
                                return allTagsObj[item.id].map(temp => temp.id).indexOf(cTag.id) > -1
                            }).length === 0 ? <div key={item.id} className= {(showThree && index > 2 && parentTags.length - selTags.length > 3 ) ? 'hidden clearfix' : 'clearfix' }>
                                    <div className="left">
                                        {item.tag} :
                                    </div>
                                    <div className="right">
                                        {
                                            allTagsObj[item.id] && allTagsObj[item.id].map(t => {
                                                return (
                                                    <span key={t.id} onClick={() => { this.selectChildTag(t) }}>{t.tag}</span>
                                                );
                                            })
                                        }
                                    </div>
                                </div> : ''
                        })
                    }
                </div>
                {
                    parentTags.length - selTags.length > 3 ? <div className="collapse-area">
                        <div className="line">
                            <div className={showThree ? 'collapse-wrap' : 'collapse-wrap expand'} onClick={() => { this.toggleShowMore() }}>
                                { showThree ? '更多选项' : '收起' }
                            </div>
                        </div>
                    </div> : ''
                }

            </div>
        )
    }
}

export default withRouter(TagList)

