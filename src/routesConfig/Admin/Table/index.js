import BasicTable from '../../../routes/Admin/Tables/BasicTable';
import AdvancedTable from '../../../routes/Admin/Tables/AdvancedTable';


const prefix = '/admin/table';

export default [
  {
    path: `${prefix}/basic`,
    component: BasicTable,
  },
  {
    path: `${prefix}/advanced`,
    component: AdvancedTable,
  },
];
