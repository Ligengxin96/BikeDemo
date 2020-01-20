import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd';
import styles from '../../../../style/common.less';

class Buttons extends Component {
  state={
    loading: true,
    size: 'default',
  }

  // 关闭加载
  handleChangeLoading=() => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  // 改变按钮大小
  handleButtonSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  render() {
    const { size, loading } = this.state;
    return (
      <div>
        <Card title="基础按钮" className={styles.myCard}>
          <div className={styles.btnList}>
            <Button type="primary">Primary</Button>
            <Button>Normal</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
            <Button type="link">Link</Button>
          </div>
        </Card>
        <Card title="图形按钮" className={styles.myCard}>
          <div className={styles.btnList}>
            <Button icon="plus">创建</Button>
            <Button icon="edit">编辑</Button>
            <Button icon="delete">删除</Button>
            <Button shape="circle" icon="search" />
            <Button type="primary" icon="search">搜索</Button>
            <Button type="primary" icon="download">下载</Button>
          </div>
        </Card>
        <Card title="Loading按钮" className={styles.myCard}>
          <div className={styles.btnList}>
            <Button type="primary" loading={loading}>确定</Button>
            <Button type="primary" shape="circle" loading={loading} />
            <Button loading={loading} >点击加载</Button>
            <Button shape="circle" loading={loading} />
            <Button type="primary" onClick={this.handleChangeLoading}>{loading ? '停止加载' : '开始加载' }</Button>
          </div>
        </Card>
        <Card title="按钮组" className={styles.myCard}>
          <Button.Group>
            <Button type="primary" icon="left">返回</Button>
            <Button type="primary" icon="right">前进</Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className={styles.myCard}>
          <div className={styles.btnList}>
            <Radio.Group value={size} onChange={this.handleButtonSizeChange}>
              <Radio value="small">小</Radio>
              <Radio value="default">中</Radio>
              <Radio value="large">大</Radio>
            </Radio.Group>
            <Button type="primary" size={size}>Primary</Button>
            <Button size={size}>Normal</Button>
            <Button type="dashed" size={size}>Dashed</Button>
            <Button type="danger" size={size}>Danger</Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default Buttons;
