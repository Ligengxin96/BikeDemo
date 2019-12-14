import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'antd';

class Footer extends Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <Card title="基础按钮">
            <Button type="primary">Primary</Button>
            <Button>Normal</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
            <Button type="link">Link</Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Footer;
