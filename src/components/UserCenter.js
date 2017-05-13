import React from 'react'
import { Tabs, Row, Col, Upload, Icon, Modal } from 'antd'
const TabPane = Tabs.TabPane

export default class UserCenter extends React.Component {
    constructor() {
        super()
        this.state = {
            previewImage: '',
            previewVisible: false,
        }
    }

    render() {
        const props = {
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
                this.setState({ previewImage: file.url, previewVisible: true })
            },
        }
        const isMobile = this.props.route.isMobile
        return (
            <div>
                {isMobile
                    ? <Row>
                          <Col span={2} />
                          <Col span={20}>
                              <Tabs>
                                  <TabPane tab="收藏列表" key="1">1</TabPane>
                                  <TabPane tab="评论列表" key="2">2</TabPane>
                                  <TabPane tab="头像设置" key="3">
                                      <div class="clearfix">
                                          <Upload {...props}>
                                              <Icon type="plus" />
                                              <div className="ant-upload-text">
                                                  上传照片
                                              </div>
                                          </Upload>
                                          <Modal
                                              visible={
                                                  this.state.previewVisible
                                              }
                                              footer={null}
                                              onCancel={this.handleCancel}>
                                              <img
                                                  alt="预览"
                                                  src={this.state.previewImage}
                                              />
                                          </Modal>
                                      </div>
                                  </TabPane>
                              </Tabs>
                          </Col>
                          <Col span={2} />
                      </Row>
                    : <Tabs>
                          <TabPane tab="我的收藏列表" key="1">1</TabPane>
                          <TabPane tab="我的评论列表" key="2">2</TabPane>
                          <TabPane tab="头像设置" key="3">1</TabPane>
                      </Tabs>}
            </div>
        )
    }
}
