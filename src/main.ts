import Vue from "vue";
import Web from "./Web.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Web)
}).$mount("#Web");
