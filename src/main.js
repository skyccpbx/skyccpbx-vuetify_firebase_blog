import Vue from "vue";
import App from "./App.vue";
import firebase from "firebase/app";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

const config = {
  apiKey: "AIzaSyCDXt_n9tHt2FdiSYgxDtAy2vNCYPd_rW8",
  authDomain: "my-app-b1698.firebaseapp.com",
  databaseURL: "https://my-app-b1698.firebaseio.com",
  projectId: "my-app-b1698",
  storageBucket: "my-app-b1698.appspot.com",
  messagingSenderId: "77501825988",
  appId: "1:77501825988:web:41cc9cf6e0b975a0309a91"
};
firebase.initializeApp(config);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount("#app");
