
import lodash from 'lodash';
import { fetchUser } from '../services/example';

export default {

  namespace: 'userModel',

  state: {
    user: {}, // 用户信息
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

    },
  },

  effects: {
    *fetchUserInformation({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(fetchUser, payload);
      const user = lodash.get(result, 'data.users', {});
      yield put({
        type: 'save',
        payload: {
          user,
        },
      });
    },
    *setUserInformation({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          user: payload,
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
