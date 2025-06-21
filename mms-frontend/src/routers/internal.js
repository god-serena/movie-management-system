import stores from 'stores'
export default [{
    path: '/dashboard',
    name: 'dashboard',
    component: () => import ('components/internal/DashBoard.vue'),
    beforeEnter: async (_to, _from, next) => {
        const user = stores.state.authStore.user
        if (!user) {
            try {
                await stores.dispatch('authStore/getUser')
                next()
            } catch (e) {
                localStorage.clear()
                return next({ name: 'home-page', replace: true})
            }
        }
        else {
            next()
        }
    },
    meta: {
        title: 'Flixer'
    },
}]