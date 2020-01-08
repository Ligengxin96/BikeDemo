import React, { Component } from 'react';
import { Card, Button, notification, message } from 'antd';
import styles from '../../../../style/common.less';

const messageTypeAry = ['success', 'info', 'warning', 'error']; // 消息提醒类型
const positionTypeAry = ['topLeft', 'bottomLeft', 'topRight', 'bottomRight']; // 消息提醒位置

class GlobalMessage extends Component {
  constructor() {
    super();
    const timer = setInterval(this.randomNum, 5000);
    this.state = {
      timer, // 定时器
      randomNum: null, // 上次产生随机数
    };
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer); // 记得清理定时器
  }

  /**
   * 获取0-3的随机数, 并且确保两次连续的随机数不相同,然后打开消息提醒
   */
  randomNum = () => {
    const { randomNum } = this.state;
    const messageTypeAryIndex = Math.floor(Math.random() * 4); // 随机0-3的数字
    const positionTypeAryIndex = Math.floor(Math.random() * 4); // 随机0-3的数字
    if (randomNum === messageTypeAryIndex) { // 如果相同说明和上次的一样
      this.randomNum(); // 在随机一次看是不是还一样
    } else { // 不一样了就保存下 这个数字, 和下次的随机数对比
      this.setState({ randomNum: messageTypeAryIndex });
      this.openNotification(messageTypeAry[messageTypeAryIndex], positionTypeAry[positionTypeAryIndex]);
    }
  }

  /**
   * 获取消息提醒的描述
   * @param type 消息提醒类型
   */
  getDescription = (type) => {
    let description = '';
    if (type === 'success') {
      description = '学会了还是要学啊';
    }
    if (type === 'info') {
      description = '今天学习任务要完成哦';
    }
    if (type === 'warning') {
      description = '别偷懒赶紧学';
    }
    if (type === 'error') {
      description = '只要学不死就往死里学';
    }
    if (type === 'loading') {
      description = '学习中,勿扰';
    }
    return description;
  }

  /**
   * 弹出消息提醒框
   * @param type 消息提醒类型
   * @param direction 消息提醒的位置
   */
  openNotification = (type, direction) => {
    if (direction) {
      // antd提供了一个全局配置方法 在调用前提前配置，全局一次生效
      notification.config({
        placement: direction,
      });
    }
    notification[type]({
      message: type === 'error' ? '起来继续学' : '该学习了',
      description: this.getDescription(type),
    });
  }

  /**
   * 弹出全局消息提醒
   * @param type 消息提醒类型
   */
  showMessage = (type) => {
    message[type](this.getDescription(type));
  }

  render() {
    return (
      <div>
        <Card title="通知提醒框" className={styles.myCard}>
          <div className={styles.btnList}>
            <Button type="primary" onClick={() => this.openNotification('success')}>学习</Button>
            <Button type="primary" onClick={() => this.openNotification('info')}>使</Button>
            <Button type="primary" onClick={() => this.openNotification('warning')}>我</Button>
            <Button type="primary" onClick={() => this.openNotification('error')}>快乐</Button>
          </div>
        </Card>
        <Card title="通知提醒框" className={styles.myCard}>
          <div className={styles.btnList}>
            <Button type="primary" onClick={() => this.openNotification('success', 'topLeft')}>根本</Button>
            <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>停</Button>
            <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>不</Button>
            <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>下来</Button>
          </div>
        </Card>
        <Card title="全局提示框" className={styles.myCard}>
          <div className={styles.btnList}>
            <Button type="primary" onClick={() => this.showMessage('success')}>不</Button>
            <Button type="primary" onClick={() => this.showMessage('info')}>学习</Button>
            <Button type="primary" onClick={() => this.showMessage('warning')}>是</Button>
            <Button type="primary" onClick={() => this.showMessage('error')}>不行</Button>
            <Button type="primary" onClick={() => this.showMessage('loading')}>的</Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default GlobalMessage;
