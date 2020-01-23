import StaffManage from '../../../routes/Admin/StaffManage';

const prefix = '/admin';

export default [
  {
    path: `${prefix}/staffManage`,
    component: StaffManage,
  },
];
