import uiRoutes from './UI';
import formRoutes from './Form';
import tableRoutes from './Table';
import richTextRoutes from './RichText';

export default [
  ...uiRoutes, // ui部分路由
  ...formRoutes, // form部分路由
  ...tableRoutes, // 表格部分路由
  ...richTextRoutes, // 富文本部分路由
];
