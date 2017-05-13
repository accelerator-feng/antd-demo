import React from 'react'
import { message } from 'antd'
import MyModal from './modal.js'
import PCHeader from './PCHeader.js'
import MobileHeader from './mobileHeader.js'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            hasLogined: false,
            userNickName: '',
            userid: 0,
        }
    }
    componentWillMount() {
        if (localStorage.userid !== '') {
            this.setState({
                hasLogined: true,
            })
            this.setState({
                userNickName: localStorage.userNickName,
                userid: localStorage.userid,
            })
        }
    }
    setModalVisible = value => {
        this.setState({
            modalVisible: value,
        })
    }
    action = (action, formData, messageTxet) => {
        const loading = message.loading(messageTxet[action][0], 0)
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${formData.userName}&password=${formData.password}&r_userName=${formData.r_userName}&r_password=${formData.r_password}&r_confirmPassword=${formData.r_confirmPassword}`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(json => {
                if (action === 'login') {
                    this.setState({
                        userNickName: json.NickUserName,
                        userid: json.UserId,
                    })
                    localStorage.userid = json.UserId
                    localStorage.userNickName = json.NickUserName
                }
                message.destroy(loading)
                message.success(messageTxet[action][1])
            })
        if (action === 'login') {
            this.setState({
                hasLogined: true,
            })
        }
    }
    logout = () => {
        localStorage.userid = ''
        localStorage.userNickName = ''
        this.setState({
            hasLogined: false,
        })
    }
    render() {
        const isMobile = this.props.route.isMobile
        console.log(isMobile)
        return (
            <div>
                {isMobile
                    ? <MobileHeader
                          hasLogined={this.state.hasLogined}
                          setModalVisible={this.setModalVisible}
                      />
                    : <PCHeader
                          logout={this.logout}
                          setModalVisible={this.setModalVisible}
                          {...this.state}
                      />}
                <MyModal
                    action={this.action}
                    modalVisible={this.state.modalVisible}
                    setModalVisible={this.setModalVisible}
                />
                {this.props.children}
            </div>
        )
    }
}
