import React, { Component } from 'react';
import lodash from 'lodash';
import difference from 'lodash/difference';
import { Form, Input, Transfer, Table, message } from 'antd';
import { getDictionary } from '../../../../../../utils/common';
import { fetchStaff } from '../../../../../../services/staff';

const FormItem = Form.Item;

/**
 * TableTransfer 把表格封装进穿梭框 实现分页
 */
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSearch showSelectAll={false}>
    {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          const columns = direction === 'left' ? leftColumns : rightColumns;

          const rowSelection = {
            getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows
                .filter(item => !item.disabled)
                .map(({ key }) => key);
              const diffKeys = selected
                ? difference(treeSelectedKeys, listSelectedKeys)
                : difference(listSelectedKeys, treeSelectedKeys);
              onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }, selected) {
              onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
          };

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              style={{ pointerEvents: listDisabled ? 'none' : null }}
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) return;
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
            />
          );
        }}
  </Transfer>
);

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
  filterOption = (inputValue, option) => option.username.indexOf(inputValue) > -1;

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
    const tableColumns = [
      {
        dataIndex: 'username',
        title: '姓名',
      },
    ];
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
            <TableTransfer
              showSearch
              dataSource={dataSource}
              titles={['待选用户', '已选用户']}
              searchPlaceholder="输入用户名"
              filterOption={this.filterOption}
              targetKeys={targetKeys}
              onChange={this.handleChange}
              leftColumns={tableColumns}
              rightColumns={tableColumns}
              listStyle={{ height: '35rem' }}
            />
          </FormItem>

        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create()(SetRoleAuthorForm);
