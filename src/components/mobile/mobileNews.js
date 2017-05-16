import React from 'react'
import { Tabs } from 'antd'
import MobileNewsItem from './mobileNewsItem'
import MyCarousel from '../carousel'
const TabPane = Tabs.TabPane

export default class MobileNews extends React.Component {
    render() {
        return (
            <Tabs>
                <TabPane tab="头条" key="headline">
                    <div className="mobileCarousel">
                        <MyCarousel />
                    </div>
                    <MobileNewsItem type="top" />
                </TabPane>
                <TabPane tab="社会" key="social">
                    <MobileNewsItem type="shehui" />
                </TabPane>
                <TabPane tab="国内" key="national">
                    <MobileNewsItem type="guonei" />
                </TabPane>
                <TabPane tab="国际" key="international">
                    <MobileNewsItem type="guoji" />
                </TabPane>
                <TabPane tab="娱乐" key="entertainment">
                    <MobileNewsItem type="yule" />
                </TabPane>
            </Tabs>
        )
    }
}
