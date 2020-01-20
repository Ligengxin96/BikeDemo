import React, { Component } from 'react';
import { Table, Checkbox } from 'antd';

/**
 * 跨页全选表格的3种状态
 * 1.全选 selectedAll: true, selectedRowKeys(selectedRows): []
 * 2.全选后反勾选 selectedAll: true, selectedRowKeys: [...](被取消勾选的值)
 * 3.单勾选 selectedAll: false, selectedRowKeys: [...](被勾选的值)
 *
 * 思路:
 * 1.不给antd的Table传rowSelection,然后我们自己自定义一列checkBox
 * 2.给title的checkBox绑定全选事件,给表格内的绑定单选事件
 * 3.通过上面的3种状态来区分,所有全选后selectedRowKeys会是空的，只是设置了checked=true
 * 4.在未全选的情况下或者全选反勾选后,把title的全选checkBox的样式改变下
 */
class CrossPageSelectTable extends Component {
  // 获取rowKey对应的每条数据的值
  rowKeyValue = (record) => {
    const { rowKey = 'id' } = this.props; // 默认为id
    return record[rowKey]; // 返回自定义的rowKey
  }

  // 选中某一行的
  handleSelect = (event, value) => {
    const { checked: selected } = event.target; // 选中或者取消选中 的状态 true || false
    const { dataSource = [], rowSelection: { selectedAll, selectedRowKeys = [] } } = this.props;

    const selectedRows = []; // 选中的每一行数据(obj)
    let currentSelectedRowKeys = selectedRowKeys; // 当前选中的selectedRowKeys

    // (勾选了全选 && 选中该项 || 未勾选全选 && 取消勾选该项)
    if ((selectedAll && selected) || (!selectedAll && !selected)) {
      // 将selectedRowKeys(selectedRows)中的该项去掉
      currentSelectedRowKeys = selectedRowKeys.filter(item => item !== value);
    }

    // (勾选了全选 && 选中该项 || 未勾选全选 && 勾选该项) 后需要在selectedRowKeys中加上该项
    if ((selectedAll && !selected) || (!selectedAll && selected)) {
      currentSelectedRowKeys.push(value);
    }

    // 获取所有 选中或者取消选中 的一行记录
    dataSource.forEach((item) => {
      const key = this.rowKeyValue(item);
      if (currentSelectedRowKeys.includes(key)) {
        selectedRows.push(item);
      }
    });

    // 判断是否是一条一条选择数据到全选状态
    if (JSON.stringify(selectedRows) === JSON.stringify(dataSource)) {
      this.handleSelectChange([], [], true);
    } else {
      this.handleSelectChange(currentSelectedRowKeys, selectedRows, selectedAll);
    }
  }

  // 点击全选
  handleSelectAll = (event) => {
    const { checked: selected } = event.target; // 全选或者取消全选 的状态 true || false
    // 全选或者取消全选都把selectedRowKeys(selectedRows)清空掉
    this.handleSelectChange([], [], selected);
  }

  // 表格选择状态改变
  handleSelectChange(selectedRowKeys, selectedRows, selectedAll) {
    const { rowSelection: { onChange } } = this.props;
    if (onChange) {
      onChange(selectedRowKeys, selectedRows, selectedAll);
    }
  }

  render() {
    const { rowSelection = {}, rowKey = 'id', columns, dataSource, ...otherProps } = this.props;
    const { crossPageSelect = true, type = 'checkbox' } = rowSelection;
    const finalColumns = [];
    let needCrossPageSelectTable = crossPageSelect;

    // 没有rowSelection && 不需要跨页全选 && 没数据 && type不是checkbox (那就不展示CheckBox)
    if (rowSelection && crossPageSelect && dataSource.length > 0 && type === 'checkbox') {
      needCrossPageSelectTable = false;
      const { selectedAll, selectedRowKeys = [] } = rowSelection;

      const _this = this;
      // 添加一列用于渲染checkbox选择框
      finalColumns[0] = {
        width: '2rem', // 这个原本设置了1rem 会导致在设置了scroll属性后第一列数据被挡住
        fixed: true, // 把选择框列固定在左边
        title: <Checkbox
          indeterminate={selectedRowKeys.length > 0} // 全选或者非全选样式，全选的话是填满状态，为全选是半满状态
          checked={selectedAll}
          onChange={_this.handleSelectAll} // 表头的checkBox 绑定全选事件
        />,
        dataIndex: 'checkbox',
        key: 'checkbox',
        render(val, record) {
          const value = _this.rowKeyValue(record);
          return (
            <Checkbox
              value={value}
              checked={(selectedAll && !selectedRowKeys.includes(value)) || (!selectedAll && selectedRowKeys.includes(value))}
              onChange={event => _this.handleSelect(event, value)} // 表格里面的checkBox 绑定单选事件
            />
          );
        },
      };
    }

    // 将其它列放到finalColumns中(如果crossPageSelect不存在就和普通表格没区别, 即 finalColumns = columns)
    finalColumns.push(...columns);

    return (
      <Table
        {...otherProps}
        rowKey={rowKey}
        columns={finalColumns}
        dataSource={dataSource}
        rowSelection={needCrossPageSelectTable ? rowSelection : null} // 跨页全选就不需要传rowSelection, 其他的就需要
      />
    );
  }
}

export default CrossPageSelectTable;
