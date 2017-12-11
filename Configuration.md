# Configuration for dva-vue project.

## Initialization

A basic dva-vue app is initialized with the following function.

```javascript
   const app = dva(opts);
```

`opts` is an Object includes:

- `routerConfig`: (**Object**, **default `{mode: 'history'}`**)  this is a [router construction options object](https://router.vuejs.org/en/api/options.html) for `vue-router-2`. Please refer to [the official documentation](https://router.vuejs.org/en/api/options.html) to use the router configuration.

```javascript
   // For example, a hash router
   const app = dva({
     routerConfig: { mode: 'hash' },
   })
```

- `middlewares`: (**Array of link functions**, **default `[]`**) the redux middlewares. you can add the middleware for development, a middleware should be a link function. for example, `redux-logger`, like vue-logger in vuex.

```javascript
    import { createLogger } from 'redux-logger'

    const app = dva({
      middlewares: [createLogger()],
    })
```

- `libs`: (**Array, without default value**). this will give a way to utilize the original `Vue.use`. The item of the array should be an object with configuration, or short for a library construct function. for Example, if you want to use element-ui globally.

```
    import ElementUI from 'element-ui';
    
    const app = dva({
      libs: [ElementUI]
    }); 
    // The other way:
    const app = dva({
      libs: [{
        library: ElementUI,
        config: {}
      }]
    });
   // Object:
   const lib1 = [{
     library: <library>,
     config: <config object>
   }]
   // same as Vue.use(library, config)
   // If the config can be omitted, you can write like,
   const lib1 = [<library>]
   // same as Vue.use(library)
```

- `globals`: (**Object, without default value**). This gives you ability to bind global variable to `Vue`, the same as `Vue.prototype.$<something>`. Be careful of the prefix `$`.

```javascript
    // should be something like
    const globals = {
      say: () => { console.log('say') },
      say2: 'THIS IS DVA-VUE GLOBAL',
    }
    // same as Vue.prototype.$say = () => { console.log('say') };
    // You could use this.$say in every Vue component.
``` 

- The dva original hooks are also supported. please read the [the dva-api official documentation](https://github.com/dvajs/dva/blob/master/docs/API.md) here.

## Model

```javascript
    app.model(model);
    // unregister model
    app.unmodel(namespace)
```

This is the same as dva in React. Reference [here](https://github.com/dvajs/dva/blob/master/docs/API.md#model)

## Start

```javascript
    app.start(selector);
```

## Router Middleware

dva-vue provide a router middleware, which can conduct router actions in the model.

the saga effect type is `vueDvaRouter`. payload is an Object.

- method: [Vue router methods](https://router.vuejs.org/en/api/router-instance.html#properties)
- args: parameters, written in array.

```javascript
    dispatch({
      type: 'vueDvaRouter',
      payload: {
        method: 'push',
        args: ['/login'],
      },
    });
```

## Subscriptions

> Subscription is used for subscribing data source, then trigger action by need, it is triggered **once** when app.start()

history is an Object with the vue-router injected inside. `history.router` is a **[vue-router instance](https://router.vuejs.org/en/api/router-instance.html)**. You can apply all of the guards, methods and properties for this instance. Also the history provides more information about router.

> **Note: [using guards method(beforeEach, beforeResolve, afterEach)](https://router.vuejs.org/en/api/router-instance.html#methods) method of  `history.router` in the subscriptions if you want global navigation guards.**

```
    subscriptions: {
        setup({ dispatch, history }) {
          // Here is the history.
          console.log(history);
        },
    },
```



