<template>
  <div class="summary-card">
    <h3>{{title}}</h3>
    <h4>{{subtitle}}</h4>
  </div>
</template>

<script>
export default {
  name: 'summary-card',
  props: {
    title: { type: String },
    subtitle: { type: String }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .summary-card {
    display: inline-block;
    min-width: 100px;
    width: 100%;
    max-width: 20%;
  }
</style>
