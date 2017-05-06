import React from 'react';
import logo from '../assets/logo.png';
import { message, Icon, Tabs, Form, Input, Button, Modal } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false,
            current: 'headline',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userid: 0
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
    handleCancel=() => {
        this.setModalVisible(false)
    }
    action=() => {
        const loading = message.loading('注册中', 0);
        const myFetchOptions = {
            method: 'GET'
        };
        const formData = this.props.form.getFieldsValue();
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName=${formData.r_userName}&r_password=${formData.r_password}&r_confirmPassword=${formData.r_confirmPassword}`, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({
                userNickName: json.NickUserName,
                userid: json.UserId
            })
        }).then(message.destroy(loading)).then(message.success('注册成功'));
        this.handleCancel();
    }
    handleSubmit=(e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            !err&&this.action();
        });
    }
    login=() => {
        this.setModalVisible(true)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const userShow = this.state.hasLogined ?
            <Icon type="inbox"/> : <Icon type="setting" onClick={this.login}/>
        return (
            <div id="mobileHeader">
            <header>
             <img src={logo} alt="logo"/>
            <span>ReactNews</span>
            {userShow}
            </header>
            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={this.handleCancel} footer={[
                <Button key="close" size="large" onClick={this.handleCancel}>关闭</Button>
            ]}>
          <Tabs type="card">
              <TabPane key="1" tab="注册">
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
          </Tabs>
          </Modal>
          </div>
        );
    }
}
export default MobileHeader = Form.create()(MobileHeader)
