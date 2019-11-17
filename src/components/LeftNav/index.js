import React, { Component } from 'react';
import { Menu, Row, Col } from 'antd';
import menuListDatas from '../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;

class LeftNav extends Component {
  componentWillMount() {
    const menuNode = this.renderMenu(menuListDatas);
    this.setState({ menuNode });
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
        <Menu.Item title={title} key={key}>{title}</Menu.Item> //  Menu.Item 写成了 Menu.item 大小写问题 导致一直报错
      );
    });
  }

  render() {
    const { menuNode } = this.state;
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
        >
          {menuNode}
        </Menu>
      </Row>
    );
  }
}

export default LeftNav;
