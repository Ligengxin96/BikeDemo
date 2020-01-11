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
                    <Route path="/ui/notification" component={GlobalMessage} />
                    <Route path="/ui/messages/:queryParams" component={GlobalMessage} />
                    <Route path="/ui/tabs/:queryParams" component={Tab} />
                    <Route path="/ui/gallery" component={Gallery} />
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
