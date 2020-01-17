import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form } from 'antd';
import styles from './index.less';

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;

    this.setState({ editing }, () => {
      if (editing) {
        this.Input.focus();
      }
    });
  };

  save = (e) => {
    const { record, handleSave } = this.props;

    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form) => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;

    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} 不能为空`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input
          // eslint-disable-next-line no-return-assign
          ref={node => (this.Input = node)}
          min={0}
          onPressEnter={this.save}
          onBlur={this.save}
          style={{ width: '10rem' }}
        />)}
      </Form.Item>
    ) : (
      <div
        className={styles.edit}
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class EditableTable extends React.Component {
  handleSave = (row) => {
    const { handleUpdate } = this.props;
    if (handleUpdate && typeof handleUpdate === 'function') {
      handleUpdate(row, 2);
    }
  };

  handleDelete = (id) => {
    const { handleUpdate } = this.props;
    if (handleUpdate && typeof handleUpdate === 'function') {
      handleUpdate(id, 1);
    }
  };


  render() {
    const { columns: thisColumns, dataSource = [] } = this.props;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    let columns = [];
    if (thisColumns) {
      columns = this.props.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      });
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          (dataSource.length >= 1 ? (
            <Popconfirm title="确定删除这行数据?" onConfirm={() => this.handleDelete(record.id)}>
              <a style={{ color: '#40a9ff' }}>删除</a>
            </Popconfirm>
          ) : null),
      });
    }


    return (
      <div>
        <Table
          components={components}
          rowClassName={() => `${styles.edit}`}
          {...this.props}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;
