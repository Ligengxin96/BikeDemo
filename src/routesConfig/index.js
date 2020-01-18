import adminRoutes from './Admin';
import cityManageRoutes from './CityManage';

export default [
  ...adminRoutes, // admin部分路由
  ...cityManageRoutes, // city部分路由
];
