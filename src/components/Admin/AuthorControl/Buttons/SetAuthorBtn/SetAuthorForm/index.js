import React, { Component } from 'react';
import lodash from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Select, Input, Tree, message } from 'antd';
import menuListDatas from '../../../../../../assets/config/menuConfig';
import { getDictionary } from '../../../../../../utils/common';
import { fetchRoleAuthorTree } from '../../../../../../services/author';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class SetAuthorForm extends Component {
  state={
    authorKeys: [], // 角色拥有菜单的权限
  }

  componentDidMount() {
    this.fetchAuthorTreeData();
  }

  // 获取角色权限树数据
  fetchAuthorTreeData = () => {
    fetchRoleAuthorTree({
      type: lodash.get(this.props, 'selectedRows[0].roleName', ''),
    }).then((response) => {
      const { code = 0, result = [] } = response;
      if (code > 0) {
        this.setState({
          authorKeys: result,
        });
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  // 设置选中的节点
  onCheck = (checkedKeys) => {
    this.setState({ authorKeys: checkedKeys });
  };

  // 渲染叶子节点
  renderTreeNodes = (data, key = '') => {
    return data.map((item) => {
      const parentKey = key + item.key;
      if (item.children) {
        return (
          <TreeNode title={item.title} key={parentKey}>
            {this.renderTreeNodes(item.children, parentKey)}
          </TreeNode>
        );
      }
      if (item.btnList) {
        return (
          <TreeNode title={item.title} key={parentKey}>
            { this.renderBtnTreedNode(item, parentKey) }
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  };
  renderBtnTreedNode = (menu, parentKey = '') => {
    const btnTreeNode = [];
    menu.btnList.forEach((item) => {
      btnTreeNode.push(<TreeNode title={item.title} key={`${parentKey}/${item.key}`} />);
    });
    return btnTreeNode;
  }

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
    const { authorKeys } = this.state;
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
                initialValue: this.getRoleName(lodash.get(this.props, 'selectedRows[0].roleName', '')),
              })(<Input placeholder="请输入" style={{ width: '12rem' }} disabled />)
            }
          </FormItem>

          <FormItem label="状态" help="" {...formItemLayout}>
            {
              getFieldDecorator('authorOpenStatus', {
                rules: [{
                  required: true,
                  message: '状态不能为空',
                }],
                initialValue: lodash.get(this.props, 'selectedRows[0].useStatus', 1),
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

          <Scrollbars autoHide style={{ height: '30rem' }}>
            <Tree
              checkable
              defaultExpandAll
              onCheck={this.onCheck}
              checkedKeys={authorKeys || []}
            >
              <TreeNode title="平台权限" key="root">
                {this.renderTreeNodes(menuListDatas)}
              </TreeNode>
            </Tree>
          </Scrollbars>

        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(SetAuthorForm);
