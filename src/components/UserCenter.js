import React from 'react'
import { Tabs, Row, Col, Upload, Icon, Modal, Card } from 'antd'
const TabPane = Tabs.TabPane

export default class UserCenter extends React.Component {
    constructor() {
        super()
        this.state = {
            userCollection: '',
            userComments: '',
            previewImage: '',
            previewVisible: false,
        }
    }
    componentDidMount() {
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${localStorage.userid}`,
        )
            .then(res => res.json())
            .then(json => this.setState({ userCollection: json }))
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${localStorage.userid}`,
        )
            .then(res => res.json())
            .then(json => this.setState({ userComments: json }))
    }

    render() {
        const {
            userCollection,
            userComments,
            previewVisible,
            previewImage,
        } = this.state,
            userCollectionList = userCollection.length
                ? userCollection.map((uc, index) => (
                      <Card
                          key={index}
                          title={uc.uniquekey}
                          extra={
                              <a href={`/#/details/${uc.uniquekey}`}>
                                  查看
                              </a>
                          }>
                          <p>{uc.Title}</p>
                      </Card>
                  ))
                : '您还没有收藏任何的新闻，快去收藏一些新闻吧。',
            userCommentsList = userComments.length
                ? userComments.map((comment, index) => (
                      <Card
                          key={index}
                          title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                          extra={
                              <a href={`/#/details/${comment.uniquekey}`}>
                                  查看
                              </a>
                          }>
                          <p>{comment.Comments}</p>
                      </Card>
                  ))
                : '您还没有发表过任何评论。',
            props = {
                action: 'http://newsapi.gugujiankong.com/handler.ashx',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                listType: 'picture-card',
                defaultFileList: [
                    {
                        uid: -1,
                        name: 'xxx.png',
                        state: 'done',
                        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                    },
                ],
                onPreview: file => {
                    this.setState({
                        previewImage: file.url,
                        previewVisible: true,
                    })
                },
            },
            isMobile = this.props.route.isMobile
        return (
            <div>
                {isMobile
                    ? <Tabs>
                          <TabPane tab="我的收藏列表" key="1">
                              <Row>
                                  <Col span={24}>
                                      {userCollectionList}
                                  </Col>
                              </Row>
                          </TabPane>
                          <TabPane tab="我的评论列表" key="2">
                              <Row>
                                  <Col span={24}>
                                      {userCommentsList}
                                  </Col>
                              </Row>
                          </TabPane>
                          <TabPane tab="头像设置" key="3" />
                      </Tabs>
                    : <Row>
                          <Col span={2} />
                          <Col span={20}>
                              <Tabs>
                                  <TabPane tab="收藏列表" key="1">
                                      <div className="comment">
                                          <Row>
                                              <Col span={24}>
                                                  {userCollectionList}
                                              </Col>
                                          </Row>
                                      </div>
                                  </TabPane>
                                  <TabPane tab="评论列表" key="2">
                                      <div className="comment">
                                          <Row>
                                              <Col span={24}>
                                                  {userCommentsList}
                                              </Col>
                                          </Row>
                                      </div>
                                  </TabPane>
                                  <TabPane tab="头像设置" key="3">
                                      <div class="clearfix">
                                          <Upload {...props}>
                                              <Icon type="plus" />
                                              <div className="ant-upload-text">
                                                  上传照片
                                              </div>
                                          </Upload>
                                          <Modal
                                              visible={previewVisible}
                                              footer={null}
                                              onCancel={this.handleCancel}>
                                              <img
                                                  alt="预览"
                                                  src={previewImage}
                                              />
                                          </Modal>
                                      </div>
                                  </TabPane>
                              </Tabs>
                          </Col>
                          <Col span={2} />
                      </Row>}
            </div>
        )
    }
}
