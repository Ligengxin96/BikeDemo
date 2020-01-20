const Base64 = require('js-base64').Base64;

const menuList = [
  {
    title: '首页',
    key: '/home',
  },
  {
    title: 'UI',
    key: '/admin/ui',
    children: [
      {
        title: '按钮',
        key: '/admin/ui/buttons',
      },
      {
        title: '弹框',
        key: '/admin/ui/modals',
      },
      {
        title: 'Loading',
        key: '/admin/ui/loadings',
      },
      {
        title: '通知提醒',
        key: '/admin/ui/notification',
      },
      {
        title: '全局Message',
        key: `/admin/ui/messages/${Base64.encode(JSON.stringify({ showHide: true }))}`,
      },
      {
        title: 'Tab页签',
        key: '/admin/ui/tabs/tab',
      },
      {
        title: '图片画廊',
        key: '/admin/ui/gallery',
      },
      {
        title: '轮播图',
        key: '/admin/ui/carousel',
      },
    ],
  },
  {
    title: '表单',
    key: '/admin/form',
    children: [
      {
        title: '登录',
        key: '/admin/form/login',
      },
      {
        title: '注册',
        key: '/admin/form/register',
      },
    ],
  },
  {
    title: '表格',
    key: '/admin/table',
    children: [
      {
        title: '基础表格',
        key: '/admin/table/basic',
      },
      {
        title: '高级表格',
        key: '/admin/table/advanced',
      },
    ],
  },
  {
    title: '富文本',
    key: '/admin/richText',
  },
  {
    title: '城市管理',
    key: '/cityManage',
  },
  {
    title: '订单管理',
    key: '/orderManage',
    btnList: [
      {
        title: '订单详情',
        key: 'detail',
      },
      {
        title: '结束订单',
        key: 'finish',
      },
    ],
  },
  {
    title: '员工管理',
    key: '/user',
  },
  {
    title: '车辆地图',
    key: '/bikeMap',
  },
  {
    title: '图表',
    key: '/admin/charts',
    children: [
      {
        title: '柱形图',
        key: '/admin/charts/bar',
      },
      {
        title: '饼图',
        key: '/admin/charts/pie',
      },
      {
        title: '折线图',
        key: '/admin/charts/line',
      },
    ],
  },
  {
    title: '权限设置',
    key: '/permission',
  },
];
export default menuList;
