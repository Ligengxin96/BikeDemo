import React, { Component } from 'react';
import { Card, Spin, Alert, Icon } from 'antd';
import styles from '../../../../style/common.less';

class Spins extends Component {
  state = {
    loading: true,
    loading1: false,
    loading2: true,
  }

  // 这里loading2和loading3如果共用一个函数会发生很有意思的事情
  cancelLoading = (value) => {
    setTimeout(() => {
      this.setState({
        [value]: !this.state[value],
      });
    }, 5000);
  }

  render() {
    const { loading, loading1, loading2 } = this.state;
    return (
      <React.Fragment>
        <div className={styles.myDivList}>
          <Card title="Spin用法" className={styles.myCard}>
            <div className={styles.myDivListRight}>
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </div>
          </Card>
          <Card title="内容遮罩" className={styles.myCard}>
            <div className={styles.myDivListBottom}>
              <Spin spinning={loading1}>
                <Alert
                  message={<p onClick={() => { this.setState({ loading1: !loading1 }, () => this.cancelLoading('loading1')); }}>这是info标题</p>}
                  description={<p onClick={() => { this.setState({ loading1: !loading1 }, () => this.cancelLoading('loading1')); }}>点击这里可以转圈圈</p>}
                  type="info"
                />
              </Spin>
              {/* 原loading2 */}
              <Spin spinning={loading2}>
                <Alert
                  message="这是warning标题"
                  description={<p onClick={this.cancelLoading('loading2')}>5秒后这里会{loading2 ? '取消' : '继续'}转圈圈</p>}
                  type="warning"
                />
              </Spin>
              {/* 原loading3 */}
              <Spin spinning={!loading2} tip="Loading...">
                <Alert
                  message="这是加文字提示Loading"
                  description={<p>5秒后这里会{!loading2 ? '取消' : '继续'}转圈圈</p>}
                  type={!loading2 ? 'info' : 'success'}
                />
              </Spin>
              <Spin spinning={loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} tip="Loading...">
                <Alert
                  message="这是自定义Loading图标"
                  description="这里会一直转圈圈"
                  type="error"
                />
              </Spin>
            </div>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default Spins;
