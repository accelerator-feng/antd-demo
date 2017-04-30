import React from 'react';
import { Row, Col } from 'antd';
import logo from '../assets/logo.png';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class PCHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'headline'
    }
  }
  render() {
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
              <a href="" className='logo'>
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
              </a>
          </Col>
          <Col span={16}>
          <Menu mode="horizontal" selectedKeys={[this.state.current]}>
            <Menu.Item key='headline'>
              <Icon type='appstore'/>头条
            </Menu.Item>
            <Menu.Item key='social'>
              <Icon type='appstore'/>社会
            </Menu.Item>
            <Menu.Item key='national'>
              <Icon type='appstore'/>国内
            </Menu.Item>
            <Menu.Item key='international'>
              <Icon type='appstore'/>国际
            </Menu.Item>
            <Menu.Item key='entertainment'>
              <Icon type='appstore'/>娱乐
            </Menu.Item>
            <Menu.Item key='sports'>
              <Icon type='appstore'/>体育
            </Menu.Item>
            <Menu.Item key='scientific'>
              <Icon type='appstore'/>科技
            </Menu.Item>
            <Menu.Item key='fashion'>
              <Icon type='appstore'/>时尚
            </Menu.Item>
          </Menu>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}
