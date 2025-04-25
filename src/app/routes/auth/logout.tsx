import * as React from 'react'
import {useNavigate} from 'react-router-dom'

import {useLogout} from '@/lib/auth'

const LogoutRoute = () => {
    const navigate = useNavigate()
    const logout = useLogout()
    React.useEffect(() => {
        logout.mutate({})
        navigate('/')
    })
    return null
}

export default LogoutRoute
