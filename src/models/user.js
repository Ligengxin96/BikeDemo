
import lodash from 'lodash';
import { fetchUser } from '../services/example';

export default {

  namespace: 'userModel',

  state: {
    user: {}, // 用户信息
    registerInfo: {}, // 注册的用户信息保存下
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

    },
  },

  effects: {
    *fetchUserInformation({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(fetchUser, payload);
      const user = lodash.get(result, 'data.users', {});
      if (Object.keys(user).length !== 0) {
        yield put({
          type: 'save',
          payload: {
            user,
          },
        });
        // 登录后给给权限
        yield put({
          type: 'globalModel/login',
          payload: 1,
        });
      }
    },
    *setUserInformation({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          user: payload,
        },
      });
    },
    *setRegisterInfo({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          registerInfo: payload,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
