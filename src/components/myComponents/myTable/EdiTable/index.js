import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form } from 'antd';

// Cloumns 里面需要设置为编辑的列需要添加 editable = true 属性
const EditableContext = React.createContext();

class EditableCell extends Component {
  getInput = () => {
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `${title}不能为空!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

// eslint-disable-next-line react/no-multi-comp
class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = { editingKey: '' };
    this.state = { deletingKey: '' };
  }

  isEditing = record => record.id === this.state.editingKey;
  isDeleting = record => record.id === this.state.deletingKey;

  editCancel = () => {
    this.setState({ editingKey: '' });
  };
  deleteCancel = () => {
    this.setState({ deletingKey: '' });
  };

  save(form, record) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const { handleUpdate } = this.props;
      if (handleUpdate && typeof handleUpdate === 'function') {
        handleUpdate(Object.assign({}, record, row), 2);
      }
    });
    this.setState({ editingKey: '' });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  delete(id) {
    const { handleUpdate } = this.props;
    if (handleUpdate && typeof handleUpdate === 'function') {
      handleUpdate(id, 1);
    }
  }

  render() {
    const { columns: thisColumns } = this.props;
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    let columns = [];
    if (thisColumns) {
      columns = thisColumns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({ // 往上面EditableCell组件传props应该是在这里(没试过 以为有这个需求,但是后来否定了)
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record)}
                    style={{ marginRight: 8, color: '#54a9df' }}
                  >
                      保存
                  </a>
                  )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消?" onConfirm={() => this.editCancel(record.id)}>
                <a
                  style={{ marginRight: 8, color: '#54a9df' }}
                >
                    取消
                </a>
              </Popconfirm>
            </span>
          ) : (
            <React.Fragment>
              <React.Fragment>
                <a style={{ color: '#54a9df', marginRight: 8 }} onClick={() => this.edit(record.id)}>
                    编辑
                </a>
                <Popconfirm title="确定删除这一行数据?" onConfirm={() => this.delete(record.id)}>
                  <a
                    style={{ marginRight: 8, color: '#54a9df' }}
                  >
                      删除
                  </a>
                </Popconfirm>
              </React.Fragment>
            </React.Fragment>
          );
        },
      });
    }

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          {...this.props}
          components={components}
          columns={columns}
        />
      </EditableContext.Provider>
    );
  }
}

export default Form.create()(EditableTable);

