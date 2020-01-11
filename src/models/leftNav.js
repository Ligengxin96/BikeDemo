
export default {

  namespace: 'leftNavModel',

  state: {
    menuTitle: {
      url: '/home',
      title: '首页',
    },
    menuTheme: 'light', // 菜单主题
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
    *getMenuTheme({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          menuTheme: payload,
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

