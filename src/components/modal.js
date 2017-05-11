import React from 'react'
import { Icon, Tabs, Form, Input, Button, Modal } from 'antd'
const FormItem = Form.Item
const TabPane = Tabs.TabPane

class MyModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            action: 'register',
            message: {
                login: ['登陆中', '成功登陆'],
                register: ['注册中', '注册成功'],
            },
            field: {
                login: ['userName', 'password'],
                register: ['r_userName', 'r_password', 'r_confirmPassword'],
            },
        }
    }
    handleTabChange = key => {
        const form = this.props.form
        form.resetFields()
        key === 'login'
            ? this.setState({
                  action: 'login',
              })
            : this.setState({
                  action: 'register',
              })
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('r_password')) {
            callback('两次输入的密码不一致！')
        } else {
            callback()
        }
    }
    checkConfirm = (rule, value, callback) => {
        const { form, confirmDirty } = this.props
        if (value && confirmDirty) {
            form.validateFields(['r_confirmPassword'], {
                force: true,
            })
        }
        callback()
    }
    handleConfirmBlur = e => {
        const value = e.target.value
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value,
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        const state = this.state
        const formData = this.props.form.getFieldsValue()
        this.props.form.validateFields(
            state.field[state.action],
            {},
            (err, values) => {
                !err && this.props.action(state.action, formData, state.message)
            },
        )
        this.handleCancel()
    }
    handleCancel = () => {
        const props = this.props
        props.setModalVisible(false)
        props.form.resetFields()
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                title="用户中心"
                wrapClassName="vertical-center-modal"
                visible={this.props.modalVisible}
                onCancel={this.handleCancel}
                footer={[
                    <Button
                        key="close"
                        size="large"
                        onClick={this.handleCancel}>
                        关闭
                    </Button>,
                ]}>
                <Tabs type="card" onChange={this.handleTabChange}>
                    {/*      注册      */}
                    <TabPane key="register" tab="注册">
                        <Form layout="horizontal" onSubmit={this.handleSubmit}>
                            <FormItem label="账户" hasFeedback>
                                {getFieldDecorator('r_userName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入您的用户名！',
                                        },
                                    ],
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="密码" hasFeedback>
                                {getFieldDecorator('r_password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入您的密码！',
                                        },
                                        {
                                            validator: this.checkConfirm,
                                        },
                                    ],
                                })(<Input type="password" />)}
                            </FormItem>
                            <FormItem label="确认密码" hasFeedback>
                                {getFieldDecorator('r_confirmPassword', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请确认您的密码！',
                                        },
                                        {
                                            validator: this.checkPassword,
                                        },
                                    ],
                                })(
                                    <Input
                                        type="password"
                                        onBlur={this.handleConfirmBlur}
                                    />,
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                    </TabPane>
                    {/*      登陆      */}
                    <TabPane
                        key="login"
                        tab="登陆"
                        onChange={this.handleTabChange}>
                        <Form layout="horizontal" onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入您的用户名！',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    fontSize: 13,
                                                }}
                                            />
                                        }
                                        placeholder="用户名"
                                    />,
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入您的密码！',
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    fontSize: 13,
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">登陆</Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        )
    }
}

export default (MyModal = Form.create()(MyModal))
