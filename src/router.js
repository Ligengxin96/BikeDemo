import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Login from './components/Login';
import Home from './components/Content';
import Buttons from './components/Admin/UI/Buttons';
import Admin from './admin';
import NoFound from './components/ErrorPages/404';
import App from './App';

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
