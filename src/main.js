import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import('./assets/css/public.css')
import Vant from 'vant';
import 'vant/lib/index.css';
import { ContactCard } from 'vant';

createApp(App).use(ContactCard).use(Vant).use(store).use(router).mount('#app')
