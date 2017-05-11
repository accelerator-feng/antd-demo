import React from 'react'
import { Carousel } from 'antd'
import carousel1 from '../assets/carousel_1.jpg'
import carousel2 from '../assets/carousel_2.jpg'
import carousel3 from '../assets/carousel_3.jpg'
import carousel4 from '../assets/carousel_4.jpg'

export default class MyCarousel extends React.Component {
    render() {
        const setting = {
            slidesToShow: 1,
            autoplay: true,
            speed: 500,
            effect: 'fade',
        }
        return (
            <Carousel {...setting}>
                <div><img src={carousel1} alt="轮播图" /></div>
                <div><img src={carousel2} alt="轮播图" /></div>
                <div><img src={carousel3} alt="轮播图" /></div>
                <div><img src={carousel4} alt="轮播图" /></div>
            </Carousel>
        )
    }
}
