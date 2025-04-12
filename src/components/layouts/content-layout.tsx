import * as React from 'react'
import {useNavigate} from 'react-router-dom'

import {Button} from '@/components/ui/button'
import {useLogout, useUser} from '@/lib/auth'

type ContentLayoutProps = {
    children: React.ReactNode
    title?: string
}

export const ContentLayout = ({children}: ContentLayoutProps) => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center">{children}</div>
        </>
    )
}

const Header = () => {
    const navigate = useNavigate()
    const user = useUser()
    const logout = useLogout()

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    )
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleRegisterClick = () => {
        setAnchorElUser(null)
        navigate(`/auth/register`)
    }
    const handleLogInClick = () => {
        setAnchorElUser(null)
        navigate(`/auth/login`)
    }
    const handleLogOutClick = () => {
        setAnchorElUser(null)
        logout.mutate({})
    }
    const handleProfileClick = () => {
        setAnchorElUser(null)
        navigate(`/profile`)
    }

    return (
        <header className="bg-slate-800 text-white flex">
            <div className="w-full max-w-[1200px] flex items-center px-4 py-4">
                <div className="flex-1">
                    <a
                        href="/"
                        className="text-xl font-bold tracking-widest text-white no-underline"
                    >
                        MaiTrack
                    </a>
                </div>
                <div>
                    {user?.data ? (
                        <Button variant="contained" onClick={handleLogOutClick}>Log Out</Button>
                    ) : (
                        <div className="flex gap-4">
                            <Button
                                variant="outlined"
                                onClick={handleLogInClick}
                            >
                                Log In
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleRegisterClick}
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
