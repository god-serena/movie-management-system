import { createStore } from 'vuex'
import authStore from './auth'
import moviesStore from './movies'


export default createStore({
    modules: {
        authStore,
        moviesStore
    }
})

