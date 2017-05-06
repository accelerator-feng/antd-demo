import React from 'react';
import { Row, Col } from 'antd';


export default class MoblieFooter extends React.Component {
    render() {
        return (
            <footer>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="footer">
            © 2016 ReactNews. All Rights Reserved.
          </Col>
          <Col span={2}></Col>
        </Row>
      </footer>
        );
    }
}
