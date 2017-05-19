import React from 'react'
import { Link } from 'react-router'
import { Row, Col, Menu, Icon, Button } from 'antd'
import logo from '../../assets/logo.png'

export default class PCHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 'headline',
        }
    }
    handleClick = e => {
        this.setState({
            current: e.key,
        })
        if (e.key === 'register') {
            this.props.setModalVisible(true)
        }
    }
    render() {
        const { hasLogined, userNickName, logout } = this.props,
            userShow = hasLogined
                ? <Menu.Item key="logout" className="ant-menu-item register">
                      <Button type="primary" htmlType="button">
                          {userNickName}
                      </Button>
                      &nbsp;&nbsp;
                      <Link to="/usercenter">
                          <Button type="dashed" htmlType="button">个人中心</Button>
                      </Link>
                      &nbsp;&nbsp;
                      <Button type="dashed" htmlType="button" onClick={logout}>
                          退出
                      </Button>
                  </Menu.Item>
                : <Menu.Item key="register" className="ant-menu-item register">
                      <Icon type="appstore" />注册/登陆
                  </Menu.Item>
        return (
            <Row>
                <Col span={2} />
                <Col span={4}>
                    <a href="/" className="logo">
                        <img src={logo} alt="logo" />
                        <span>ReactNews</span>
                    </a>
                </Col>
                <Col span={16}>
                    <Menu
                        mode="horizontal"
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}>
                        <Menu.Item key="headline">
                            <Icon type="appstore" />头条
                        </Menu.Item>
                        <Menu.Item key="social">
                            <Icon type="appstore" />社会
                        </Menu.Item>
                        <Menu.Item key="national">
                            <Icon type="appstore" />国内
                        </Menu.Item>
                        <Menu.Item key="international">
                            <Icon type="appstore" />国际
                        </Menu.Item>
                        <Menu.Item key="entertainment">
                            <Icon type="appstore" />娱乐
                        </Menu.Item>
                        <Menu.Item key="sports">
                            <Icon type="appstore" />体育
                        </Menu.Item>
                        <Menu.Item key="scientific">
                            <Icon type="appstore" />科技
                        </Menu.Item>
                        {userShow}
                    </Menu>
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}
