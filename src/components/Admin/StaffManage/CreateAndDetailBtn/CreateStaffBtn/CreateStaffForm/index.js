import React, { Component } from 'react';
import { Form, Radio, Select, Input, DatePicker } from 'antd';
import { getDictionary } from '../../../../../../utils/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class CreateStaffForm extends Component {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const statusAry = getDictionary('status');
    const formItemLayout = {
      labelCol: { xs: 24, sm: 4 }, // label的col值(一般是文字标题如 密码)
      wrapperCol: { xs: 24, sm: 12 }, // label 后面组件的col值 (如 密码的Input组件)
    };
    return (
      <React.Fragment>
        <Form ayout="horizontal">

          <FormItem label="姓名" help="" {...formItemLayout}>
            {
              getFieldDecorator('name', {
                rules: [{
                    required: true,
                    message: '姓名不能为空',
                  }],
              })(<Input placeholder="请输入姓名" style={{ width: '12rem' }} />)
            }
          </FormItem>

          <FormItem label="性别" help="" {...formItemLayout}>
            {
              getFieldDecorator('sex', {
                rules: [{
                  required: true,
                  message: '性别不能为空',
                }],
              })( // eslint-disable-line
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              ) // eslint-disable-line
            }
          </FormItem>

          <FormItem label="当前状态" help="" {...formItemLayout}>
            {
              getFieldDecorator('status', {
                rules: [{
                  required: true,
                  message: '当前状态不能为空',
                }],
              })( // eslint-disable-line
                <Select placeholder="请选择" style={{ width: '12rem' }}>
                  {
                    statusAry.map((item) => {
                      return <Option value={item.ibm} >{item.note}</Option>;
                    })
                  }
                </Select>
              ) // eslint-disable-line
            }
          </FormItem>

          <FormItem label="生日" help="" {...formItemLayout}>
            {
              getFieldDecorator('birthday', {
                rules: [{
                  required: true,
                  message: '生日不能为空',
                }],
              })(<DatePicker allowClear={false} style={{ width: '12rem' }} />)
            }
          </FormItem>

          <FormItem label="联系地址" help="" {...formItemLayout}>
            {
              getFieldDecorator('address', {
                rules: [{
                  required: true,
                  message: '联系地址不能为空',
                }],
              })(<TextArea placeholder="请输入" autosize={{ minRows: 4, maxRows: 6 }} style={{ width: '18rem' }} />)
            }
          </FormItem>

        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(CreateStaffForm);
