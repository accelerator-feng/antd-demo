import React from 'react'
import { Link } from 'react-router'
import { Card } from 'antd'

export default class PCNewsBlock extends React.Component {
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
        const { news } = this.state
        const newsList = news.length
            ? news.map((newsItem, index) => (
                  <li key={index}>
                      <Link
                          to={`details/${newsItem.uniquekey}`}
                          target="_blank">
                          {newsItem.title}
                      </Link>
                  </li>
              ))
            : '没有加载到新闻'
        return (
            <Card>
                <ul>
                    {newsList}
                </ul>
            </Card>
        )
    }
}
