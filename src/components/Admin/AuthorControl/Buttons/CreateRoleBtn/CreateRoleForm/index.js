import React, { Component } from 'react';
import { Form, Select, Input } from 'antd';
import { getDictionary } from '../../../../../../utils/common';

const FormItem = Form.Item;
const Option = Select.Option;

class CreateStaffForm extends Component {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    const authorOpenStatusAry = getDictionary('authorOpenStatus');
    const formItemLayout = {
      labelCol: { xs: 24, sm: 4 }, // label的col值(一般是文字标题如 密码)
      wrapperCol: { xs: 24, sm: 12 }, // label 后面组件的col值 (如 密码的Input组件)
    };
    return (
      <React.Fragment>
        <Form ayout="horizontal">

          <FormItem label="角色名称" help="" {...formItemLayout}>
            {
              getFieldDecorator('roleName', {
                rules: [{
                  required: true,
                  message: '角色名称不能为空',
                }],
              })(<Input placeholder="请输入" style={{ width: '12rem' }} />)
            }
          </FormItem>

          <FormItem label="状态" help="" {...formItemLayout}>
            {
              getFieldDecorator('authorOpenStatus', {
                rules: [{
                  required: true,
                  message: '状态不能为空',
                }],
              })( // eslint-disable-line
                <Select placeholder="请选择" style={{ width: '12rem' }}>
                  {
                    authorOpenStatusAry.map((item) => {
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

export default Form.create()(CreateStaffForm);
