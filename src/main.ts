import './assets/main.css';

import { createApp } from 'vue';
import RootApp from './RootApp.vue';
import router from './router';

const app = createApp(RootApp);

app.use(router);

app.mount('#app');
