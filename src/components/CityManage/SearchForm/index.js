import React, { Component } from 'react';
import { Card, Form, Button, Select } from 'antd';
import { getDictionary } from '../../../utils/common';
import styles from '../../../style/common.less';

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component {
  // 查询按钮点击事件
  handleSearch = () => {
    const { form: { validateFieldsAndScroll }, dispatch } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        dispatch({
          type: 'cityManageModel/getSearchFormValue',
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
      type: 'cityManageModel/getSearchFormValue',
      payload: {},
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const userBikeModelAry = getDictionary('userBikeModel');
    const operatingModelAry = getDictionary('operatingModel');
    const authorStatusAry = getDictionary('authorStatus');
    return (
      <React.Fragment>
        <Card className={styles.myCard}>
          <Form layout="inline">

            <FormItem label="用车模式" >
              {
                getFieldDecorator('userBikeModel', {
                })( // eslint-disable-line
                  <Select style={{ width: '12rem' }} placeholder="全部" allowClear>
                    {
                      userBikeModelAry.map((item) => {
                        return <Option value={item.ibm} >{item.note}</Option>;
                      })
                    }
                  </Select>
                ) // eslint-disable-line
              }
            </FormItem>

            <FormItem label="营运模式" >
              {
                getFieldDecorator('operatingModel', {
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

            <FormItem label="加盟商授权状态" >
              {
                getFieldDecorator('authorStatus', {
                })( // eslint-disable-line
                  <Select style={{ width: '12rem' }} placeholder="全部" allowClear>
                    {
                      authorStatusAry.map((item) => {
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
