import React from 'react'
import { Link } from 'react-router'
import { Row, Col } from 'antd'
import Tloader from 'react-touch-loader'

export default class MobileNewsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: '',
            count: 5,
            hasMore: 1,
            initializing: 1,
        }
    }
    loadMore = resolve => {
        this.setState(
            prevState => {
                return { count: prevState.count + 5 }
            },
            () => {
                fetch(
                    `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.state.count}`,
                )
                    .then(response => response.json())
                    .then(json =>
                        this.setState({
                            news: json,
                            hasMore: this.state.count > 0 &&
                                this.state.count < 50,
                        }),
                    )
                    .then(resolve)
            },
        )
    }
    componentDidMount() {
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.state.count}`,
        )
            .then(response => response.json())
            .then(json =>
                this.setState({
                    news: json,
                }),
            )
            .then(data => this.setState({ hasMore: 1, initializing: 2 }))
    }
    render() {
        const { news } = this.state,
            newsList = news.length
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
        return (
            <Row>
                <Col span={24}>
                    <Tloader
                        onLoadMore={this.loadMore}
                        hasMore={this.state.hasMore}
                        initializing={this.state.initializing}>
                        {newsList}
                    </Tloader>
                </Col>
            </Row>
        )
    }
}
