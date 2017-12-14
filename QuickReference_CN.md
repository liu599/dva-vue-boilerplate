## 快速问答 Q&A

- dva-vue用来解决的问题
    - 是一个状态管理方案
    - 将数据逻辑统一起来, 使代码简洁开发更高效, 更适合于多人协作
    - 使用redux数据流使得状态可控, 易于测试和追踪
    - 使用generator函数使异步处理同步化
    
- Vue 组件中如何引用state

```javascript
    // user是model的一个namespace
    // this.user就是你的数据啦。
    import { connect } from 'dva-vue-c';

    export default connect(({ user }) => ({ user }))({
        data() {
            return {}
        }
    })
```
- Vue 组件中如何发出动作
```javascript
    // dispatch, type不可省略, 格式<namespace>/<saga name>
    import { connect } from 'dva-vue-c';

    export default connect(({ user }) => ({ user }))({
        data() {
            return {}
        },
        methods: {
            temp() {
                this.dispatch({type: 'login/login', payload: data})
            },
        }
    })
```
- saga function(* generator)如何写, 函数的意义
    saga函数利用了ES6的generator(迭代器), 使用yield简洁的表达异步过程。
    - **Call**: 与JS原生的Call用法一样, call(函数, 参数), 如果返回的是一个Promise对象, 迭代器会暂停直到Promise Resolve, 可以像例子一样拿到数据再进一步操作
    - **Fork**: 无阻塞调用, 调用函数不影响其他函数的执行
    - **Put**: 调用reducer, type标识也是`<namespace>/<reducer>`这样的格式, 可以省略namespace, 那么系统默认找同一namespace下的reducer
     
```javascript
      * login({ payload }, { put, call, fork }) {
        const data = yield call(login, payload);
        // 查看data
        yield call(console.log, data);
        // 拿到data再做一些事情
      } 
```

- saga function中做vue-router路由跳转

    method与vue-router官方的方法相同, 默认中间件Type为`vueDvaRouter`。
```javascript
      yield put({
        type: 'vueDvaRouter',
        payload: {
          method: 'push',
          args: ['/user-list'],
        },
      });
```
    
- reducer怎么写
```javascript
    (state, action) => newState 
    [(state, action) => newState, enhancer]
    // 可以使用析构赋值简化第二个参数
```

- 全局Loading
    参考dvajs官方教程, 这里会进一步补充
- 全局错误处理
```javascript
    // 初始化时官方提供了onError钩子
    const app = dva({
        onError: () => {}
    })
```
- 全局变量定义
```javascript
    // 初始化时提供globals选项
    const app = dva({
        globals: {
            someGlobal: 'App'
        }
    })
    // 然后在Vue组件中可以使用this.$someGlobal调用
```
- 使用Hash路由, 路由配置
```javascript
    // 初始化时提供vue-router配置
    const app = dva({
        routerConfig: {
            mode: 'hash'
        }
    })
    // 然后在Vue组件中可以使用this.$someGlobal调用
```
- 动态路由
    使用dynamic函数, 补充中。
- 全局和局部路由监听
```javascript
    // model的subscriptions
    subscriptions: {
        setup({ dispatch, history }) {
          // history.router vue-router对象
          // 查看官方的路由守卫等方法即可
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
```    
- 如何使用Element-ui
```javascript
    // 初始化时Vue.use配置
    import ElementUI from 'element-ui';
        
    const app = dva({
      libs: [ElementUI]
    }); 
    // 就可以全局使用了。
```
- 如何使用redux中间件, 比如redux-logger
```javascript
    import { createLogger } from 'redux-logger'

    const app = dva({
      middlewares: [createLogger()],
    })
```