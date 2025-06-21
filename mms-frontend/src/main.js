import { createApp } from 'vue'
import App from './App.vue'
import Routers from 'routers'
import Stores from 'stores'
import 'bootstrap/dist/css/bootstrap.min.css'
import  'bootstrap'
import 'stylesheets/styles.scss'

createApp(App)
    .use(Routers)
    .use(Stores)
    .mount('#app')
