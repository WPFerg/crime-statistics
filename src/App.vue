<template>
  <div id="app">
    <input v-model="inputValue" @keyup.enter="startSearch" placeholder="Postcode" />
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    startSearch() {
      this.$router.push('/' + this.inputValue);
      this.inputValue = '';
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
