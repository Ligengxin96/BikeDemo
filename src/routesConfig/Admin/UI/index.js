import Buttons from '../../../routes/Admin/UI/Buttons';
import Modals from '../../../routes/Admin/UI/Modals';
import Spins from '../../../routes/Admin/UI/Spins';
import GlobalMessage from '../../../routes/Admin/UI/GlobalMessage';
import Tab from '../../../routes/Admin/UI/Tab';
import Gallery from '../../../routes/Admin/UI/Gallery';
import Carousels from '../../../routes/Admin/UI/Carousels';

const prefix = '/admin/ui';

export default [
  {
    path: `${prefix}/buttons`,
    component: Buttons,
  },
  {
    path: `${prefix}/modals`,
    component: Modals,
  },
  {
    path: `${prefix}/loadings`,
    component: Spins,
  },
  {
    path: `${prefix}/notification`,
    component: GlobalMessage,
  },
  {
    path: `${prefix}/messages/:queryParams`,
    component: GlobalMessage,
  },
  {
    path: `${prefix}/tabs/:queryParams`,
    component: Tab,
  },
  {
    path: `${prefix}/gallery`,
    component: Gallery,
  },
  {
    path: `${prefix}/carousel`,
    component: Carousels,
  },
];
