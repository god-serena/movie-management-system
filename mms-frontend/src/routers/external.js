export default [{
    path: '/',
    name: 'external-page',
    component: () => import ('components/external/ExternalPageRoot.vue'),
    meta: {
        title: 'Flixer'
    },
    children: [
        {
            path: '',
            name: 'home-page',
            component: () => import ('components/external/HomePage.vue'),
        },
        {
            path: '/signup',
            name: 'signup-page',
            beforeEnter: (_to, _from, next) => {
                const accessToken = localStorage.getItem('access_token')
                if (accessToken) next({ name: 'dashboard' , replace: true })
                else next()
            },
            component: () => import ('components/external/SignupPage.vue')
        },
        {
            path: '/signin',
            name: 'signin-page',
            beforeEnter: (_to, _from, next) => {
                const accessToken = localStorage.getItem('access_token')
                if (accessToken) next({ name: 'dashboard' , replace: true })
                else next()
            },
            component: () => import ('components/external/SigninPage.vue')
        }
    ]
}
]