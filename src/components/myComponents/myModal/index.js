import React, { Component } from 'react';
import { Modal, Button } from 'antd';

class MyModal extends Component {
  constructor(props) {
    super(props);
    const { style, width } = props;
    const defaultWidth = width || 600;
    const defaultHeight = style && style.height ? style.height : '';
    const defaultTop = style && style.top ? style.top : '24px';
    this.state = {
      width: defaultWidth,
      height: defaultHeight,
      top: defaultTop,
    };
  }

  // 点击确认回调
  onOk = () => {
    const { onOk } = this.props;
    if (onOk) {
      onOk();
    }
  }

  // 点击取消按钮回调
  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel();
    }
  }

  // 每次弹框的时候都创建一个新的div
  getContainer = () => {
    const modalContent = document.getElementById('root');
    const div = document.createElement('div');
    modalContent.appendChild(div);
    return div;
  }

  renderFooter() {
    const { disabled = false, loading = false, onOk, okText, cancelText, onCancel } = this.props;
    return (
      <div style={{ textAlign: 'center' }}>
        { onOk && <Button type="primary" onClick={this.onOk} loading={loading} disabled={disabled}>{okText || '确 定'}</Button>}
        { onCancel && <Button onClick={this.onCancel}>{cancelText || '取 消'}</Button>}
      </div>
    );
  }

  render() {
    const { width, height, top } = this.state;
    const { className, style = {}, maskClosable = false, destroyOnClose = true, title, ...otherProps } = this.props;
    const modalProps = {
      className,
      style: Object.assign(style, { height, top }),
      getContainer: this.getContainer,
      title,
      maskClosable,
      destroyOnClose,
      footer: this.renderFooter(),
      // 上面的属性允许被props覆盖 => 取自己设置的props属性
      ...otherProps,
      // 下面的属性不允许更改
      onCancel: this.onCancel,
      width,
    };
    return (
      <Modal
        {...modalProps}
      />
    );
  }
}

export default MyModal;
