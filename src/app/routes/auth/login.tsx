import {useNavigate, useSearchParams} from 'react-router-dom'

import {AuthLayout} from '@/components/layouts'
import {paths} from '@/config/paths'
import {LoginForm} from '@/features/auth/components/login-form'

const LoginRoute = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')
    return (
        <AuthLayout>
            <LoginForm
                onSuccess={() => {
                    navigate(redirectTo || paths.home.getHref(), {
                        replace: true,
                    })
                }}
            />
        </AuthLayout>
    )
}

export default LoginRoute
