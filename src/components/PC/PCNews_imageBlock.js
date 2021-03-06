import React from 'react'
import { Link } from 'react-router'
import { Card } from 'antd'

export default class PCNewsImageBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: '',
        }
    }
    componentDidMount() {
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`,
        )
            .then(response => response.json())
            .then(json =>
                this.setState({
                    news: json,
                }),
            )
    }
    render() {
        const styleImage = {
            display: 'block',
            width: this.props.imageWidth,
            height: '90px',
        },
            styleH3 = {
                width: this.props.imageWidth,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            },
            { cartTitle, width } = this.props,
            news = this.state.news,
            newsList = news.length
                ? news.map((newsItem, index) => (
                      <div key={newsItem.uniquekey} className="imageblock">
                          <Link
                              to={`details/${newsItem.uniquekey}`}
                              target="_blank">
                              <div className="custom-image">
                                  <img
                                      src={newsItem.thumbnail_pic_s}
                                      style={styleImage}
                                      alt="新闻图片"
                                  />
                              </div>
                              <div className="custom-card">
                                  <h3 style={styleH3}>{newsItem.title}</h3>
                                  <p>{newsItem.author_name}</p>
                              </div>
                          </Link>
                      </div>
                  ))
                : '没有加载到新闻'
        return (
            <div className="topNewsList">
                <Card
                    title={cartTitle}
                    style={{
                        width: width,
                    }}>
                    {newsList}
                </Card>
            </div>
        )
    }
}
