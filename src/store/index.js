import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import plugins from './plugins';
import state from './state';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    plugins,
    state
});
