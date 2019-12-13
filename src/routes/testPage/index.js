const prefix = '/testPage';
export default [
  {
    path: `${prefix}/`,
    models: () => [import('../../models/testPage/test1')],
    component: () => import('../../components/testPage/test1'),
  },
];
