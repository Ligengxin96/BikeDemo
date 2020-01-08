import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import App from './App';
import Admin from './admin';
import Login from './components/Login';
import Home from './components/Content';
import Buttons from './components/Admin/UI/Buttons';
import Modals from './components/Admin/UI/Modals';
import Spins from './components/Admin/UI/Spins';
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
                    <Route path="/ui/buttons" component={Buttons} />
                    <Route path="/ui/modals" component={Modals} />
                    <Route path="/ui/loadings" component={Spins} />
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
