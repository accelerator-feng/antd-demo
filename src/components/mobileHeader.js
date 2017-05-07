import React from 'react';
import logo from '../assets/logo.png';
import { Icon, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class mobileHeader extends React.Component {
    login=() => {
        this.props.setModalVisible(true);
    }
    render() {
        const userShow = this.props.hasLogined ?
            <Icon type="inbox"/> : <Icon type="setting" onClick={this.login}/>
        return (
            <div>
            <div id="mobileTop">
            <section>
             <img src={logo} alt="logo"/>
            <span>ReactNews</span>
            {userShow}
            </section>
            </div>
            <Tabs>
                <TabPane tab="头条" key="headline"></TabPane>
                <TabPane tab="社会" key="social"></TabPane>
                <TabPane tab="国内" key="national"></TabPane>
                <TabPane tab="国际" key="international"></TabPane>
                <TabPane tab="娱乐" key="entertainment"></TabPane>
                <TabPane tab="体育" key="sports"></TabPane>
                <TabPane tab="科技" key="scientific"></TabPane>
            </Tabs>
            </div>
        )
    }
}

