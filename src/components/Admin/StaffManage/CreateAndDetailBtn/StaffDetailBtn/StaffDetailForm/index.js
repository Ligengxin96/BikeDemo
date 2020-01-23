import React, { Component } from 'react';
import lodash from 'lodash';
import { Form, Row, Col, message } from 'antd';
import { getDictionary } from '../../../../../../utils/common';
import { fetchStaffCode } from '../../../../../../services/staff';

const FormItem = Form.Item;

class StaffDetailForm extends Component {
  state={
    staffInfo: {}, // 员工编号
  }

  componentDidMount() {
    this.fetchData();
  }

  // 获取员工编号
  fetchData = () => {
    fetchStaffCode({}).then((response) => {
      const { code = 0, result = [] } = response;
      if (code > 0) {
        this.setState({
          staffInfo: result[0],
        });
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  // 查找字典翻译状态名称
  getStatusName = (status) => {
    const statusAry = getDictionary('status');
    let statusName = '--';
    statusAry.forEach((element) => {
      if (element.ibm === status) {
        statusName = element.note;
      }
    });
    return statusName;
  }

  // 翻译性别名称
  getSexName = (sex) => {
    let sexName = '未知';
    if (sex === 1) sexName = '男';
    if (sex === 2) sexName = '女';
    return sexName;
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Form layout="inline">

            <Col span={24}>
              <FormItem label="员工编号">
                {lodash.get(this.state, 'staffInfo.id', '--')}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="姓名">
                {lodash.get(this.props, 'selectedRows[0].username', '--')}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="性别">
                {this.getSexName(lodash.get(this.props, 'selectedRows[0].sex', '0'))}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="状态">
                {this.getStatusName(lodash.get(this.props, 'selectedRows[0].status', '0'))}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="生日">
                {lodash.get(this.props, 'selectedRows[0].birthday', '--')}
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="联系地址">
                {lodash.get(this.props, 'selectedRows[0].address', '--')}
              </FormItem>
            </Col>

          </Form>
        </Row>
      </React.Fragment>
    );
  }
}

export default Form.create()(StaffDetailForm);
