import OrderDetail from '../../../routes/Common/OrderDetail';

const prefix = '/common';

export default [
  {
    path: `${prefix}/orderDetail/:orderId`,
    component: OrderDetail,
  },
];
