import OrderManage from '../../../routes/Admin/OrderManage';

const prefix = '/admin';

export default [
  {
    path: `${prefix}/orderManage`,
    component: OrderManage,
  },
];
