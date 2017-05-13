import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import MediaQuery from 'react-responsive'
import 'antd/dist/antd.css'
import './css/pc.css'
import './css/mobile.css'
import Header from './components/header'
import PCNews from './components/PCNews'
import MobileNews from './components/mobileNews'
import NewsDetails from './components/newsDetails'
import UserCenter from './components/UserCenter'
import Footer from './components/footer'

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <MediaQuery query="(min-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={Header}>
                            <IndexRoute component={PCNews} />
                            <Route
                                path="details/:uniquekey"
                                component={NewsDetails}
                            />
                            <Route path="usercenter" component={UserCenter} />
                        </Route>
                    </Router>
                </MediaQuery>
                <MediaQuery query="(max-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={Header} isMobile="true">
                            <IndexRoute component={MobileNews} />
                            <Route
                                path="details/:uniquekey"
                                component={NewsDetails}
                                isMobile="true"
                            />
                            <Route
                                path="usercenter"
                                component={UserCenter}
                                isMobile="true"
                            />
                        </Route>
                    </Router>
                </MediaQuery>
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'))
