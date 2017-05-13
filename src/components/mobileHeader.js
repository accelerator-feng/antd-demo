import React from 'react'
import { Link } from 'react-router'
import logo from '../assets/logo.png'
import { Icon } from 'antd'

export default class mobileHeader extends React.Component {
    login = () => {
        this.props.setModalVisible(true)
    }
    render() {
        const userShow = this.props.hasLogined
            ? <Link to="/usercenter"><Icon type="inbox" /></Link>
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
