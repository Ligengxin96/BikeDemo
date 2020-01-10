/* eslint-disable no-unused-vars */
import React from 'react';
import lodash from 'lodash';
import { Link, Route, Switch, Redirect } from 'dva/router';
import { Card, Tabs, message, Icon } from 'antd';
import TabPane1 from './TabPanes/TabPane1';
import TabPane2 from './TabPanes/TabPane2';
import TabPane3 from './TabPanes/TabPane3';
import styles from '../../../../style/common.less';

const TabPane = Tabs.TabPane;

class Tab extends React.Component {
  state={
    tabPanes: [], // 可编辑tabs页的tabPanes数据
    activeKey: '1', // 可编辑tabs页展开tabPanes的key
    newTabIndex: 0, // 可编辑tabs页的新Tab key值
  }

  UNSAFE_componentWillMount() {
    const tabPanes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1',
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2',
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3',
      },
    ];
    this.setState({
      tabPanes,
      activeKey: lodash.get(tabPanes, '[0].key', '1'),
      newTabIndex: lodash.get(tabPanes, 'length', 0),
    });
  }

  // 普通tab页切换回调
  handleTabChange = (key) => {
    message.info(`切换到了：Tab ${key}`);
  }

  // 可编辑tab页切换回调
  handleEditableTabChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  }

  /**
   * tabPanes删除和添加的时候回调
   * @param {object} targetKey 固定写法
   * @param {string} action 'add' 或者 'remove'两种取值
   */
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  // onEdit事件中的添加函数
  add = () => {
    const { newTabIndex, tabPanes } = this.state;
    const activeKey = (newTabIndex + 1).toString();
    tabPanes.push({ title: `newTab ${activeKey}`, content: 'New Tab Pane', key: activeKey });
    this.setState({
      tabPanes,
      activeKey,
      newTabIndex: newTabIndex + 1,
    });
  }

  // onEdit事件中的删除函数
  remove = (targetKey) => {
    let { activeKey } = this.state;
    const { tabPanes } = this.state;
    let lastIndex;
    tabPanes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const afterFilterPanes = tabPanes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = afterFilterPanes[lastIndex].key;
    }
    this.setState({
      activeKey,
      tabPanes: afterFilterPanes,
    });
  }

  render() {
    const { path, rootPath } = this.props;
    const routePathes = [`${rootPath}/tab1`, `${rootPath}/tab2`, `${rootPath}/tab3`];
    const urlTabActiveKey = path.replace('/ui/tabs/', '');
    const { activeKey, tabPanes } = this.state;
    return (
      <div>
        <Card title="Tab页签" className={styles.myCard}>
          <Tabs onChange={this.handleTabChange}>
            <TabPane tab="Tab 1" key="1"><p style={{ fontSize: '1.2rem' }}>My Project</p></TabPane>
            <TabPane tab="Tab 2" key="2" ><p style={{ fontSize: '1.2rem' }}>My Demo</p></TabPane>
            <TabPane tab="Tab 3" key="3"><p style={{ fontSize: '1.2rem' }}>My Style</p></TabPane>
            <TabPane tab="Tab 4" key="4" disabled>disabled</TabPane>
            <TabPane tab="Tab 5" key="5"><p style={{ fontSize: '1.2rem' }}>React is awesome</p></TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图标的页签" className={styles.myCard}>
          <Tabs onChange={this.handleTabChange}>
            <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1"><p style={{ fontSize: '1.2rem' }}>我的工程</p></TabPane>
            <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2"><p style={{ fontSize: '1.2rem' }}>我的项目</p></TabPane>
            <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3"><p style={{ fontSize: '1.2rem' }}>我的风格</p></TabPane>
          </Tabs>
        </Card>
        <Card title="可编辑的Tab页签" className={styles.myCard}>
          <Tabs onChange={this.handleEditableTabChange} activeKey={activeKey} type="editable-card" onEdit={this.onEdit} >
            {
              tabPanes.map((panel) => {
                return (
                  <TabPane
                    tab={panel.title}
                    key={panel.key}
                  >
                    {panel.content}
                  </TabPane>);
              })
            }
          </Tabs>
        </Card>
        <Card title="Tab切换路由变换且组件替换" className={styles.myCard}>
          <Tabs activeKey={urlTabActiveKey} className={styles.myTab}>
            <TabPane tab={<Link to={routePathes[0]} replace={path === routePathes[0]} style={{ display: 'block' }}><span>点击Tab页签</span></Link>} key="tab1" />
            <TabPane tab={<Link to={routePathes[1]} replace={path === routePathes[1]} style={{ display: 'block' }}><span>才会打开</span></Link>} key="tab2" />
            <TabPane tab={<Link to={routePathes[2]} replace={path === routePathes[2]} style={{ display: 'block' }}><span>页面内容</span></Link>} key="tab3" />
          </Tabs>
          <Switch>
            <Route path={routePathes[0]} exact render={() => (<TabPane1 path={path} />)} />
            <Route path={routePathes[1]} exact render={() => (<TabPane2 path={path} />)} />
            <Route path={routePathes[2]} exact render={() => (<TabPane3 path={path} />)} />
            {/* 设计成点击才会展示Tab页面里的内容 */}
            {/* <Redirect path={routePathes[0]} /> */}
          </Switch>
        </Card>
      </div>
    );
  }
}

export default Tab;
