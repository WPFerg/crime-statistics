<template>
  <div class="hello">
    <div v-if="!$store.state.retrievingData">
      <div class="summary">
        <summary-card :title="crimeCount" :subtitle="'crimes committed in a 1 mile radius (last month)'" />
      </div>
      <div class="doughnut-chart">
        <doughnut-chart :data="$store.state.crime" :accessor="getCategory" />
        <doughnut-chart :data="$store.state.crime" :accessor="getLocation" />
        <doughnut-chart :data="$store.state.crime" :accessor="getOutcome" />
      </div>
      <div class="crimes-breakdown">
        <crime-info :title="type" :data="data" v-for="(data, type) in $store.getters.crimeByType" :key="type" />
      </div>
    </div>
    <div v-else>
      Loading data...
    </div>
  </div>
</template>

<script>
import { RETRIEVE_CRIME_DATA } from '../store/constants';

export default {
  name: 'hello',
  props: {
    postcode: { type: String }
  },
  created() {
    this.retrieveData();
  },
  computed: {
    crimeCount() {
      return this.$store.state.crime.length.toLocaleString();
    }
  },
  methods: {
    retrieveData() {
      this.$store.dispatch(RETRIEVE_CRIME_DATA, this.postcode);
    },

    getCategory(d) {
      return d.category;
    },

    getLocation(d) {
      return d.location.street.name;
    },

    getOutcome(d) {
      return d.outcome_status ? d.outcome_status.category : 'No Outcome';
    }
  },
  watch: {
    postcode() {
      this.retrieveData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
