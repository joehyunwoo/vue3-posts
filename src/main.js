import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';

createApp(App).use(router).mount('#app');
import 'bootstrap/dist/js/bootstrap.js';

// const env = import.meta.env;
// console.log('mode => ', env.MODE);
// console.log('BASE_URL => ', env.BASE_URL);
// console.log('PROD => ', env.PROD);
// console.log('DEV => ', env.DEV);
// console.log('VITE_APP_API_URL =>', env.VITE_APP_API_URL);
