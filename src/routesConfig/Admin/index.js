import uiRoutes from './UI';
import formRoutes from './Form';
import tableRoutes from './Table';

export default [
  ...uiRoutes, // ui部分路由
  ...formRoutes, // form部分路由
  ...tableRoutes, // 表格部分路由
];
