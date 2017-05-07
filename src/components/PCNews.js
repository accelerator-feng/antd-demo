import React from 'react';
import { Tabs, Row, Col, Carousel } from 'antd';
import PCNewsBlock from './PCNews_Block';
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
                 </div>
                 <Tabs className="tabs_news">
                   <TabPane tab="新闻" key="1">
                   <PCNewsBlock count={22} type="top" width="100%" bordered="false"></PCNewsBlock>
                   </TabPane>
                 </Tabs>
              </Col>
              <Col span={2}></Col>
            </Row>
        );
    }
}
