import React from 'react'
import { Router, Route, hashHistory, Link } from 'react-router'
import { Card } from 'antd'

export default class PCNewsImageBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: '',
        }
    }
    componentWillMount() {
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
        const styleImage = {
            display: 'block',
            width: this.props.imageWidth,
            height: '90px',
        }
        const styleH3 = {
            width: this.props.imageWidth,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
        }
        const { news } = this.state
        const newsList = news.length
            ? news.map((newsItem, index) => (
                  <div key={index} className="imageblock">
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
                    title={this.props.cartTitle}
                    style={{
                        width: this.props.width,
                    }}>
                    {newsList}
                </Card>
            </div>
        )
    }
}
