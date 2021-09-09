import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";

store.dispatch("search/getCategoriesAPI").then(() => {
  store.dispatch("episodes/getAll").then(() => {
    store.dispatch("characters/getAll").then(() => {
      store.dispatch("deaths/getAll").then(() => {
        store.dispatch("quotes/getAll").then(() => {
          createApp(App).use(store).use(router).mount("#app");
        });
      });
    });
  });
});
