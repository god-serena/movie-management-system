import { FlexirApi } from 'source/mmsApiClient'
import routers from 'routers'
export default {
    state: {
        user: null,
        emailInput: ''
    },

    mutations: {
        setEmailInput(state, data) {
            state.emailInput = data
        },
        setUser(state, data) {
            state.user = data
        }
    },
    actions: {
        signInUser(context, payload) {
            return FlexirApi('sign-in', 'POST', payload)
                .then((response) => {
                    context.commit('setUser', response.user)
                    const { tokens } = response;
                    localStorage.setItem("refresh_token", tokens?.refresh_token);
                    localStorage.setItem("access_token", tokens?.access_token);
                    return response;
                })
        },
        signUpUser(context, payload) {
            return FlexirApi('sign-up', 'POST', payload)
                .then((response) => {
                    context.commit('setUser', response.user)
                    const { tokens } = response;
                    localStorage.setItem("refresh_token", tokens?.refresh_token);
                    localStorage.setItem("access_token", tokens?.access_token);
                    return response;
                })
        },
        signOutUser(context, payload) {
            return FlexirApi('sign-out', 'POST', payload)
                .then(() => {
                    context.commit('setUser', {})
                    localStorage.clear();
                    routers.replace({ name: 'home-page' })
                })
        },
        getUser(context, payload={}) {
            return FlexirApi('user/me', 'GET', payload)
                .then((response) => {
                    context.commit('setUser', response.user)
                    return response;
                })
        },
        refreshAccessToken(context) {
            return FlexirApi('refresh-access-token', 'GET', payload)
                .then((response) => {
                    localStorage.setItem("access_token", response.access_token);  
                })
        }
    },
    namespaced: true
}