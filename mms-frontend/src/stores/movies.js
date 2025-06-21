import { FlexirApi } from 'source/mmsApiClient.js'

export default {
    state: {},
    mutations: {},
    actions: {
        deleteMovie(_context, payload={}) {
            return FlexirApi('movies', 'DELETE', payload)
                .then((response) => {
                    return response;
                })
        },
        getMovies(_context, payload={}) {
            return FlexirApi('movies', 'GET', payload)
                .then((response) => {
                    return response;
                })
        },
        updateMovie(_context, payload={}) {
            let form = new FormData()
            for (const key in payload) {
                form.append(key, payload[key])
            }
            return FlexirApi('movies', 'PUT', form)
                .then((response) => {
                    return response;
                })
        },
        uploadMovie(_context, payload={}) {
            let form = new FormData()
            for (const key in payload) {
                form.append(key, payload[key])
            }
            return FlexirApi('movies', 'POST', form)
                .then((response) => {
                    return response;
                })
        }
    },
    namespaced: true
}