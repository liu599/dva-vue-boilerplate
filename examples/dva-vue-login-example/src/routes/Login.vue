<template>
  <div>
    <h3>USERNAME:</h3>
    <input title="username" v-model="form.username" type="text" />
    <h3>PASSWORD:</h3>
    <input title="password" v-model="form.password" type="password" />
    <div>
      <button @click="login">Submit</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { connect } from 'dva-vue-c';

  export default connect()({
    name: 'login',
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      login() {
        this.dispatch({
          type: 'login/login',
          payload: {
            username: this.form.username.replace(/\s+/, ''),
            password: this.form.password,
          },
        });
      },
    },
  });
</script>

<style lang="css" scoped>
  h3 {
    color: red;
  }
</style>
