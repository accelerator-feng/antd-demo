import React from 'react'
import { Row, Col, Form, Input, Button, Card, notification } from 'antd'
const FormItem = Form.Item

class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: '',
        }
    }
    handleSubmit = () => {}
    componentDidMount() {
        this.getComments()
    }
    handleSubmit = e => {
        e.preventDefault()
        const formdata = this.props.form.getFieldsValue()
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${localStorage.userid}&uniquekey=${this.props.uniquekey}&commnet=${formdata.remark}`,
            {
                method: 'GET',
            },
        )
            .then(response => {
                response.json()
            })
            .then(json => {
                this.getComments()
            })
    }
    getComments = () => {
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${this.props.uniquekey}`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(json => {
                this.setState({
                    comments: json,
                })
            })
    }
    addUserCollection = () => {
        fetch(
            `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${localStorage.uerid}&uniquekey=${this.props.uniquekey}`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(json => {
                notification['success']({
                    message: 'ReactNews提醒',
                    description: '收藏此文章成功',
                })
            })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const comments = this.state.comments
        const commentList = comments.length
            ? comments.map(
                  (comment, index) =>
                      index > comments.length - 20 && comment.Comments
                          ? <Card
                                key={index}
                                title={comment.UserName}
                                extra={
                                    <a href="javascript:void(0)">
                                        发布于 {comment.datetime}
                                    </a>
                                }>
                                <p>{comment.Comments}</p>
                            </Card>
                          : null,
              )
            : '没有加载到任何评论'
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem label="您的评论">
                                {getFieldDecorator('remark', {
                                    initialValue: '',
                                })(<Input type="textarea" placeholder="随便写" />)}
                            </FormItem>
                            <Button type="primary" htmlType="submit">
                                提交评论
                            </Button>
                            <Button
                                type="primary"
                                htmlType="button"
                                onClick={this.addUserCollection}>
                                收藏该文章
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default (Comments = Form.create()(Comments))
