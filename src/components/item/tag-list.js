import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {Tag, Button} from 'element-react-codish';
import groupBy from 'lodash/groupBy';

@inject(stores => {
    let {tags, parentTags} = stores.tag
    let {knowledgeObj} = stores.manage
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
        this.v = true;
        this.state = {
            selTags: [],
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
        const {selTags} = this.state
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
        const {selTags} = this.state;
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

    toggleShowMore() {
        const {showThree} = this.state;
        this.setState({
            showThree: !showThree
        });
    }

    showMore(tid) {

        let pn = this.refs[ 'mtag' + tid];

        console.log('ref------', pn)

        if (this.v) {
           pn.className = 'right';
        } else {
           pn.className = 'more-right  right';
        }

        this.v = !this.v;

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clearTag) {
            this.clearSelect()
        }
    }

    render() {
        let {tags, parentTags} = this.props
        const allTagsObj = groupBy(tags, function ({parentId, isCustom}) {
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
        return (
            <div className="mod-taglist">
                <div className="filter-wrap">
                    <span className="lib-name">
                        全部结果
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
                <div className={parentTags.length === selTags.length ? 'hidden tag-wrap' : 'tag-wrap'}>
                    {
                        parentTags.map((item, index) => {
                            return allTagsObj[item.id] && allTagsObj[item.id].length > 0 && selTags.filter(cTag => {
                                return allTagsObj[item.id].map(temp => temp.id).indexOf(cTag.id) > -1
                            }).length === 0 ? <div key={item.id} className={(showThree && index > 2 && parentTags.length - selTags.length > 5 ) ? 'hidden clearfix' : 'clearfix'}>
                                <div className="left" title={item.tag}> {item.tag} :</div>
                                <div ref={`mtag${item.id}`} className={( allTagsObj[item.id] && allTagsObj[item.id].length > 6) ? 'more-right right' : 'right'}>
                                    {(allTagsObj[item.id] && allTagsObj[item.id].length > 6) ?
                                        <div className='more-tag'  onClick={() => this.showMore(item.id)}>更多</div> : ''}
                                    {
                                        allTagsObj[item.id] && allTagsObj[item.id].map(t => {
                                            return (
                                                <span key={t.id} title={t.tag} onClick={() => {
                                                    this.selectChildTag(t)
                                                }}>{t.tag}</span>
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
                            <div className={showThree ? 'collapse-wrap' : 'collapse-wrap expand'} onClick={() => {
                                this.toggleShowMore()
                            }}>
                                {showThree ? '更多选项' : '收起'}
                            </div>
                        </div>
                    </div> : ''
                }

            </div>
        )
    }
}

export default withRouter(TagList)

