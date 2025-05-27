import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {paths} from '@/config/paths'
import {ProtectedRoute} from '@/lib/auth'

import LoginRoute from './routes/auth/login'
import LogoutRoute from './routes/auth/logout'
import RegisterRoute from './routes/auth/register'
import LandingRoute from './routes/landing'
import NotFoundRoute from './routes/not-found'
import SettingsRoute from './routes/settings'
import SongRoute from './routes/songs/song'
import SongsRoute from './routes/songs/songs'
import UserRoute from './routes/users'
import AboutRoute from './routes/about'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={paths.home.path} element={<LandingRoute />} />
                <Route path={paths.about.path} element={<AboutRoute />} />
                <Route
                    path={paths.auth.register.path}
                    element={<RegisterRoute />}
                />
                <Route path={paths.auth.login.path} element={<LoginRoute />} />
                <Route
                    path={paths.auth.logout.path}
                    element={<LogoutRoute />}
                />
                <Route path={paths.users.path} element={<UserRoute />} />
                <Route path={paths.songs.path} element={<SongsRoute />} />
                <Route path={paths.song.path} element={<SongRoute />} />
                <Route
                    path={paths.settings.path}
                    element={
                        <ProtectedRoute>
                            <SettingsRoute />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFoundRoute />} />
            </Routes>
        </BrowserRouter>
    )
}
