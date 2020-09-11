import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';
import VueTelInput from "luciditv-vue-tel-input";

import Admin from './Admin.vue';
import App from './App.vue';
import CreditCard from './Credit-card';
import Cheque from './Cheque';
import BankTransfer from './Bank-transfer';
import Test from './test.vue';
import CardSuccess from './Card-success';

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.use(VueTelInput);

new Vue({
  el: '#vwp-plugin-admin',
  render: h => h(Admin),
});
new Vue({
  el: '#vwp-plugin-app',
  render: h => h(App),
});
new Vue({
  el: '#vwp-plugin-test',
  render: h => h(Test),
})
new Vue({
  el: '#vwp-plugin-Credit-card',
  render: h => h(CreditCard),
})
new Vue({
  el: '#vwp-plugin-Cheque',
  render: h => h(Cheque),
})
new Vue({
  el: '#vwp-plugin-Bank-transfer',
  render: h => h(BankTransfer),
})
new Vue({
  el: '#vwp-plugin-Card-success',
  render: h => h(CardSuccess),
})