import {AccountCircle} from '@mui/icons-material'
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import * as React from 'react'
import {useNavigate} from 'react-router-dom'

import {useLogout, useUser} from '@/lib/auth'

type ContentLayoutProps = {
    children: React.ReactNode
    title?: string
}

export const ContentLayout = ({children}: ContentLayoutProps) => {
    return (
        <>
            <Header />
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {children}
            </Container>
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
    const handleSignInClick = () => {
        setAnchorElUser(null)
        navigate(`/auth/login`)
    }
    const handleSignOutClick = () => {
        setAnchorElUser(null)
        logout.mutate({})
    }
    const handleProfileClick = () => {
        setAnchorElUser(null)
        navigate(`/profile`)
    }

    return (
        <AppBar position="static" sx={{alignItems: 'center'}}>
            <Toolbar disableGutters sx={{width: 900}}>
                <Box sx={{flex: 1}}>
                    <Typography
                        variant="h6"
                        component="a"
                        noWrap
                        href="/"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        MAI.GG
                    </Typography>
                </Box>
                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        disableRipple
                        onClick={handleOpenUserMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        sx={{mt: 4.5}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {user?.data ? (
                            <>
                                <MenuItem onClick={handleProfileClick}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleSignOutClick}>
                                    Sign Out
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={handleSignInClick}>
                                Sign In
                            </MenuItem>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
