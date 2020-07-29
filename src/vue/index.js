import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Admin from './Admin.vue';
import App from './App.vue';
import CardDonationInfo from './card-donation-info.vue';
import MemberInfo from './member-info.vue';
import CreditCardInfo from './credit-card-info.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
new Vue({
  el: '#vwp-plugin-admin',
  render: h => h(Admin),
});
new Vue({
  el: '#vwp-plugin-app',
  render: h => h(App),
});
new Vue({
  el: '#vwp-plugin-card-donation-info',
  render: h => h(CardDonationInfo),
});
new Vue({
  el: '#vwp-plugin-member-info',
  render: h => h(MemberInfo),
});
new Vue({
  el: '#vwp-plugin-credit-card-info',
  render: h => h(CreditCardInfo),
})