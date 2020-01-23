import React, { Component } from 'react';
import lodash from 'lodash';
import { Button, message } from 'antd';
import MyModal from '../../../myComponents/myModal';
import OpenCityForm from './OpenCityForm';

class OpenCityBtn extends Component {
  state={
    visible: false,
  }

  // 弹框确认按钮事件
  handleOk = () => {
    const { reloadTable } = this.props;
    const { validateFieldsAndScroll } = this.openCityForm;
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

  // 开通城市按钮事件
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
      width: '25rem',
      title: '开通城市',
      visible,
      onOk: this.handleOk,
      onCancel: this.handleCloseModal,
    };
    return (
      <React.Fragment>
        <Button type="primary" onClick={this.handleOpenModal} style={{ marginBottom: '1rem' }}>开通城市</Button>
        <MyModal {...modalProps} >
          {/* 弹框内部组件 */}
          <OpenCityForm ref={(form) => { this.openCityForm = form; }} />
        </MyModal>
      </React.Fragment>
    );
  }
}
export default OpenCityBtn;
