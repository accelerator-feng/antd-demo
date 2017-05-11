import React from 'react'
import { Row, Col } from 'antd'

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col span={2} />
                    <Col span={20} className="footer">
                        ©&nbsp;2016 ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2} />
                </Row>
            </footer>
        )
    }
}
