import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/:postcode',
      name: 'Hello',
      component: Hello,
      props: true
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      props: true
    },
  ],
});
