import dva from 'dva-vue-c';
import router from './router';
import loginModel from './models/login';
import userModel from './models/user';

// #1: Initialization
const app = dva();

// #2: Models
app.model(loginModel);
app.model(userModel);

// #3: Router
app.router(() => router);

// #4: Start
app.start('#app');

console.log(app);
