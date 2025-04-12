import * as React from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {paths} from '@/config/paths'
import {useUser} from '@/lib/auth'

import {ContentLayout} from './content-layout'

type AuthLayoutProps = {
    children: React.ReactNode
    title?: string
}

export const AuthLayout = ({children}: AuthLayoutProps) => {
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

    return <ContentLayout>{children}</ContentLayout>
}
