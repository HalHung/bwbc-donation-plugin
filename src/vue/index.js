import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Vuex from 'vuex';

import Admin from './Admin.vue';
import App from './App.vue';
// import CardDonationInfo from './components/card-donation-info.vue';
// import MemberInfo from './components/member-info.vue';
// import CreditCardInfo from './components/credit-card-info.vue';
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
new Vue({
  el: '#vwp-plugin-admin',
  render: h => h(Admin),
});
new Vue({
  el: '#vwp-plugin-app',
  render: h => h(App),
});
new Vue ({
  el: '#vwp-plugin-test',
  render: h => h(Test),
})
// new Vue({
//   el: '#vwp-plugin-card-donation-info',
//   render: h => h(CardDonationInfo),
// });
// new Vue({
//   el: '#vwp-plugin-member-info',
//   render: h => h(MemberInfo),
// });
// new Vue({
//   el: '#vwp-plugin-credit-card-info',
//   render: h => h(CreditCardInfo),
// })
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