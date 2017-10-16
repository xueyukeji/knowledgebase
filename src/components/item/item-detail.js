import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject(stores => {
    let {
        userInfo
    } = stores.user
    let {
        itemDetails,
        getItemDetail,
    } = stores.item;
    return {
        itemDetails,
        getItemDetail,
        userInfo
    }
})
@observer
class ItemDetail extends Component {a
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        this.props.getItemDetail(this.props.match.params.id)
    }
    render() {
        return (
            <div className="mod-itemdetail">
                <title>一李云知识库</title>
                <p>作者：jeff 时间：2017-01-20 12:32:23</p>

            </div>
        )
    }
}

export default withRouter(ItemDetail)
