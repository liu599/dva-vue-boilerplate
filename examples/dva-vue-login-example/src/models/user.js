import { cache } from '../utils';
import getUsers from '../services/user';

export default {
  namespace: 'user',
  state: {
    list: [],
  },
  reducers: {
    add(state, { payload: list }) {
      return {
        list,
      };
    },
  },
  effects: {
    * fetchUsers({ payload }, { put, call, fork }) {
      const response = yield call(getUsers, { token: cache.getToken() });
      if (response.success) {
        yield put({ type: 'add', payload: response.data });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // history.router is a vue-router, more APIs can be used here.
      // Please refer to the official vue-router documents.
      history.router.beforeEach((to, from, next) => {
        console.log(to, from, 'user');
        if (to.path === '/user-list') {
          dispatch({
            type: 'fetchUsers',
          });
        }
        next();
      });
    },
  },
};
