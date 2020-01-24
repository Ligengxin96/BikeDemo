import React, { Component } from 'react';
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
    message.success('操作成功');
    // 关闭弹窗
    this.setState({ visible: false });
    // 刷新列表
    if (reloadTable) {
      reloadTable();
    }
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
      width: '45rem',
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
          <SetRoleAuthorForm selectedRows={selectedRows} />
        </MyModal>
      </React.Fragment>
    );
  }
}

export default SetRoleAuthorBtn;
