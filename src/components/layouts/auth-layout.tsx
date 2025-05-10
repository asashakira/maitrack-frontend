import * as React from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {paths} from '@/config/paths'
import {useUser} from '@/lib/auth'

import {Footer} from './footer'
import {Header} from './header'

type AuthLayoutProps = {
    children: React.ReactNode
    title?: string
}

export const AuthLayout = ({children}: AuthLayoutProps) => {
    document.body.classList = 'bg-neutral-100'

    const user = useUser()
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')

    const navigate = useNavigate()

    React.useEffect(() => {
        if (user.data) {
            navigate(redirectTo ? redirectTo : paths.home.getHref(), {
                replace: true,
            })
        }
    }, [user.data, navigate, redirectTo])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col items-center flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    )
}
