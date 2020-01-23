import React, { Component } from 'react';
import { Button, message } from 'antd';
import StaffDetailForm from './StaffDetailForm';
import MyModal from '../../../../myComponents/myModal';

class StaffDetailBtn extends Component {
  state={
    visible: false,
  }

  // 员工详情按钮事件
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
      width: '25rem',
      title: '员工详情',
      visible,
      onCancel: this.handleCloseModal,
      footer: null,
    };
    return (
      <React.Fragment>
        <Button onClick={() => this.handleOpenModal(selectedRows)}>员工详情</Button>
        <MyModal {...modalProps}>
          {/* 员工详情弹框内容 */}
          <StaffDetailForm selectedRows={selectedRows} />
        </MyModal>
      </React.Fragment>
    );
  }
}

export default StaffDetailBtn;
