import React, { Component } from 'react';
import lodash from 'lodash';
import { Button, message } from 'antd';
import SetRoleAuthorForm from './SetRoleAuthorForm';
import MyModal from '../../../../myComponents/myModal';

class SetRoleAuthorBtn extends Component {
  state={
    visible: false,
  }

  // 弹框确认按钮事件
  handleOk = () => {
    const { reloadTable } = this.props;
    const { validateFieldsAndScroll } = this.setRoleAuthorForm;
    validateFieldsAndScroll((error) => {
      if (error) {
        const key = Object.keys(error);
        key.forEach((item, index) => {
          if (index < 1) { // 只提示第一个错误
            const { message: errorInfo } = lodash.get(error, `${item}.errors[0]`, '');
            message.info(errorInfo);
          }
        });
      } else {
        message.success('添加成功');
        // 最后关闭弹窗
        this.setState({ visible: false });
        // 刷新列表
        if (reloadTable) {
          reloadTable(1);
        }
      }
    });
  }

  // 用户授权按钮点击事件
  handleOpenModal = (selectedRows) => {
    if (selectedRows.length > 0) {
      this.setState({ visible: true });
    } else {
      message.info('请选择一个角色');
    }
  }

  // 关闭弹框
  handleCloseModal = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const { selectedRows } = this.props;
    const modalProps = {
      width: '35rem',
      title: '用户授权',
      visible,
      onOk: this.handleOk,
      onCancel: this.handleCloseModal,
    };
    return (
      <React.Fragment>
        <Button type="primary" onClick={() => this.handleOpenModal(selectedRows)}>用户授权</Button>
        <MyModal {...modalProps}>
          {/* 用户授权弹框内容 */}
          <SetRoleAuthorForm ref={(form) => { this.setRoleAuthorForm = form; }} />
        </MyModal>
      </React.Fragment>
    );
  }
}

export default SetRoleAuthorBtn;
