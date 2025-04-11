import {configureAuth} from 'react-query-auth'
import {Navigate, useLocation} from 'react-router'

import {paths} from '@/config/paths'
import {AuthResponse, AuthUser} from '@/types/api'

import {api} from './api-client'

const getUser = async (): Promise<AuthUser> => {
    const response = await api.get('/auth/me')
    return response.data
}

export type LoginInput = {
    username: string
    password: string
}
const login = (data: LoginInput): Promise<AuthResponse> => {
    return api.post('/auth/login', data)
}

export type RegisterInput = {
    username: string
    password: string
    gameName: string
    tagLine: string
    segaID: string
    segaPassword: string
}
const register = (data: RegisterInput): Promise<AuthResponse> => {
    return api.post('/auth/register', data)
}

const logout = (): Promise<void> => {
    return api.post('/auth/logout')
}

const authConfig = {
    userFn: getUser,
    loginFn: async (data: LoginInput) => {
        const response = await login(data)
        return response.user
    },
    registerFn: async (data: RegisterInput) => {
        const response = await register(data)
        return response.user
    },
    logoutFn: logout,
}

export const {useUser, useLogin, useLogout, useRegister, AuthLoader} =
    configureAuth(authConfig)

export const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const user = useUser()
    const location = useLocation()

    if (!user.data) {
        return (
            <Navigate
                to={paths.auth.login.getHref(location.pathname)}
                replace
            />
        )
    }

    return children
}
