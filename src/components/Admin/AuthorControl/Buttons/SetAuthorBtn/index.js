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
      message.info('请选择一个角色');
    }
  }

  // 弹框确认按钮点击事件
  handleOk = () => {
    message.info('操作成功');
    this.setState({ visible: false });
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
      onOk: this.handleOk,
      onCancel: this.handleCloseModal,
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
