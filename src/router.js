import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Router, Route, Switch, Redirect } from 'dva/router';
import adminRoutes from './routesConfig/Admin';
import commonRoutes from './routesConfig/Common';
import App from './App';
import Admin from './admin';
import Login from './routes/Login';
import Home from './routes/Content';
import Common from './routes/Common';
import NoFound from './components/ErrorPages/404';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <ConfigProvider locale={zhCN}>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            {/* admin 路由部分 */}
            <Route
              path="/admin"
              render={() => {
                return (
                  <Admin>
                    <Route path="/admin/home" component={Home} />
                    <Switch>
                      {
                        adminRoutes.map((item) => {
                          return <Route path={item.path} component={item.component} />;
                        })
                      }
                      <Redirect to="/admin/home" />
                    </Switch>
                  </Admin>
                );
              }}
            />
            {/* 详情页 路由部分 */}
            <Route
              path="/common"
              render={() => {
                return (
                  <Common>
                    <Switch>
                      {
                        commonRoutes.map((item) => {
                          return <Route path={item.path} component={item.component} />;
                        })
                      }
                    </Switch>
                  </Common>
                );
              }}
            />
            {/* 异常路由404 */}
            <Route component={NoFound} />
          </Switch>
        </App>
      </ConfigProvider>
    </Router>
  );
}

export default RouterConfig;
