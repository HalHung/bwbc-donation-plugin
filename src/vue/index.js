import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Admin from './Admin.vue';
import App from './App.vue';
import CardDonationInfo from './card-donation-info.vue';
import MemberInfo from './member-info.vue';
import CreditCardInfo from './credit-card-info.vue';
Vue.use(ElementUI);
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