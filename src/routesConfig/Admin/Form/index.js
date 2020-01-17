import LoginForm from '../../../routes/Admin/Forms/Login';
import RegisterForm from '../../../routes/Admin/Forms/Register';

const prefix = '/admin/form';

export default [
  {
    path: `${prefix}/login`,
    component: LoginForm,
  },
  {
    path: `${prefix}/register`,
    component: RegisterForm,
  },
];
