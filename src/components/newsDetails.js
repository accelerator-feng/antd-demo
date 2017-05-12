import React from 'react'
import { Row, Col, BackTop } from 'antd'
import PCNewsImageBlock from './PCNews_imageBlock'
import Comments from './comments'
export default class NewsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newsItem: '',
        }
    }
    componentDidMount() {
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(json => {
                this.setState({
                    newsItem: json,
                })
                document.title =
                    this.state.newsItem.title + '- React News | React驱动的新闻平台'
            })
    }
    creatMarkup = () => {
        return { __html: this.state.newsItem.pagecontent }
    }
    render() {
        const isMobile = this.props.route.isMobile
        return (
            <div>
                {isMobile
                    ? <Row>
                          <Col span={24} className="container">
                              <div
                                  className="articleContainer"
                                  dangerouslySetInnerHTML={this.creatMarkup()}
                              />
                              <hr />
                              <Comments
                                  uniquekey={this.props.params.uniquekey}
                              />
                          </Col>
                          <BackTop />
                      </Row>
                    : <Row>
                          <Col span={2} />
                          <Col span={14} className="container">
                              <div
                                  className="articleContainer"
                                  dangerouslySetInnerHTML={this.creatMarkup()}
                              />
                              <hr />
                              <Comments
                                  uniquekey={this.props.params.uniquekey}
                              />
                          </Col>
                          <Col span={6}>
                              <PCNewsImageBlock
                                  count={40}
                                  type="top"
                                  width="100%"
                                  imageWidth="130px"
                                  cardTitle="相关新闻"
                              />
                          </Col>
                          <Col span={2} />
                          <BackTop />
                      </Row>}
            </div>
        )
    }
}
