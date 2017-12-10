<template>
  <div>
    <h1>Vue Dvajs Example</h1>
    <div>count: {{count}}</div>
    <button @click="add">Add</button>
  </div>
</template>
<script>
  import { connect } from 'dva-vue-c';

  export default connect(({ count }) => ({ count }))({
    methods: {
      add() {
        console.log(1);
        this.dispatch({ type: 'count/add', payload: 1 });
      },
    },
  });
</script>
