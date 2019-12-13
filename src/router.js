import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Content';
import Buttons from './components/Admin/UI/Buttons';
import Admin from './admin';
import NoFound from './components/ErrorPages/404';
import App from './App';

class MyRouter extends Component {
  render() {
    return (
      <HashRouter>
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
      </HashRouter>
    );
  }
}

export default MyRouter;
