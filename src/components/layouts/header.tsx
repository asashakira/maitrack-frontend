import {
    faSearch,
    faAngleDown,
    faAngleUp,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'

import {useUser} from '@/lib/auth'
import {AuthUser} from '@/types/api'

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
    const user = useUser()
    return (
        <div className="w-full flex justify-center bg-slate-800">
            <div className="w-full max-w-[1000px] flex justify-between px-2">
                <nav className="flex gap-6">
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/about">about</NavLink>
                    <NavLink to="/songs">songs</NavLink>
                </nav>
                {user?.data ? (
                    <ProfileButton userData={user.data} />
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

    const isActive =
        to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to)

    const finalStyle = [
        baseStyle,
        borderStyle,
        isActive ? activeStyle : '',
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

type ProfileButtonProps = {
    userData: AuthUser
    className?: string
}

const ProfileButton = ({userData, className}: ProfileButtonProps) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const buttonBaseStyle =
        'flex items-center text-gray-400 hover:text-white pt-3 pb-[9px] cursor-pointer'
    const buttonBorderStyle =
        'border-b-[3px] border-transparent hover:border-b-white'
    const activeStyle = 'text-white border-b-white'

    const buttonFinalStyle = [
        buttonBaseStyle,
        buttonBorderStyle,
        isOpen ? activeStyle : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className="relative">
            <button className={buttonFinalStyle} onClick={toggleDropdown}>
                {userData.gameName}
                {isOpen ? (
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        className="mx-2"
                        size="xs"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        className="mx-2"
                        size="xs"
                    />
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-30 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                        <Link
                            to={`/users/${userData.gameName}-${userData.tagLine}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Settings
                        </Link>
                        <Link
                            to="/auth/logout"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
