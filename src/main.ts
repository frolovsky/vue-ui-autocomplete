import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { clickOutsideDirective, tabOtherDirective } from "@/directives";
import "./assets/styles/_variables.scss";

Vue.config.productionTip = false;

Vue.directive("click-outside", clickOutsideDirective);
Vue.directive("tab-other", tabOtherDirective);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
