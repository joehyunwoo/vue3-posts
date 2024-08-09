import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

// plugins
import commonPlugins from './plugins/commonPlugins';
import globalComponents from './plugins/global-components';
import globalDirectives from './plugins/global-directives';
import dayjs from './plugins/dayjs';

const app = createApp(App);
app.use(commonPlugins);
app.use(globalComponents);
app.use(globalDirectives);
app.use(dayjs);
app.use(router);
app.mount('#app');
import 'bootstrap/dist/js/bootstrap.js';

// const env = import.meta.env;
// console.log('mode => ', env.MODE);
// console.log('BASE_URL => ', env.BASE_URL);
// console.log('PROD => ', env.PROD);
// console.log('DEV => ', env.DEV);
// console.log('VITE_APP_API_URL =>', env.VITE_APP_API_URL);
