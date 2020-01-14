import React from 'react';
import lodash from 'lodash';
import { routerRedux } from 'dva/router';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';
import styles from '../../../style/common.less';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  // 登录按钮点击回调
  loginSubmit = () => {
    const { form: { getFieldValue, validateFields }, dispatch, user } = this.props;
    validateFields((error, values) => {
      if (error) {
        const key = Object.keys(error);
        key.forEach((item, index) => {
          if (index < 1) { // 只提示第一个错误
            const { message: errorInfo } = lodash.get(error, `${item}.errors[0]`, '');
            const userInput = getFieldValue(item);
            userInput ? message.info(`${errorInfo},你输入的是: ${userInput}`) : message.info(errorInfo);
          }
        });
      } else {
        // eslint-disable-next-line no-lonely-if
        if (user.name === values.userName && user.password === values.password) {
          message.success(`欢迎你${user.name}`);
          dispatch({
            type: 'globalModel/login',
            payload: 1,
          });
        } else {
          message.info('用户名或者密码不正确');
        }
      }
    });
  }

  gotoRegister = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/admin/form/register'));
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <React.Fragment>
        <Card title="登录行内样式表单" className={styles.myCard}>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平样式表单" className={styles.myCard}>
          <Form style={{ width: 300 }}>

            <FormItem>
              {
                getFieldDecorator('userName', {
                  rules: [
                    {
                        required: true,
                        message: '用户名不能为空',
                    }, {
                        pattern: new RegExp('^\\w+$', 'g'),
                        message: '用户名必须为字母或数字',
                    },
                  ],
                })(<Input prefix={<Icon type="user" />} placeholder="请输入用户名" />)
                }
            </FormItem>

            <FormItem>
              {
                getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '请输入密码',
                  }],
                })(<Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />)
              }
            </FormItem>

            <FormItem>
              {
                getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)
              }
              <a href="#" style={{ float: 'right' }}>忘记密码</a>
            </FormItem>

            <FormItem>
              <Button type="primary" onClick={this.loginSubmit}>登录</Button>
              <Button style={{ float: 'right' }} onClick={this.gotoRegister}>注册</Button>
            </FormItem>

          </Form>
        </Card>
      </React.Fragment>
    );
  }
}

export default Form.create({
  mapPropsToFields(props) {
    const { user: { name } } = props;
    return {
      userName: Form.createFormField({ value: name }),
    };
  },
})(LoginForm);
