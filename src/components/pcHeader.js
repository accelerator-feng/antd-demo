import React from 'react';
import { Row, Col } from 'antd';
import logo from '../assets/logo.png';
import { Menu, Icon, Tabs, message, Form, Input, Button, Modal } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false,
            current: 'headline',
            modalVisible: false,
            action: 'register',
            hasLogined: false,
            userNickName: '',
            userid: 0,
            message: {
                login: ['登陆中', '成功登陆'],
                register: ['注册中', '注册成功']
            },
            field: {
                login: ['userName', 'password'],
                register: ['r_userName', 'r_password', 'r_confirmPassword']
            }
        }
    }
    componentWillMount() {
        if (localStorage.userid !== "") {
            this.setState({
                hasLogined: true
            });
            this.setState({
                userNickName: localStorage.userNickName,
                userid: localStorage.userid
            });
        }
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('两次输入的密码不一致！');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['r_confirmPassword'], {
                force: true
            });
        }
        callback();
    }
    setModalVisible(value) {
        this.setState({
            modalVisible: value
        });
    }
    handleClick=(e) => {
        this.setState({
            current: e.key
        });
        if (e.key === "register") {
            this.setModalVisible(true);
        }
    }
    logout=() => {
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({
            hasLogined: false
        });
    }
    handleCancel=() => {
        const form = this.props.form;
        this.setModalVisible(false);
        form.resetFields();
    }
    handleTabChange=(key) => {
        const form = this.props.form;
        form.resetFields();
        key === "login" ? this.setState({
            action: 'login'
        }) : this.setState({
            action: 'register'
        })
    }
    action=() => {
        const loading = message.loading(this.state.message[this.state.action][0], 0);
        const myFetchOptions = {
            method: 'GET'
        };
        const formData = this.props.form.getFieldsValue();
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=${this.state.action}&username=${formData.userName}&password=${formData.password}&r_userName=${formData.r_userName}&r_password=${formData.r_password}&r_confirmPassword=${formData.r_confirmPassword}`, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({
                userNickName: json.NickUserName,
                userid: json.UserId
            });
            localStorage.userid = json.UserId;
            localStorage.userNickName = json.NickUserName;
            message.destroy(loading);
            message.success(this.state.message[this.state.action][1]);
        });
        if (this.state.action === 'login') {
            this.setState({
                hasLogined: true
            });
        }
        this.handleCancel();
    }
    handleSubmit=(e) => {
        e.preventDefault();
        this.props.form.validateFields(this.state.field[this.state.action], {}, (err, values) => {
            !err && this.action();
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined ? <Menu.Item key="logout"  className="ant-menu-item register">
      <Button type="primary" htmlType="button">{this.state.userNickName}</Button>{'  '}
      <Button type="dashed" htmlType="button">个人中心</Button>{'  '}
      <Button type="dashed" htmlType="button" onClick={this.logout}>退出</Button>
      </Menu.Item> :
            <Menu.Item key="register" className="ant-menu-item register">
       <Icon type="appstore"/>注册/登陆
      </Menu.Item>
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
          <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
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
            {userShow}
          </Menu>
          <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={this.handleCancel} footer={[
                <Button key="close" size="large" onClick={this.handleCancel}>关闭</Button>
            ]}>
          <Tabs type="card" onChange={this.handleTabChange}>
              <TabPane key="register" tab="注册">
                   <Form layout="horizontal" onSubmit={this.handleSubmit}>
                     <FormItem label="账户" hasFeedback>
                     {getFieldDecorator('r_userName', {
                rules: [{
                    required: true,
                    message: '请输入您的用户名！',
                }]
            })(
                <Input />
            )}
                     </FormItem>
                     <FormItem label="密码" hasFeedback>
                     {getFieldDecorator('r_password', {
                rules: [{
                    required: true,
                    message: '请输入您的密码！',
                }, {
                    validator: this.checkConfirm,
                }],
            })(
                <Input type="password" />
            )}
                     </FormItem>
                     <FormItem label="确认密码" hasFeedback>
                     {getFieldDecorator('r_confirmPassword', {
                rules: [{
                    required: true,
                    message: '请确认您的密码！',
                }, {
                    validator: this.checkPassword,
                }],
            })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
            )}</FormItem>
                     <Button type="primary" htmlType="submit">注册</Button>
                   </Form>
              </TabPane>
        { /*     登陆    */ }
              <TabPane key="login" tab="登陆" onChange={this.handleTabChange}>
                   <Form layout="horizontal" onSubmit={this.handleSubmit}>
                     <FormItem>
          {getFieldDecorator('userName', {
                rules: [{
                    required: true,
                    message: '请输入您的用户名！'
                }],
            })(
                <Input prefix={<Icon type="user" style={{
                    fontSize: 13
                }} />} placeholder="用户名" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
                rules: [{
                    required: true,
                    message: '请输入您的密码！'
                }],
            })(
                <Input prefix={<Icon type="lock" style={{
                    fontSize: 13
                }} />} type="password" placeholder="密码" />
            )}
        </FormItem>
           <Button type="primary" htmlType="submit">登陆</Button>
       </Form>
              </TabPane>
          </Tabs>
          </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
        );
    }
}
export default PCHeader = Form.create()(PCHeader)
