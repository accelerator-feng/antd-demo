import React from 'react'
import logo from '../assets/logo.png'
import { Icon } from 'antd'

export default class mobileHeader extends React.Component {
    login = () => {
        this.props.setModalVisible(true)
    }
    render() {
        const userShow = this.props.hasLogined
            ? <Icon type="inbox" />
            : <Icon type="setting" onClick={this.login} />
        return (
            <div id="mobileTop">
                <section>
                    <img src={logo} alt="logo" />
                    <span>ReactNews</span>
                    {userShow}
                </section>
            </div>
        )
    }
}
