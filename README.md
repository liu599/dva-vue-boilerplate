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
    - /routes
        - Login.vue
    - /services
        - login.js
    - /utils
        - request.js
    - main.js
    - router.js   
```



### Write dva entry file

In `main.js`,

```

import dva from 'dva-vue-c';
import Login from '../routes/Login.vue';

// #1: Initialization
const app = dva();

// #2: Model
app.model(require('../models/login'));

// #3: Router
app.router(require('./router'));

// #4: Start
app.start('#app');

```

### Write a login model

Here our login scheme is:

- the user trigger a login action - an ajax call with username and password to get the token from the remote server.
- the user store the token in the session storage.
- router change to the user-list view.
- make another ajax call with token (authorization), get a user list data stored to show in the next page.


### Write the vue component connected with dva-vue

use the method connect, we could easily connect the dva-model to vue component, so that you can easily dispatch actions, use data in the component.

### Write Routers

The [dva-vue](https://github.com/Jetsly/dva-vue) integrates the official vue-router.

### Customize

Integrated with Element-ui, global variables, more configuration for vue-router, middlewares.

## License

None
