import Axios, {InternalAxiosRequestConfig} from 'axios'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    if (config.headers) {
        config.headers.Accept = 'application/json'
    }

    config.withCredentials = true
    return config
}

export const api = Axios.create({
    baseURL: 'http://localhost:8080/v1/',
})

api.interceptors.request.use(authRequestInterceptor)
