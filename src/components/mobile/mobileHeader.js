import React from 'react'
import { Link } from 'react-router'
import { Icon } from 'antd'
import logo from '../../assets/logo.png'

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
                    <a href="/">
                        <img src={logo} alt="logo" />
                        <span>ReactNews</span>
                    </a>
                    {userShow}
                </section>
            </div>
        )
    }
}
