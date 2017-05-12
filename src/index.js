import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import MediaQuery from 'react-responsive'
import 'antd/dist/antd.css'
import './css/pc.css'
import './css/mobile.css'
import Header from './components/header'
import PCNews from './components/PCNews'
import MobileNews from './components/mobileNews'
import NewsDetails from './components/newsDetails'
import Footer from './components/footer'

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <MediaQuery query="(min-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={PCNews} />
                        <Route
                            path="/details/:uniquekey"
                            component={NewsDetails}
                        />
                    </Router>
                </MediaQuery>
                <MediaQuery query="(max-device-width:1224px)">
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileNews} />
                        <Route
                            path="/details/:uniquekey"
                            component={NewsDetails}
                            isMobile="true"
                        />
                    </Router>
                </MediaQuery>
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'))
