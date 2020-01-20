import adminRoutes from './Admin';
import cityManageRoutes from './CityManage';
import orderManageRoutes from './OrderManage';

export default [
  ...adminRoutes, // admin部分路由
  ...cityManageRoutes, // city部分路由
  ...orderManageRoutes, // order部分路由
];
