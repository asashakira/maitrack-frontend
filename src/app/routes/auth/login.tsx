import {Box} from '@mui/material'
import {useNavigate, useSearchParams} from 'react-router-dom'

import {paths} from '@/config/paths'
import {LoginForm} from '@/features/auth/components/login-form'

const LoginRoute = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirectTo')
    return (
        // TODO: make AuthLayout
        <Box>
            <LoginForm
                onSuccess={() => {
                    navigate(
                        `${redirectTo ? `${redirectTo}` : paths.home.getHref()}`,
                        {
                            replace: true,
                        },
                    )
                }}
            />
        </Box>
    )
}

export default LoginRoute
