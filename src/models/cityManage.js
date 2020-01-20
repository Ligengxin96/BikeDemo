
export default {

  namespace: 'cityManageModel',

  state: {
    searchFormValue: {}, // 搜索栏的查询条件
  },

  subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
      *getSearchFormValue({ payload }, { call, put }) {  // eslint-disable-line
      yield put({
        type: 'save',
        payload: {
          searchFormValue: payload,
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

