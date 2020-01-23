import uiRoutes from './UI';
import formRoutes from './Form';
import tableRoutes from './Table';
import richTextRoutes from './RichText';
import echartsRoutes from './Echarts';
import cityManageRoutes from './CityManage';
import orderManageRoutes from './OrderManage';


export default [
  ...uiRoutes, // ui部分路由
  ...formRoutes, // form部分路由
  ...tableRoutes, // 表格部分路由
  ...richTextRoutes, // 富文本部分路由
  ...echartsRoutes, // 图表部分路由
  ...cityManageRoutes, // city部分路由
  ...orderManageRoutes, // order部分路由
];
