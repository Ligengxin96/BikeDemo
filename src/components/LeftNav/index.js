import React, { Component } from 'react';
import lodash from 'lodash';
import { NavLink } from 'react-router-dom';
import { Menu, Row, Col } from 'antd';
import menuListDatas from '../../assets/config/menuConfig';
import './index.less';

const { SubMenu } = Menu;

class LeftNav extends Component {
  state={
    theme: 'light', // 菜单主题颜色 'light' 或者 'dark'
    mode: 'vertical', // 菜单类型 antd支持三种类型: 垂直: vertical | 水平: horizontal | 内嵌: inline
    rootSubmenuKeys: [], // 菜单数据
    openKeys: [], // 当前展开的菜单
    current: ['/home'], // 当前选中的菜单
  }

  UNSAFE_componentWillMount() {
    const rootSubmenuKeys = [];
    menuListDatas.forEach((item) => {
      const { key, children } = item;
      if (children) {
        rootSubmenuKeys.push(key);
      }
    });
    const menuNode = this.renderMenu(menuListDatas);
    this.setState({ menuNode, rootSubmenuKeys });
  }

  // 点击图标文字改变菜单类型
  changeMenuMode = (oldMode) => {
    const mode = oldMode === 'vertical' ? 'inline' : 'vertical';
    this.setState({ mode });
  }

  // 点击MyBike文字改变主题
  changeMenuTheme = (oldTheme) => {
    const { dispatch } = this.props;
    const theme = oldTheme === 'light' ? 'dark' : 'light';
    this.setState({ theme });
    dispatch({
      type: 'leftNavModel/getMenuTheme',
      payload: theme,
    });
  }

  // 菜单展开回调
  onOpenChange = (openKey) => {
    const { openKeys, rootSubmenuKeys } = this.state;
    const latestOpenKey = openKey.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys: openKey });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  // 菜单点击回调
  handleClick = (e) => {
    const { dispatch } = this.props;
    const url = lodash.get(e, 'key', '/home');
    const title = lodash.get(e, 'item.props.title', '首页');
    const menuTitle = {
      url,
      title,
    };
    // 如果点击了首页 收起别的展开菜单 不然样式有点难看
    if (e.key === '/home') {
      this.setState({
        openKeys: [],
      });
    }
    this.setState({
      current: e.key,
    });
    dispatch({
      type: 'leftNavModel/getMenuTitle',
      payload: menuTitle,
    });
  }

  // // 动态渲染菜单数据 感觉可行 但是点击菜单报错  Menu.item => 纠正 Menu.Item 就应该不会报错了
  // renderMenu = () => {
  //   const subMenuAry = [];
  //   let menu = null;
  //   menuListDatas.forEach((element) => {
  //     const { title, key, children = [] } = element;
  //     menu = (
  //       <SubMenu
  //         key={key}
  //         title={title}
  //       />
  //     );
  //     const menuItemAry = [];
  //     if (children.length > 0) {
  //       children.forEach((inner) => {
  //         let menuItem = null;
  //         const { title: childrenTitle, key: childreKey } = inner;
  //         menuItem = (
  //           <Menu.Item key={childreKey}>{childrenTitle}</Menu.Item>
  //         );
  //         menuItemAry.push(menuItem);
  //       });
  //       menu = (
  //         <SubMenu
  //           key={key}
  //           title={title}
  //         >
  //           { menuItemAry.map((item) => { return item; }) }
  //         </SubMenu>
  //       );
  //     }
  //     subMenuAry.push(menu);
  //   });
  //   this.setState({ subMenuAry });
  // }

  // 动态渲染菜单数据
  renderMenu = (menuDatas) => {
    return menuDatas.map((element) => {
      const { title, key, children } = element;
      if (children) {
        return (
          <SubMenu key={key} title={title}>
            { this.renderMenu(children) }
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={title} key={key}><NavLink to={key}>{title}</NavLink></Menu.Item> //  Menu.Item 写成了 Menu.item 大小写问题 导致一直报错
      );
    });
  }

  render() {
    const { menuNode, openKeys, theme, mode, current } = this.state;
    return (
      <Row>
        <Col span={6} onClick={() => this.changeMenuMode(mode)}>
          <img src="assets/logo-ant.svg" style={{ width: '4rem', padding: '1rem 0 0 1rem' }} alt="" />
        </Col>
        <Col span={12} onClick={() => this.changeMenuTheme(theme)}>
          <h1 style={{ color: '#25c1ff', padding: '1rem', cursor: 'pointer' }}>MyBike</h1>
        </Col>
        <Col span={24}>
          <Menu
            className="my-menu"
            mode={mode}
            theme={theme}
            openKeys={openKeys}
            selectedKeys={current}
            onClick={this.handleClick}
            onOpenChange={this.onOpenChange}
          >
            {menuNode}
          </Menu>
        </Col>
      </Row>
    );
  }
}

export default LeftNav;
