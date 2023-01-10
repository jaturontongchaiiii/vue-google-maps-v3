const { createApp } = require("vue");
import App from "./App.vue";
import VueGoogleMaps from "@fawmi/vue-google-maps";

createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: "YOUR_API_KEY"
    }
  })
.mount("#app");
