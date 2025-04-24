import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import {Button} from '@/components/ui/button'
import {useLogout, useUser} from '@/lib/auth'

export const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()

    // search
    const [maiID, setMaiID] = React.useState<string>('')
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setMaiID(e.target.value)
    }
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: search like opgg
        // also make search page
        const [gameName, tagLine] = maiID.replace(/\s+/g, '').split('#')
        navigate(`/users/${gameName}-${tagLine}`)
        setMaiID('')
        searchInputRef.current?.blur()
    }

    return (
        <header>
            {location.pathname === '/' ? null : (
                <div className="flex justify-center bg-lime-400 text-black">
                    <div className="w-full max-w-[1000px] flex justify-between items-center gap-3 p-2">
                        {/* Logo */}
                        <a
                            href="/"
                            className="text-xl font-bold tracking-widest no-underline"
                        >
                            MAITRACK
                        </a>
                        {/* Search Bar */}
                        <form onSubmit={handleSearchSubmit} className="w-full">
                            <div className="relative">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    className="w-full bg-white text-black rounded-sm p-2 pl-3 pr-12 text-sm focus:outline-none"
                                    placeholder="Game name + #Tag line"
                                    value={maiID}
                                    onChange={handleSearchInputChange}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
                                    // disabled={maiID === ''}
                                >
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="text-lime-400 cursor-pointer text-lg"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Navbar />
        </header>
    )
}

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = useUser()
    const logout = useLogout()

    const handleLogOutClick = () => {
        setAnchorElUser(null)
        logout.mutate({})
    }

    // profile dropdown menu
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    )
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleProfileClick = () => {
        setAnchorElUser(null)
        navigate(`/profile`)
    }

    return (
        <div className="w-full flex justify-center bg-slate-800">
            <div className="w-full max-w-[1000px] flex justify-between px-2">
                <nav className="flex gap-6">
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/songs">songs</NavLink>
                </nav>
                {user?.data ? (
                    <Button variant="contained" onClick={handleLogOutClick}>
                        {user.data.username}
                    </Button>
                ) : (
                    <nav className="flex gap-6">
                        <NavLink to="/auth/login">log in</NavLink>
                        <NavLink to="/auth/register">register</NavLink>
                    </nav>
                )}
            </div>
        </div>
    )
}

type NavLinkProps = {
    children: React.ReactNode
    to: string
    className?: string
}

const NavLink = ({to, className, children}: NavLinkProps) => {
    const location = useLocation()

    const baseStyle =
        'flex items-center text-gray-400 hover:text-white pt-3 pb-[9px]'
    const borderStyle = 'border-b-[3px] border-transparent hover:border-b-white'
    const activeStyle = 'font-bold !text-white border-b-white'

    const finalStyle = [
        baseStyle,
        borderStyle,
        location.pathname === to ? activeStyle : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <Link to={to} className={finalStyle}>
            {children}
        </Link>
    )
}
