import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as React from 'react'
import {useNavigate} from 'react-router-dom'

import {ContentLayout} from '@/components/layouts'

const LandingRoute = () => {
    const navigate = useNavigate()

    const [maiID, setMaiID] = React.useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaiID(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // TODO: search like opgg
        // also make search page
        const [gameName, tagLine] = maiID.replace(/\s+/g, '').split('#')
        navigate(`/users/${gameName}-${tagLine}`)
    }

    return (
        <ContentLayout>
            <div className="pt-16 pb-16">
                <h1 className="text-inherit cursor-default font-bold tracking-widest text-4xl">
                    MAITRACK
                </h1>
            </div>
            <div className="w-full max-w-xl px-4">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full border border-gray-300 bg-white text-black rounded-lg p-3 pl-4 pr-12 text-lg focus:outline-none"
                            placeholder="Game name + #Tag line"
                            value={maiID}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-transparent border-none"
                            disabled={maiID === ''}
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="text-lime-400 cursor-pointer text-lg"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </ContentLayout>
    )
}

export default LandingRoute
