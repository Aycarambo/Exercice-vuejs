import { createApp } from "vue";
import App from "./App.vue";
import Notifications from "@kyvg/vue3-notification";

import "./assets/main.css";

const app = createApp(App).use(Notifications);
app.mount("#app");
