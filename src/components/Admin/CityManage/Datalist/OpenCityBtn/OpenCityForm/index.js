import React, { Component } from 'react';
import { Form, Select, Cascader } from 'antd';
import { getDictionary } from '../../../../../../utils/common';
import cascaderDatas from '../../../../../../assets/config/cascaderDatas';

const FormItem = Form.Item;
const Option = Select.Option;

class openCityForm extends Component {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const userBikeModelAry = getDictionary('userBikeModel');
    const operatingModelAry = getDictionary('operatingModel');
    const authorStatusAry = getDictionary('authorStatus');

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const offsetLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 15, offset: 1 },
    };

    return (
      <React.Fragment>
        <Form layout="inline">
          <FormItem label="城市" help="" {...offsetLayout}>
            {
              getFieldDecorator('city', {
                rules: [
                  {
                    required: true,
                    message: '城市必填',
                  },
                ],
              })(<Cascader style={{ width: '12rem' }} options={cascaderDatas} allowClear={false} placeholder="请选择" />)
            }
          </FormItem>

          <FormItem label="用车模式" help="" {...formItemLayout}>
            {
              getFieldDecorator('userBikeModel', {
                rules: [
                    {
                      required: true,
                      message: '用车模式必填',
                    },
                  ],
                })( // eslint-disable-line
                  <Select style={{ width: '12rem' }} placeholder="请选择">
                    {
                      userBikeModelAry.map((item) => {
                        return <Option value={item.ibm} >{item.note}</Option>;
                      })
                    }
                  </Select>
                ) // eslint-disable-line
            }
          </FormItem>

          <FormItem label="营运模式" help="" {...formItemLayout}>
            {
              getFieldDecorator('operatingModel', {
                rules: [
                    {
                      required: true,
                      message: '营运模式必填',
                    },
                  ],
                })( // eslint-disable-line
                  <Select style={{ width: '12rem' }} placeholder="请选择">
                    {
                      operatingModelAry.map((item) => {
                        return <Option value={item.ibm} >{item.note}</Option>;
                      })
                    }
                  </Select>
                ) // eslint-disable-line
            }
          </FormItem>

          <FormItem label="授权状态" help="" {...formItemLayout}>
            {
              getFieldDecorator('authorStatus', {
                rules: [
                    {
                      required: true,
                      message: '授权状态必填',
                    },
                  ],
                })( // eslint-disable-line
                  <Select style={{ width: '12rem' }} placeholder="请选择">
                    {
                      authorStatusAry.map((item) => {
                        return <Option value={item.ibm} >{item.note}</Option>;
                      })
                    }
                  </Select>
                ) // eslint-disable-line
            }
          </FormItem>

        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(openCityForm);
