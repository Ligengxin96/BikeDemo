import menuListDatas from '../assets/config/menuConfig';

export default {

  namespace: 'leftNavModel',

  state: {
    menuTitle: {
      url: '/home',
      title: '首页',
    },
    menuTheme: 'dark', // 菜单主题
  },


  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      const findCurrentUrlTitle = (datas) => {
        const menuTitle = {};
        datas.forEach((item) => {
          const { title, key, children } = item;
          if (children) {
            return findCurrentUrlTitle(children);
          }
          if (history.location.pathname === key) {
            menuTitle.url = key;
            menuTitle.title = title;
            dispatch({
              type: 'getMenuTitle',
              payload: menuTitle,
            });
          }
        });
      };
      findCurrentUrlTitle(menuListDatas);
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

