import React, { Component } from 'react';
import { Button, message } from 'antd';
import SetAuthorForm from './SetAuthorForm';
import MyModal from '../../../../myComponents/myModal';

class SetAuthorBtn extends Component {
  state={
    visible: false,
  }

  // 设置权限按钮点击事件
  handleOpenModal = (selectedRows) => {
    if (selectedRows.length > 0) {
      this.setState({ visible: true });
    } else {
      message.info('请选择一个员工');
    }
  }

  // 关闭弹框
  handleCloseModal = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const { selectedRows = [] } = this.props;
    const modalProps = {
      width: '35rem',
      title: '设置权限',
      visible,
      onCancel: this.handleCloseModal,
      footer: null,
    };
    return (
      <React.Fragment>
        <Button type="primary" onClick={() => this.handleOpenModal(selectedRows)}>设置权限</Button>
        <MyModal {...modalProps}>
          {/* 设置权限弹框内容 */}
          <SetAuthorForm selectedRows={selectedRows} />
        </MyModal>
      </React.Fragment>
    );
  }
}

export default SetAuthorBtn;
