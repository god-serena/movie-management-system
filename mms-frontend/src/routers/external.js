export default [{
    path: '/',
    name: 'external-page',
    component: () => import ('components/external/ExternalPageRoot.vue'),
    children: [
        {
            path: '',
            name: 'home-page',
            component: () => import ('components/external/HomePage.vue'),
            meta: {
                title: 'Home: MMS'
            },
        },
        {
            path: '/signup',
            name: 'signup-page',
            component: () => import ('components/external/SignupPage.vue')
        },
        {
            path: '/signin',
            name: 'signin-page',
            component: () => import ('components/external/SigninPage.vue')
        }
    ]
}
]