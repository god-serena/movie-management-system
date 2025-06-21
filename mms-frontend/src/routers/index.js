import { createRouter, createWebHistory } from 'vue-router';
import external from './external';
import internal from './internal'

export default createRouter({
    routes: [
        ...external,
        ...internal
    ],
    history: createWebHistory() 
})
