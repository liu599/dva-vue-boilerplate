<template>
  <ul>
    <li v-for="(user, index) in user.list" :key="index" v-html="user.name"></li>
  </ul>
</template>

<script>
  import { connect } from 'dva-vue-c';

  export default connect(user => user)({
    data() {
      return {};
    },
  });
</script>

<style scoped>

</style>
