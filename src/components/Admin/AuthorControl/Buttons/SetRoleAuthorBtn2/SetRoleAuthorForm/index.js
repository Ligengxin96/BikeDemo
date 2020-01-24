import React, { Component } from 'react';
import lodash from 'lodash';
import { Form, Input, Transfer, message } from 'antd';
import { getDictionary } from '../../../../../../utils/common';
import { fetchStaff } from '../../../../../../services/staff';

const FormItem = Form.Item;

class SetRoleAuthorForm extends Component {
  state={
    dataSource: [], // 穿梭框所以数据源
    targetKeys: [], // 穿梭框右侧列表数据源
  }

  componentDidMount() {
    this.fetchData();
  }

  // 获取穿梭框数据
  fetchData = () => {
    fetchStaff({
      type: 1,
    }).then((response) => {
      const { code = 0, result = [] } = response;
      const targetKeys = [];
      result.forEach((item, index) => {
        if (index < 7) {
          targetKeys.push(item.key);
        }
      });
      if (code > 0) {
        // 如果遇到 must set key for <rc-animate> children 错误, 给数据源设置一个key 就行了
        this.setState({
          dataSource: result,
          targetKeys,
        });
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  // 穿梭框数据改变事件
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  };


  // 搜索过滤函数
  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  // 查找字典翻译角色名称
  getRoleName = (role) => {
    const roleNameAry = getDictionary('role');
    let roleName = '--';
    roleNameAry.forEach((element) => {
      if (element.ibm === role) {
        roleName = element.note;
      }
    });
    return roleName;
  }

  render() {
    const { dataSource, targetKeys } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    const formItemLayout = {
      labelCol: { xs: 24, sm: 4 }, // label的col值(一般是文字标题如 密码)
      wrapperCol: { xs: 24, sm: 20 }, // label 后面组件的col值 (如 密码的Input组件)
    };
    return (
      <React.Fragment>
        <Form ayout="horizontal">

          <FormItem label="角色名称" help="" {...formItemLayout}>
            {
              getFieldDecorator('roleName', {
                initialValue: this.getRoleName(lodash.get(this.props, 'selectedRows[0].roleName', '')),
              })(<Input style={{ width: '12rem' }} disabled />)
            }
          </FormItem>

          <FormItem label="选择用户" {...formItemLayout}>
            <Transfer
              showSearch
              dataSource={dataSource}
              titles={['待选用户', '已选用户']}
              searchPlaceholder="输入用户名"
              filterOption={this.filterOption}
              targetKeys={targetKeys}
              onChange={this.handleChange}
              render={item => item.username} // 需要显示的字段名(这里username 对应显示的名字)
              listStyle={{ width: 200, height: 400 }}
            />
          </FormItem>

        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(SetRoleAuthorForm);
