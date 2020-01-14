import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import App from './App';
import Admin from './admin';
import Login from './routes/Login';
import Home from './routes/Content';
import Buttons from './routes/Admin/UI/Buttons';
import Modals from './routes/Admin/UI/Modals';
import Spins from './routes/Admin/UI/Spins';
import GlobalMessage from './routes/Admin/UI/GlobalMessage';
import Tab from './routes/Admin/UI/Tab';
import Gallery from './routes/Admin/UI/Gallery';
import Carousels from './routes/Admin/UI/Carousels';
import LoginForm from './routes/Admin/Forms/Login';
import RegisterForm from './routes/Admin/Forms/Register';
import NoFound from './components/ErrorPages/404';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={() => {
              return (
                <Admin>
                  <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/admin/ui/buttons" component={Buttons} />
                    <Route path="/admin/ui/modals" component={Modals} />
                    <Route path="/admin/ui/loadings" component={Spins} />
                    <Route path="/admin/ui/notification" component={GlobalMessage} />
                    <Route path="/admin/ui/messages/:queryParams" component={GlobalMessage} />
                    <Route path="/admin/ui/tabs/:queryParams" component={Tab} />
                    <Route path="/admin/ui/gallery" component={Gallery} />
                    <Route path="/admin/ui/carousel" component={Carousels} />
                    <Route path="/admin/form/login" component={LoginForm} />
                    <Route path="/admin/form/register" component={RegisterForm} />
                    <Redirect to="/home" />
                  </Switch>
                </Admin>
              );
            }}
          />
          <Route component={NoFound} />
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
