import React from 'react'
import { message } from 'antd'
import PCHeader from './PC/PCHeader'
import MobileHeader from './mobile/mobileHeader'
import MyModal from './modal'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            hasLogined: false,
            userNickName: '',
        }
    }
    componentWillMount() {
        if (localStorage.userid !== '') {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.userNickName,
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
        )
            .then(response => response.json())
            .then(json => {
                if (action === 'login') {
                    this.setState({
                        hasLogined: true,
                        userNickName: json.NickUserName,
                    })
                    localStorage.userid = json.UserId
                    localStorage.userNickName = json.NickUserName
                }
                message.destroy(loading)
                message.success(messageTxet[action][1])
            })
    }
    logout = () => {
        localStorage.userNickName = localStorage.userid = ''
        this.setState({
            hasLogined: false,
        })
    }
    render() {
        const { modalVisible, hasLogined, userNickName } = this.state,
            isMobile = this.props.route.isMobile
        return (
            <div>
                {isMobile
                    ? <MobileHeader
                          hasLogined={hasLogined}
                          setModalVisible={this.setModalVisible}
                      />
                    : <PCHeader
                          userNickName={userNickName}
                          hasLogined={hasLogined}
                          logout={this.logout}
                          setModalVisible={this.setModalVisible}
                      />}
                <MyModal
                    action={this.action}
                    modalVisible={modalVisible}
                    setModalVisible={this.setModalVisible}
                />
                {this.props.children}
            </div>
        )
    }
}
