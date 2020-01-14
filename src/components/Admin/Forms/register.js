import React from 'react';
import Moment from 'moment';
import lodash from 'lodash';
import { routerRedux } from 'dva/router';
import { Card, Col, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber, Cascader } from 'antd';
import cascaderDatas from '../../../assets/config/cascaderDatas';
import MyModal from '../../myComponents/myModal';
import styles from '../../../style/common.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class FormRegister extends React.Component {
  state={
    visible: false,
    loading: false,
    userImage: null, // 用户头像路径
  }

  // 生日改变后设置年龄
  BirthdayChange = (value) => {
    const { form: { setFieldsValue } } = this.props;
    const age = parseInt(value.fromNow(), 10);
    setFieldsValue({ age });
  }

  // 注册按钮点击回调
  registerSubmit = () => {
    const { form: { validateFieldsAndScroll }, dispatch } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (error) {
        const key = Object.keys(error);
        key.forEach((item, index) => {
          if (index < 1) { // 只提示第一个错误
            const { message: errorInfo } = lodash.get(error, `${item}.errors[0]`, '');
            const userInput = lodash.get(values, 'item', '');
            userInput ? message.info(`${errorInfo},你输入的是: ${userInput}`) : message.info(errorInfo);
          }
        });
      } else {
        const city = lodash.get(values, `hometown[${values.hometown.length - 2}]`, '北京');
        dispatch({
          type: 'userModel/setUserInformation',
          payload: {
            city,
            name: values.userName,
            password: values.password,
          },
        });
        message.success(`恭喜你${values.userName},注册成功, 请登录`);
        dispatch(routerRedux.push('/admin/form/login')); // 注册完后跳转到登录页面
      }
    });
  }

  // 文件状态改变回调
  handleFileStateChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        userImage: imageUrl,
        loading: false,
      }));
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  // 打开彩蛋弹窗
  showEasterEgg = () => {
    this.setState({ visible: true });
  }

  // 关闭弹窗
  handleCancel = () => {
    message.info('GL HF!');
    this.setState({ visible: false });
  }

  render() {
    const { loading, userImage, visible } = this.state;
    const { form: { getFieldDecorator, getFieldValue } } = this.props;
    const registerBtnDisabled = getFieldValue('userBook'); // 是否禁用注册按钮(是否勾选阅读过用户手册)

    // 表单内(一个FormItem)也具有栅格系统
    const formItemLayout = {
      labelCol: { xs: 24, sm: 4 }, // label的col值(一般是文字标题如 密码)
      wrapperCol: { xs: 24, sm: 12 }, // label 后面组件的col值 (如 密码的Input组件)
    };

    // 如果没有label(文字标题, FormItem的label属性) 需要跟有label的后面组件对齐,需要设置offset(偏移属性)
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12, // sm: { 12 } = sm: { span: 12 } formItemLayout只是省略写法
          offset: 4, // 如formItemLayout对象里面的 sm下label占据4格, 那么这里因为没有label属性 所以需要偏移4格
        },
      },
    };

    const modalProps = { // 个人喜好,封装的弹框确认和取消按钮水平居中的
      title: '恭喜你发现了个小彩蛋',
      visible,
      onOk: this.handleCancel,
      onCancel: this.handleCancel,
    };

    return (
      <div>
        <Card title="注册表单" className={styles.myCard}>
          <Col span={12}>
            <Form layout="horizontal">
              <FormItem label="用户名" {...formItemLayout}>
                {
                  getFieldDecorator('userName', {
                    rules: [{
                        required: true,
                        message: '用户名不能为空',
                      }, {
                        pattern: new RegExp('^\\w+$', 'g'),
                        message: '用户名必须为字母或数字',
                      },
                    ],
                  })(<Input placeholder="请输入用户名" />)
                }
              </FormItem>

              <FormItem label="密码" {...formItemLayout}>
                {
                  getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                      },
                    ],
                  })(<Input type="password" placeholder="请输入密码" />)
                }
              </FormItem>

              <FormItem label="性别" {...formItemLayout}>
                {
                  getFieldDecorator('sex', {
                    initialValue: '3',
                  })( // eslint-disable-line
                    <RadioGroup>
                      <Radio value="1">男</Radio>
                      <Radio value="2">女</Radio>
                      <Radio value="3">保密</Radio>
                    </RadioGroup>
                  ) // eslint-disable-line
                }
              </FormItem>

              <FormItem label="生日" {...formItemLayout}>
                {
                  getFieldDecorator('birthday', {
                    initialValue: Moment('1996-06-06'), // 注意DatePicker组件的initialValue需要一个Moment对象
                  })(<DatePicker onChange={this.BirthdayChange} allowClear={false} />)
                }
              </FormItem>

              <FormItem label="年龄" {...formItemLayout}>
                {
                  getFieldDecorator('age', {
                    initialValue: parseInt(Moment('1996-06-06').fromNow(), 10),
                    rules: [{
                      pattern: /^100$|^[1-9]\d$/g, // 是100 或者 1-9开头后面匹配任意数字(匹配10-99)
                      message: '年龄不能小于10且不能大于100',
                    }],
                  })(<InputNumber />)
                }
              </FormItem>

              <FormItem label="当前状态" {...formItemLayout}>
                {
                  getFieldDecorator('status', {
                    initialValue: '2',
                  })( // eslint-disable-line
                    <Select>
                      <Option value="1">咸鱼</Option>
                      <Option value="2">菜鸡</Option>
                      <Option value="3">努力奋斗</Option>
                      <Option value="4">技术巅峰</Option>
                      <Option value="5">创业者</Option>
                    </Select>
                  ) // eslint-disable-line
                }
              </FormItem>

              <FormItem label="爱好" {...formItemLayout}>
                {
                  getFieldDecorator('hobby', {
                    initialValue: ['1', '6'],
                  })( // eslint-disable-line
                    <Select mode="multiple">
                      <Option value="1">游戏</Option>
                      <Option value="2">跑步</Option>
                      <Option value="3">打篮球</Option>
                      <Option value="4">踢足球</Option>
                      <Option value="5">游泳</Option>
                      <Option value="6">旅游</Option>
                      <Option value="7">骑行</Option>
                      <Option value="8">桌游</Option>
                    </Select>
                    ) // eslint-disable-line
                }
              </FormItem>

              <FormItem label="是否单身" {...formItemLayout}>
                {
                  getFieldDecorator('isSingle', {
                      valuePropName: 'checked', // 这个属性对于特殊组件是必须要设置的 不然initialValue是不生效的
                      initialValue: true, // 当然,也可以不设置,虽然initialValue会失效,但是可以直接给Switch组件设置defaultValue(或者value)也是可行的
                  })(<Switch />)
                }
              </FormItem>

              <FormItem label="籍贯" {...formItemLayout}>
                {
                  getFieldDecorator('hometown', {
                    rules: [{
                      required: true,
                      message: '籍贯必填',
                    }],
                  })(<Cascader options={cascaderDatas} placeholder="请选择" />)
                }
              </FormItem>

              <FormItem label="联系地址" {...formItemLayout}>
                {
                  getFieldDecorator('address', {
                    initialValue: '湖北省武汉市光谷软件园',
                  })(<TextArea autosize={{ minRows: 4, maxRows: 6 }} />)
                }
              </FormItem>

              <FormItem label="起床时间" {...formItemLayout}>
                {
                  getFieldDecorator('weekupTime')(<TimePicker format="HH:mm" placeholder="请选择" />) // 用法和DatePicker差不多
                }
              </FormItem>

              <FormItem label="头像" {...formItemLayout}>
                <Upload
                  loading={loading}
                  listType="picture-card"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  onChange={this.handleFileStateChange}
                  accept=".jpg, .png"
                >
                  {userImage ? <img src={userImage} width="8.5rem" height="8.5rem" alt="" /> : <Icon type={loading ? 'loading' : 'plus'} />}
                </Upload>
              </FormItem>

              <FormItem {...offsetLayout}>
                {
                  getFieldDecorator('userBook')(<Checkbox>我已阅读过<Button type="link" onClick={this.showEasterEgg}>用户手册</Button></Checkbox>)
                }
              </FormItem>

              <FormItem {...offsetLayout}>
                <Button type="primary" onClick={this.registerSubmit} disabled={!registerBtnDisabled}>注册</Button>
              </FormItem>

            </Form>
          </Col>
        </Card>
        <MyModal {...modalProps}>
          <p>这是一个关于菜单的小彩蛋</p>
          <p>点击菜单上面的antd图标可以切换菜单模式</p>
          <p>点击菜单上面的MyBike文字可以切换菜单主题</p>
        </MyModal>
      </div>
    );
  }
}

export default Form.create()(FormRegister);
