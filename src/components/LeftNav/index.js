import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Row, Col } from 'antd';
import menuListDatas from '../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;

class LeftNav extends Component {
  state={
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

  // 菜单展开回调
  onOpenChange = (openKey) => {
    const { openKeys, rootSubmenuKeys } = this.state;
    const latestOpenKey = openKey.find((key) => openKeys.indexOf(key) === -1);
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
    const { getMenuTitle } = this.props;
    const { item: { props: { children = '' } } } = e;
    this.setState({
      current: e.key,
    });
    if (getMenuTitle && typeof getMenuTitle === 'function') {
      getMenuTitle(children);
    }
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
    const { menuNode, openKeys, current } = this.state;
    return (
      <Row>
        <Col span={6}>
          <img src="assets/logo-ant.svg" style={{ width: '4rem', padding: '1rem 0 0 1rem' }} alt="" />
        </Col>
        <Col span={12}>
          <h1 style={{ color: '#25c1ff', padding: '1rem' }}>MyBike</h1>
        </Col>
        <Menu
          className="my-menu"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={current}
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}
        >
          {menuNode}
        </Menu>
      </Row>
    );
  }
}

export default LeftNav;
