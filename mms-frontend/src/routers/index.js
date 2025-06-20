import { createRouter, createWebHistory } from 'vue-router';
import External from './external';

export default createRouter({
    routes: [
        ...External,
    ],
    history: createWebHistory() 
})
