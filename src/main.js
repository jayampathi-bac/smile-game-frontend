import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./global.css";
import "sweetalert2/dist/sweetalert2.min.css";
import 'animate.css';

import VueSweetalert2 from "vue-sweetalert2";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faHome, faLaptop, faMobileAlt, faTabletAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

global.jQuery = require("jquery");
const $ = global.jQuery;
window.$ = $;

library.add(
  faHome,
  faUserCircle,
  faDesktop,
  faLaptop,
  faMobileAlt,
  faTabletAlt
);

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(VueSweetalert2)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("Dialog", Dialog)
  .mount("#app");
