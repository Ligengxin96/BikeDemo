
import { fetchUser } from '../services/example';

export default {

  namespace: 'user',

  state: {
    users: {}, // 用户信息
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetchUser({ payload }, { call, put }) {  // eslint-disable-line
      const result = yield call(fetchUser, payload);
      const { data = {} } = result;
      if (data) {
        yield put({
          type: 'save',
          payload: data,
        });
      }
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
