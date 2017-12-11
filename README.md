# dva-vue-boilerplate

- Vue.js project boilerplate with [dva-core](https://github.com/dvajs/dva/tree/master/packages/dva-core).
- Inspired by [dva-vue](https://github.com/Jetsly/dva-vue).
- This boilerplate is blank, initialized with a latest version vue-cli (`vue init webpack dva-vue-standrad`), integrated with dva core.

## Quick Start

- `git clone https://github.com/liu599/dva-vue-boilerplate.git` clone this project to your local disk.
- `cd dva-vue-standrad`, take 5 minutes to read the following rules, begin to build your project.

## About dva and dva-core.
  
[dva](https://github.com/dvajs/dva) is a great framework for React, which  re-structures initialState, reducer, saga, action together for redux and improve development experience.

[dva-core](https://github.com/dvajs/dva/tree/master/packages/dva-core) is a redux, redux-saga state management implementation, could be used as another state-management scheme for Vuejs project with [dva-vue](https://github.com/Jetsly/dva-vue) (compared with official *Vuex*).

## Write vue project with dva

> This article will lead you to create dva-vue-app quickly.

### Create your vue project

```bash
$ vue init webpack dva-vue-login-app
$ cd dva-vue-login-app
```

### Install the dva core and vue-router

```
$ npm install dva-vue-c dva-core vue-router -S
```

### Delete all the files in *src*, create the following blank files.

- **components**: basic Vue Component (shared)
- **models**: dva models (like in React)
- **routes**: route view (Vue Component)
- **services**: dva services (used to make api calls)
- **utils**: utility functions
- **main.js**: entry, for Vue-cli project.
- **router.js**: vue-routers, make it a folder if complicated. 

```
- src
    - /components 
    - /models
        - login.js
        - user.js
    - /routes
        - Login.vue
        - UserList.vue
    - /services
        - login.js
        - user.js
    - /utils
        - cache.js
        - request.js
        - index.js
    - main.js
    - router.js   
```

### Write dva entry file

In `main.js`,

```javascript

import dva from 'dva-vue-c';
import router from './router';


// #1: Initialization
const app = dva();

// #2: Models
app.model(require('../models/login'));
app.model(require('../models/user'));

// #3: Router
app.router(() => router);

// #4: Start
app.start('#app');

```

### Write models and services

Here our login scheme is:

- the user trigger a login action - an ajax call with username and password to get the token from the remote server.
- the user store the token.
- router change to the user-list view.
- make another ajax call with token (authorization), get a user list data stored to show in the next page.

Write a fake request function(in the real world we will use axios or fetch) in `./utils/request.js`:

```javascript
    export default (url, params) => {
        if (url === '/login') {
            return Promise.resolve({
                success: true,
                token: '3e5559ed50cfd254b2158a1bd0e12a37'
            });
        } else if (url === '/users' && parmas.token) {
            return Promise.resolve({
                success: true,
                data: [
                    {id: 1, name: 'Oba'},
                    {id: 2, name: 'Obb'},
                    {id: 3, name: 'Obc'},
                    {id: 4, name: 'Obd'},
                ],
            });
        }
    }
```

Write a cache function to store token in `./utils/cache`

```javascript
    const KEY = 'SOME_KEY';
    const storage = {};    

    const setToken = (token) => {
        storage[KEY] = token;
    }
    
    const getToken = () => {
        return storage[KEY];
    }
    
    export default {
        setToken,
        getToken,
    }
```

Export all the utils functions in the `./utils/index`

```javascript
    import cache from './cache';
    import request from './request';
    
    export {
        cache,
        request,
    }
```

Write a login service in `./services/login`(make api all):

```javascript
    import utils from '../utils';

    export async function login() {
        const url = '/login';
        return utils.request(url);
    }
```

Write a user service in `./services/user`

```javascript
    import utils from '../utils';

    export async function getUsers(params) {
        const url = '/user';
        return utils.request(url, params);
    }
```

Write a login model in `./models/login`:

```javascript
    import { login } from '../services/login';
    import utils from '../utils';
    
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
            yield call(utils.cache.setToken, data.token);
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
            // Here is a history listener like in the React.
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
``` 

Write a user model in `./models/user`:

```javascript
    export default {
      namespace: 'user',
      state: {
        list: [],
      },
      reducers: {
        add(state, { payload: data }) {
          const list = data.data;
          return {
            ...state,
            list,
          };
        },
      },
      effects: {
        * fetchUsers({ payload }, { put, call, fork }) {
          const { data } = yield call(usersGetAll, payload);
          if (data.success) {
            yield put({ type: 'add', payload: data });
          }
        }
      },
      subscriptions: {
        setup({ dispatch, history }) {
          // history.router is a vue-router, more APIs can be used here.
          // Please refer to the official vue-router documents.  
          history.router.beforeEach((to, from, next) => {
            console.log(to, from, 'user');
            if (to.path === '/index/user-list') {
              dispatch({
                type: 'fetchUsers',
                payload: defaultSearchParameter,
              });
            }
            next();
          });
        },
      },
    };
```

### Write vue components connected with dva

connect the dva-model to vue component with `dva-vue/connect` , dispatch actions in the component.

Write a view component in `./routes/Login.vue`,

```
    <template>
      <div>
        <h3>USER:</h3>
        <input v-model="form.username" type="text" />
        <h3>PASSWORD:</h3>
        <input v-model="form.password" type="password" />
        <button @click="login">Submit</button>
      </div>
    </template>
    <script type="text/ecmascript-6">
        import { connect } from 'dva-vue-c';
        
        export default connect()({
            data() {
                return {
                    form: {
                        username: '',
                        password: '',
                    }
                }
            },
            methods: {
                login() {
                    this.dispatch({
                        type: 'login/login',
                        payload: {
                          username: this.form.username.replace(/\s+/, ''),
                          password: this.form.password,
                        },
                    })
                }
            }
        });
    </script>
    <style lang="css" scoped>
        h3 {
            color: red;
        }
    </style>
```

In the user Component, we could use some function like mapStateToProps in React to connect the store to the component.

In `./routes/User.vue`,

```
    <template>
        <ul>
            <li v-for="(user, index) in list" key="index" v-html="user.name"></li>
        </ul>
    </template>
    <script type="text/ecmascript-6">
        import { connect } from 'dva-vue-c';
                
        export default connect(({ list }) => ({ list }))({
            data() {
                return {}
            },
        })
    </script>
```

### Write Routers

The [dva-vue](https://github.com/Jetsly/dva-vue) integrates the official vue-router.

In `./router`

```
    import Login from './routes/Login.vue';
    import UserList from './routes/UserList.vue';

    export default [
       { path: '/', component: Login },
       { path: '/user-list', component: UserList }
    ];
```

### Customize

Integrated with Element-ui, global variables, more configuration for vue-router, middlewares, dynamic routers, see this article.

## License

None
