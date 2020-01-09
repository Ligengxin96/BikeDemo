
export default {

  namespace: 'leftNavModel',

  state: {
    menuTitle: {
      url: '/home',
      title: '首页',
    },
  },

  subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
      *getMenuTitle({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          menuTitle: payload,
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

