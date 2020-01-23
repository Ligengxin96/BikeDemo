import React, { Component } from 'react';
import lodash from 'lodash';
import { Form, Row, Col } from 'antd';

const FormItem = Form.Item;

class openCityForm extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Form layout="inline">

            <Col span={24}>
              <FormItem label="车辆编号">
                {lodash.get(this.props, 'selectedRows[0].bikeId', '--')}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="剩余电量">
                {`${lodash.get(this.props, 'selectedRows[0].battery', '--')}%`}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="行程开始时间">
                {lodash.get(this.props, 'selectedRows[0].startTime', '--')}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="当前位置">
                {lodash.get(this.props, 'selectedRows[0].position', '--')}
              </FormItem>
            </Col>

          </Form>
        </Row>
      </React.Fragment>
    );
  }
}

export default Form.create()(openCityForm);
