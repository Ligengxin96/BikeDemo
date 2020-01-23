import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Router, Route, Switch, Redirect } from 'dva/router';
import routes from './routesConfig';
import App from './App';
import Admin from './admin';
import Login from './routes/Login';
import Home from './routes/Content';
import NoFound from './components/ErrorPages/404';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <ConfigProvider locale={zhCN}>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/admin"
              render={() => {
                return (
                  <Admin>
                    <Route path="/admin/home" component={Home} />
                    <Switch>
                      {
                        routes.map((item) => {
                          return <Route path={item.path} component={item.component} />;
                        })
                      }
                      <Redirect to="/admin/home" />
                    </Switch>
                  </Admin>
                );
              }}
            />
            <Route component={NoFound} />
          </Switch>
        </App>
      </ConfigProvider>
    </Router>
  );
}

export default RouterConfig;
