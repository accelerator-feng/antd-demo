import React from 'react'
import { Link } from 'react-router'
import { Row, Col } from 'antd'

export default class MobileNewsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: '',
        }
    }
    componentDidMount() {
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(json =>
                this.setState({
                    news: json,
                }),
            )
    }
    render() {
        const { news } = this.state
        const newsList = news.length
            ? news.map((newsItem, index) => (
                  <section
                      key={index}
                      className="m_article list-item special_section clearfix">
                      <Link to={`details/${newsItem.uniquekey}`}>
                          <div className="m_article_img">
                              <img
                                  src={newsItem.thumbnail_pic_s}
                                  alt={newsItem.title}
                              />
                          </div>
                          <div className="m_article_info">
                              <div className="m_article_title">
                                  <span>{newsItem.title}</span>
                              </div>
                              <div className="m_article_desc clearfix">
                                  <div className="m_article_desc_l">
                                      <span className="m_article_channel">
                                          {newsItem.realtype}
                                      </span>
                                      <span className="m_article_time">
                                          {newsItem.date}
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </Link>
                  </section>
              ))
            : '没有加载到新闻'
        return <Row><Col span={24}>{newsList}</Col></Row>
    }
}
