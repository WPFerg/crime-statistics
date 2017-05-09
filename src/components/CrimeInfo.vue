<template>
  <div class="crime-info">
    <h3>{{title}}</h3>
    <h4>{{this.data.length}} total</h4>

    <ul>
      <li class="breakdown" v-for="(count, status) in resolutions">
        {{status}}: {{count}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'crime-info',
  props: {
    data: { type: Array },
    title: { type: String }
  },
  data() {
    return {
      resolutions: []
    };
  },
  created() {
    this.aggregateData()
  },
  beforeUpdate() {
    this.aggregateData();
  },
  methods: {
    aggregateData() {
      this.resolutions = this.data.reduce((reducer, d) => {
        const category = d.outcome_status && d.outcome_status.category;
        const status = category || 'No Status';
        if (!reducer[status]) {
          reducer[status] = 0;
        }

        reducer[status]++;
        return reducer;
      }, {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .crime-info {
    display: inline-block;
    min-width: 100px;
    width: 100%;
    max-width: 33.3%;
    vertical-align: top;
  }

  ul {
    text-align: left;
  }
</style>
