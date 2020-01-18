import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {

  namespace: 'globalModel',

  state: {
    hasAuth: 0, // 用户是否登录 0.否 | 1.是
    dictionary: { // 数据字典(没有接口...只能自己写死)
      status: [{
        ibm: 1,
        note: '咸鱼',
      }, {
        ibm: 2,
        note: '菜鸡',
      }, {
        ibm: 3,
        note: '努力奋斗',
      }, {
        ibm: 4,
        note: '技术巅峰',
      }, {
        ibm: 5,
        note: '创业者',
      }],
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        const ignorePath = ['/admin/form/register', '/admin/form/login'];
        if (!ignorePath.includes(pathname)) {
          dispatch({ type: 'checkAuth' }); // 每次访问新路由的时候,检查用户信息是否过期
        }
      });
    },
  },

  effects: {
    *login({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          hasAuth: payload,
        },
      });
    },
    *logout({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          hasAuth: 0,
        },
      });
    },
    *checkAuth({ dispatch, payload }, { select, call, put }) {  // eslint-disable-line
      const hasAuth = yield select(state => state.globalModel.hasAuth);
      if (hasAuth !== 1) {
        message.info('别切来切去了, 先登录');
        yield put(routerRedux.push('/admin/form/login'));
      }
      // 目前还没想好具体怎么实现,因为注册表单还在改进
      // 先保留下思路, 注册的时候吧注册的用户信息放在userModel里面, 然后跳转到登录页面
      // 然后登录后把用户信息放在sessionStorage(不过本地项目的话应该没有session这个概念,干脆放在localStorage,每次都要注册,覆盖掉老的)里面
      // 登出的时候清空掉userModel和Storage里的数据
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

