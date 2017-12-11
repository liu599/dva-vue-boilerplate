import login from '../services/login';
import { cache } from '../utils';

export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
    * login({ payload }, { put, call, fork }) {
      const data = yield call(login, payload);
      // THIS IS FOR YOUR DEBUGGING, SEE THE DATA
      yield call(console.log, data);
      if (data.success) {
        yield call(cache.setToken, data.token);
        // THIS SHOWS HOW TO USE ROUTER IN A SAGA-GENERATOR
        // USE NATIVE VUE-ROUTER API DEFINED IN METHOD
        yield put({
          type: 'vueDvaRouter',
          payload: {
            method: 'push',
            args: ['/user-list'],
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // Here is a history redirect.
      console.log(history);
      if (history.current.path === '/') {
        dispatch({
          type: 'vueDvaRouter',
          payload: {
            method: 'push',
            args: ['/login'],
          },
        });
      }
    },
  },
};
