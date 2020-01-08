import React, { Component } from 'react';
import { Card, Button, Modal, message } from 'antd';
import MyModal from '../../../myComponents/myModal';
import styles from '../../../../style/common.less';

class Modals extends Component {
  state={
    visible: false, // 自己封装的弹框
    visible1: false, // 基础弹框
    visible2: false, // 自定义页脚弹窗
    visible3: false, // 距离顶部20px弹窗
    visible4: false, // 水平垂直居中弹窗
  }

  // 弹框确认按钮点击事件
  handleOk = (visible) => {
    this.setState({ [visible]: false });
  }

  // 弹框取消按钮点击事件
  handleCancel = (visible) => {
    this.setState({ [visible]: false });
  }

  // 打开弹框
  handleShowModal = (visible) => {
    this.setState({ [visible]: true });
  }

  // 提示框展示函数
  handleConfirm = (visible, title) => {
    Modal[visible]({
      title,
      content: '一堆提示框',
      // 个人习惯 交换下确认按钮和取消按钮的位置
      cancelText: '确定',
      okText: '取消',
      cancelButtonProps: { type: 'primary' },
      okButtonProps: { type: '' },
      onOk() {
        message.info('点击了取消按钮');
      },
      onCancel() {
        message.info('点击了确认按钮');
      },
    });
  }

  render() {
    const { visible, visible1, visible2, visible3, visible4 } = this.state;
    const modalProps = { // 个人喜好,封装的弹框确认和取消按钮水平居中的
      title: '自己封装的弹框组件',
      visible,
      onOk: () => this.handleOk('visible'),
      onCancel: () => this.handleCancel('visible'),
    };
    const modalProps1 = {
      title: '基础弹窗',
      visible: visible1,
      onOk: () => this.handleOk('visible1'),
      onCancel: () => this.handleCancel('visible1'),
    };
    const modalProps2 = {
      title: '自定义页脚弹窗',
      visible: visible2,
      okText: '确定',
      cancelText: '取消',
      onOk: () => this.handleOk('visible2'),
      onCancel: () => this.handleCancel('visible2'),
    };
    const modalProps3 = {
      title: '距离顶部20px弹窗',
      style: { top: 20 },
      visible: visible3,
      onOk: () => this.handleOk('visible3'),
      onCancel: () => this.handleCancel('visible3'),
    };
    const modalProps4 = {
      title: '水平垂直居中弹窗',
      centered: true, // 默认好像水平居中, 所以只需要设置 centered就ok了
      visible: visible4,
      onOk: () => this.handleOk('visible4'),
      onCancel: () => this.handleCancel('visible4'),
    };
    return (
      <React.Fragment>
        <div>
          <Card title="基础模态框" className={styles.myCard}>
            <div className={styles.btnList}>
              <Button type="primary" onClick={() => this.handleShowModal('visible1')}>基础弹窗</Button>
              <Button type="primary" onClick={() => this.handleShowModal('visible2')}>自定义页脚弹窗</Button>
              <Button type="primary" onClick={() => this.handleShowModal('visible3')}>距离顶部20px弹窗</Button>
              <Button type="primary" onClick={() => this.handleShowModal('visible4')}>水平垂直居中弹窗</Button>
              <Button type="danger" onClick={() => this.handleShowModal('visible')}>自己封装的弹窗组件</Button>
            </div>
          </Card>
          <Card title="信息确认框" className={styles.myCard}>
            <div className={styles.btnList}>
              <Button type="primary" onClick={() => this.handleConfirm('confirm', '确认框')}>Confirm</Button>
              <Button type="primary" onClick={() => this.handleConfirm('info', '普通提升框')}>Info</Button>
              <Button type="primary" onClick={() => this.handleConfirm('success', '成功提升框')}>Success</Button>
              <Button type="primary" onClick={() => this.handleConfirm('warning', '警告提升框')}>Warning</Button>
            </div>
          </Card>
        </div>
        <Modal {...modalProps1}>基础弹窗</Modal>
        <Modal {...modalProps2}>基础弹窗</Modal>
        <Modal {...modalProps3}>基础弹窗</Modal>
        <Modal {...modalProps4}>基础弹窗</Modal>
        <MyModal {...modalProps}>确认和取消按钮居中显示</MyModal>
      </React.Fragment>
    );
  }
}

export default Modals;
