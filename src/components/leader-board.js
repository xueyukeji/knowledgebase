import React, { Component } from 'react'
import { Tabs } from 'element-react'
export default class ExpertList extends Component {
    render() {
        return (
            <Tabs activeName="1">
                <Tabs.Pane label="专家榜" name="1">
                    <div className="exprt-list">
                        <i className="icon guanjun"></i>
                        <img src="../assets/images/logo.png" alt="" />
                        <div className="user-info">
                            <p className="title">小羊羊</p>
                            <p className="intr">this is teacher</p>
                        </div>
                    </div>
                    <div className="exprt-list">
                        <i className="icon guanjun"></i>
                        <img src="../assets/images/logo.png" alt="" />
                        <div className="user-info">
                            <p className="title">小羊羊</p>
                            <p className="intr">this is teacher</p>
                        </div>
                    </div>
                </Tabs.Pane>
                <Tabs.Pane label="贡献榜" name="2">
                    <div className="exprt-list">
                        <i className="icon guanjun"></i>
                        <img src="../assets/images/logo.png" alt="" />
                        <div className="user-info">
                            <p className="title">大羊羊</p>
                            <p className="intr">this is teacher</p>
                        </div>
                    </div>
                    <div className="exprt-list">
                        <i className="icon guanjun"></i>
                        <img src="../assets/images/logo.png" alt="" />
                        <div className="user-info">
                            <p className="title">大羊羊</p>
                            <p className="intr">this is teacher</p>
                        </div>
                    </div>
                </Tabs.Pane>
            </Tabs>
        )
    }
}
