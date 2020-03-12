import React from 'react';
import lodash from 'lodash';
import debounce from 'lodash/debounce';
import { routerRedux } from 'dva/router';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';
import styles from '../../../../style/common.less';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor() {
    super();
    this.onChange = debounce(this.onChange, 1000);
  }

  // 登录按钮点击回调
  loginSubmit = (flag) => {
    if (flag === 1) {
      message.info('请使用下方的表单登录');
      return;
    }
    const { form: { getFieldValue, validateFields }, dispatch, registerInfo } = this.props;
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
        if (registerInfo.name === values.userName && registerInfo.password === values.password) {
          message.success(`欢迎你${registerInfo.name}`);
          // 设置用户信息
          dispatch({
            type: 'userModel/setUserInformation',
            payload: registerInfo,
          });
          // 设置权限
          dispatch({
            type: 'globalModel/login',
            payload: 1,
          });
          // 跳转到首页
          dispatch(routerRedux.push('/admin/home'));
        } else {
          message.info('用户名或者密码不正确');
        }
      }
    });
  }

  // 跳转到注册页面
  gotoRegister = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/admin/form/register'));
  }

  onChange = () => {
    message.info('请使用下方的表单登录');
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <React.Fragment>
        <Card title="登录行内样式表单" className={styles.myCard}>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" onChange={this.onChange} />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" onChange={this.onChange} />
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={() => this.loginSubmit(1)}>登录</Button>
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
              <a onClick={() => { message.info('还没数据库噢'); }} style={{ float: 'right' }}>忘记密码</a>
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
