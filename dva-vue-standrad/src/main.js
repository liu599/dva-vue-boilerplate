import dva from 'dva-vue-c';
import App from './App.vue';

const app = dva();
app.model({
  namespace: 'count',
  state: 0,
  reducers: {
    add(state, { payload }) { return state + payload; },
  },
});
app.router(() => [{ path: '/', component: App }]);
app.start('#app');
