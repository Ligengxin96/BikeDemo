
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
    *fetchUser({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(fetchUser, payload);
      const user = lodash.get(result, 'data.users', {});
      yield put({
        type: 'save',
        payload: user,
      });
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, user: action.payload };
    },
  },

};
