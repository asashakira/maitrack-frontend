import Axios, {InternalAxiosRequestConfig} from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  // cors error if uncomment below
  // config.withCredentials = true;

  return config;
}

export const api = Axios.create({
  // baseURL: 'http://13.231.137.240/v1/',
  baseURL: 'http://localhost:8080/v1/',
});

api.interceptors.request.use(authRequestInterceptor);
