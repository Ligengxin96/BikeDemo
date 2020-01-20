import Bar from '../../../routes/Admin/Echarts/Bar';
import Pie from '../../../routes/Admin/Echarts/Pie';
import Line from '../../../routes/Admin/Echarts/Line';

const prefix = '/admin/charts';

export default [
  {
    path: `${prefix}/bar`,
    component: Bar,
  },
  {
    path: `${prefix}/pie`,
    component: Pie,
  },
  {
    path: `${prefix}/line`,
    component: Line,
  },
];
