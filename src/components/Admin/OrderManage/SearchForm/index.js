import React, { Component } from 'react';
import Moment from 'moment';
import { Card, Form, Button, Select, DatePicker } from 'antd';
import { getDictionary } from '../../../../utils/common';
import styles from '../../../../style/common.less';

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component {
  // 开始时间禁选区间(不得晚于结束时间和今天)
  disabledStartDate = (startValue) => {
    const { getFieldValue } = this.props.form;
    const endValue = getFieldValue('endTime');
    if (!startValue || !endValue) {
      return startValue >= Moment();
    }
    return ((startValue.valueOf() > endValue.valueOf()) || (startValue >= Moment()));
  };

  // 结束时间禁选区间(不得早于开始时间和今天)
  disabledEndDate = (endValue) => {
    const { getFieldValue } = this.props.form;
    const startValue = getFieldValue('startTime');
    if (!endValue || !startValue) {
      return endValue >= Moment();
    }
    return ((endValue.valueOf() < startValue.valueOf()) || (endValue >= Moment()));
  };

  // 开始时间日期改变事件
  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  // 结束时间日期改变事件
  onEndChange = (value) => {
    this.onChange('endValue', value);
  };

  // (开始结束)时间改变时间
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  // 查询按钮点击事件
  handleSearch = () => {
    const { form: { validateFieldsAndScroll }, dispatch } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        dispatch({
          type: 'orderManageModel/getSearchFormValue',
          payload: values,
        });
      }
    });
  }

  // 重置按钮点击事件
  reset = () => {
    const { form: { resetFields }, dispatch } = this.props;
    resetFields();
    // 清空查询条件
    dispatch({
      type: 'orderManageModel/getSearchFormValue',
      payload: {},
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const operatingModelAry = getDictionary('orderStatus');
    return (
      <React.Fragment>
        <Card className={styles.myCard}>
          <Form layout="inline">

            <FormItem label="订单时间" >
              {
                getFieldDecorator('startTime', {
                })( // eslint-disable-line
                  <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onStartChange}
                    placeholder="开始时间"
                  />
                ) // eslint-disable-line
              }
              {
                getFieldDecorator('endTime', {
                })( // eslint-disable-line
                  <DatePicker
                    style={{ marginLeft: '1rem' }}
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    onChange={this.onEndChange}
                    placeholder="结束时间"
                  />
                ) // eslint-disable-line
              }
            </FormItem>

            <FormItem label="订单状态" >
              {
                getFieldDecorator('orderStatus', {
                })( // eslint-disable-line
                  <Select style={{ width: '12rem' }} placeholder="全部" allowClear>
                    {
                      operatingModelAry.map((item) => {
                        return <Option value={item.ibm} >{item.note}</Option>;
                      })
                    }
                  </Select>
                ) // eslint-disable-line
              }
            </FormItem>

            <FormItem>
              <div className={styles.btnList}>
                <Button type="primary" onClick={this.handleSearch}>查询</Button>
                <Button onClick={this.reset}>重置</Button>
              </div>
            </FormItem>

          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export default Form.create()(SearchForm);
