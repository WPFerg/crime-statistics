// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';

import CrimeInfo from './components/CrimeInfo';
import DoughnutChart from './components/DoughnutChart';
import SummaryCard from './components/SummaryCard';

Vue.component('crime-info', CrimeInfo);
Vue.component('doughnut-chart', DoughnutChart);
Vue.component('summary-card', SummaryCard);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
