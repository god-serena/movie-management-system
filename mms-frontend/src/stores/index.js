import { createStore } from 'vuex'
import authStore from './auth'


export default createStore({
    modules: {
        authStore
    }
})

