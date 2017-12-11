import App from './App';
import Login from './routes/Login';
import UserList from './routes/UserList';

export default [
  { path: '/', component: App },
  { path: '/login', component: Login },
  { path: '/user-list', component: UserList },
];
