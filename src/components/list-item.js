import React, { Component } from 'react'
import { Tag, Layout } from 'element-react'
export default class ListItem extends Component {
    render() {
        return (
            <div>
                <div className="list-item">
                    <div className="title">
                        <h5>雪山大傻逼</h5>
                        <span className="time">2017-01-01 10:30:10</span>
                    </div>
                    <div className="tags">
                        <Tag type="success">标签四</Tag>
                        <Tag type="success">标签四</Tag>
                        <Tag type="success">标签四</Tag>
                    </div>
                    <div className="content">傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼</div>
                    <div className="info">
                        <Layout.Row gutter="20">
                            <Layout.Col span="5">贡献者：jeff</Layout.Col>
                            <Layout.Col span="5"><i className="icon-look"></i> 12121</Layout.Col>
                            <Layout.Col span="5"><i className="icon-like icon-look"></i> 12121</Layout.Col>
                            <Layout.Col span="5"><i className="icon-down icon-look"></i> 12121</Layout.Col>
                            <Layout.Col span="4"><i className="icon-star icon-look"></i> 评分 <span className="score">4.6</span></Layout.Col>
                        </Layout.Row>
                    </div>
                </div>
                <div className="list-item">
                    <div className="title">
                        <h5>雪山大傻逼</h5>
                        <span className="time">2017-01-01 10:30:10</span>
                    </div>
                    <div className="tags">
                        <Tag type="success">标签四</Tag>
                        <Tag type="success">标签四</Tag>
                        <Tag type="success">标签四</Tag>
                    </div>
                    <div className="content">傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼傻逼</div>
                    <div className="info">
                        <Layout.Row gutter="20">
                            <Layout.Col span="5">贡献者：jeff</Layout.Col>
                            <Layout.Col span="5"><i className="icon-look"></i> 12121</Layout.Col>
                            <Layout.Col span="5"><i className="icon-like icon-look"></i> 12121</Layout.Col>
                            <Layout.Col span="5"><i className="icon-down icon-look"></i> 12121</Layout.Col>
                            <Layout.Col span="4"><i className="icon-star icon-look"></i> 评分 <span className="score">4.6</span></Layout.Col>
                        </Layout.Row>
                    </div>
                </div>
            </div>
        )
    }
}
