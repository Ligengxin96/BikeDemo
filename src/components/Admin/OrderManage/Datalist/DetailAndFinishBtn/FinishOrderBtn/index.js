import React, { Component } from 'react';
import { Button, message } from 'antd';
import FinishOrderForm from './FinishOrderForm';
import MyModal from '../../../../../myComponents/myModal';
import { fetchOperationStatus } from '../../../../../../services/common';

class FinishOrderBtn extends Component {
  state={
    visible: false,
  }

  // 弹框确认按钮事件
  handleOk = () => {
    fetchOperationStatus({}).then((response) => {
      const { code = 0, note = '' } = response;
      if (code > 0) {
        message.success(note);
      }
      const { reloadTable } = this.props;
      // 最后关闭弹窗
      this.setState({ visible: false });
      // 刷新列表
      if (reloadTable) {
        reloadTable();
      }
    }).catch((error) => {
      message.error(error);
    });
  }

  // 结束订单按钮点击事件
  handleOpenModal = (selectedRows) => {
    if (selectedRows.length > 0) {
      this.setState({ visible: true });
    } else {
      message.info('请选择一个订单');
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
      title: '结束订单',
      visible,
      onOk: this.handleOk,
      okText: '确认结束订单',
      onCancel: this.handleCloseModal,
    };
    return (
      <React.Fragment>
        <Button type="danger" onClick={() => this.handleOpenModal(selectedRows)}>结束订单</Button>
        <MyModal {...modalProps}>
          {/* 结束订单弹框内容 */}
          <FinishOrderForm selectedRows={selectedRows} />
        </MyModal>
      </React.Fragment>
    );
  }
}

export default FinishOrderBtn;
