import React from 'react';
import { Tabs, Row, Col, Carousel } from 'antd';
import PCNewsBlock from './PCNews_Block';
import PCNewsImageBlock from './PCNews_imageBlock';
import carousel1 from '../assets/carousel_1.jpg';
import carousel2 from '../assets/carousel_2.jpg';
import carousel3 from '../assets/carousel_3.jpg';
import carousel4 from '../assets/carousel_4.jpg';
const TabPane = Tabs.TabPane;
export default class PCNews extends React.Component {
    render() {
        const setting = {
            slidesToShow: 1,
            autoplay: true,
            speed: 500,
            effect: 'fade',
        };
        return (
            <Row>
              <Col span={2}></Col>
              <Col span={20} className="container">
                 <div className="leftContainer">
                   <div className="Carousel">
                     <Carousel {...setting}>
                       <div><img src={carousel1} alt='轮播图'/></div>
                       <div><img src={carousel2} alt='轮播图'/></div>
                       <div><img src={carousel3} alt='轮播图'/></div>
                       <div><img src={carousel4} alt='轮播图'/></div>
                     </Carousel>
                   </div>
                   <PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际" imageWidth="112px"/>
                 </div>
                 <Tabs className="tabs_news">
                   <TabPane tab="头条" key="1">
                   <PCNewsBlock count={22} type="top" width="100%" bordered="false"></PCNewsBlock>
                   </TabPane>
                   <TabPane tab="社会" key="2">
                   <PCNewsBlock count={22} type="shehui" width="100%" bordered="false"></PCNewsBlock>
                   </TabPane>
                   <TabPane tab="国内" key="3">
                   <PCNewsBlock count={22} type="guonei" width="100%" bordered="false"></PCNewsBlock>
                   </TabPane>
                   <TabPane tab="军事" key="4">
                   <PCNewsBlock count={22} type="junshi" width="100%" bordered="false"></PCNewsBlock>
                   </TabPane>
                   <TabPane tab="财经" key="5">
                   <PCNewsBlock count={22} type="caijing" width="100%" bordered="false"></PCNewsBlock>
                   </TabPane>
                   <TabPane tab="体育" key="6">
                   <PCNewsBlock count={22} type="tiyu" width="100%" bordered="false"></PCNewsBlock>
                   </TabPane>
                 </Tabs>
                 <div>
                 <PCNewsImageBlock count={7} type="keji" width="100%" cartTitle="科技" imageWidth="132px"/>
                 <PCNewsImageBlock count={14} type="yule" width="100%" cartTitle="娱乐" imageWidth="132px"/>
                 </div>
              </Col>
              <Col span={2}></Col>
            </Row>
        );
    }
}
