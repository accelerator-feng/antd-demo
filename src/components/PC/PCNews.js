import React from 'react'
import { Tabs, Row, Col } from 'antd'
import MyCarousel from '../carousel'
import PCNewsBlock from './PCNews_Block'
import PCNewsImageBlock from './PCNews_imageBlock'
const TabPane = Tabs.TabPane

export default class PCNews extends React.Component {
    render() {
        return (
            <Row>
                <Col span={2} />
                <Col span={20} className="container">
                    <div className="leftContainer">
                        <div className="Carousel">
                            <MyCarousel />
                        </div>
                        <PCNewsImageBlock
                            count={6}
                            type="guoji"
                            width="400px"
                            cartTitle="国际"
                            imageWidth="112px"
                        />
                    </div>
                    <Tabs className="tabs_news">
                        <TabPane tab="头条" key="headline">
                            <PCNewsBlock count={22} type="top" />
                        </TabPane>
                        <TabPane tab="社会" key="social">
                            <PCNewsBlock count={22} type="shehui" />
                        </TabPane>
                        <TabPane tab="国内" key="national">
                            <PCNewsBlock count={22} type="guonei" />
                        </TabPane>
                        <TabPane tab="军事" key="military">
                            <PCNewsBlock count={22} type="junshi" />
                        </TabPane>
                        <TabPane tab="财经" key="Finance">
                            <PCNewsBlock count={22} type="caijing" />
                        </TabPane>
                        <TabPane tab="体育" key="sports">
                            <PCNewsBlock count={22} type="tiyu" />
                        </TabPane>
                    </Tabs>
                    <PCNewsImageBlock
                        count={7}
                        type="keji"
                        width="100%"
                        cartTitle="科技"
                        imageWidth="132px"
                    />
                    <PCNewsImageBlock
                        count={7}
                        type="yule"
                        width="100%"
                        cartTitle="娱乐"
                        imageWidth="132px"
                    />
                </Col>
                <Col span={2} />
            </Row>
        )
    }
}
