import React, { Component } from 'react';
import lodash from 'lodash';
import { Button, message } from 'antd';
import CreateStaffForm from './CreateStaffForm';
import MyModal from '../../../../myComponents/myModal';

class CreateStaffBtn extends Component {
  state={
    visible: false,
  }

  // 弹框确认按钮事件
  handleOk = () => {
    const { reloadTable } = this.props;
    const { validateFieldsAndScroll } = this.createStaffForm;
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

  // 员创建员工按钮点击事件
  handleOpenModal = () => {
    this.setState({ visible: true });
  }

  // 关闭弹框
  handleCloseModal = () => {
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    const modalProps = {
      width: '35rem',
      title: '新增员工',
      visible,
      onOk: this.handleOk,
      onCancel: this.handleCloseModal,
    };
    return (
      <React.Fragment>
        <Button type="primary" onClick={this.handleOpenModal}>创建员工</Button>
        <MyModal {...modalProps}>
          {/* 新增员工弹框内容 */}
          <CreateStaffForm ref={(form) => { this.createStaffForm = form; }} />
        </MyModal>
      </React.Fragment>
    );
  }
}

export default CreateStaffBtn;
