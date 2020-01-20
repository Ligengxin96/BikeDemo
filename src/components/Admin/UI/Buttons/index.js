import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'antd';
import styles from './index.module.less';

class Footer extends Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <Card title="基础按钮" className={styles.myCard}>
            <div className={styles.btnList}>
              <Button type="primary">Primary</Button>
              <Button>Normal</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="danger">Danger</Button>
              <Button type="link">Link</Button>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="基础按钮" className={styles.myCard}>
            <div className={styles.btnList}>
              <Button type="primary">Primary</Button>
              <Button>Normal</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="danger">Danger</Button>
              <Button type="link">Link</Button>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Footer;
