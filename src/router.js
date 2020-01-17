import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Router, Route, Switch, Redirect } from 'dva/router';
import uiRoutes from './routesConfig/Admin/UI';
import formRoutes from './routesConfig/Admin/Form';
import tableRoutes from './routesConfig/Admin/Table';
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
              path="/"
              render={() => {
                return (
                  <Admin>
                    <Switch>
                      <Route path="/home" component={Home} />
                      {/* UI部分路由 */}
                      {
                        uiRoutes.map((item) => {
                          return <Route path={item.path} component={item.component} />;
                        })
                      }
                      {/* Form部分路由 */}
                      {
                        formRoutes.map((item) => {
                          return <Route path={item.path} component={item.component} />;
                        })
                      }
                      {/* Table部分路由 */}
                      {
                        tableRoutes.map((item) => {
                          return <Route path={item.path} component={item.component} />;
                        })
                      }
                      <Redirect to="/home" />
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
