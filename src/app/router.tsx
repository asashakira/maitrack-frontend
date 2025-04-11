import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {paths} from '@/config/paths'
import {ProtectedRoute} from '@/lib/auth'

import LoginRoute from './routes/auth/login'
import RegisterRoute from './routes/auth/register'
import LandingRoute from './routes/landing'
import NotFoundRoute from './routes/not-found'
import ProfileRoute from './routes/profile'
import UserRoute from './routes/users'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={paths.home.path} element={<LandingRoute />} />
                <Route
                    path={paths.auth.register.path}
                    element={<RegisterRoute />}
                />
                <Route path={paths.auth.login.path} element={<LoginRoute />} />
                <Route path={paths.users.path} element={<UserRoute />} />
                <Route
                    path={paths.profile.path}
                    element={
                        <ProtectedRoute>
                            <ProfileRoute />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundRoute />} />
            </Routes>
        </BrowserRouter>
    )
}
