import {Link, useSearchParams} from 'react-router-dom'

import {LazyImage} from '@/components/ui/image'
import {env} from '@/config/env'
import {Song} from '@/types/api'

import {useSongs} from '../api/get-songs'

import {genres, versions, SearchFilters} from './search-filters'

export const SongsList = () => {
    const [searchParams] = useSearchParams()

    const songQuery = useSongs({})

    if (songQuery.isLoading) {
        return <div>Loading...</div>
    }

    const songs: Song[] | undefined = songQuery?.data?.data
    if (!songs) {
        return <div>Song Not Found</div>
    }

    // Filter
    const genreId = Number(searchParams.get('g'))
    const genre = genres.find(g => g.id === genreId)?.name
    const versionId = Number(searchParams.get('v'))
    const version = versions.find(v => v.id === versionId)?.name
    const filteredSongs = songs.filter(song => {
        const genreMatch = !genre || song.genre === genre
        const versionMatch = !version || song.version === version
        return genreMatch && versionMatch
    })

    return (
        <div className="w-full px-1 my-4">
            <SearchFilters />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filteredSongs.map(song => (
                    <SongsListItem key={song.id} song={song} />
                ))}
            </div>
        </div>
    )
}

const SongsListItem = ({song}: {song: Song}) => {
    return (
        <Link
            to={song.id}
            className="w-full flex bg-slate-800 text-white rounded-xl border border-zinc-700 p-1 hover:bg-slate-700"
        >
            <LazyImage
                src={`${env.S3_BUCKET_URL}songs/${song.imageUrl}`}
                alt={song.title}
                className="w-20 h-20 rounded-md object-cover"
            />

            <div className="flex flex-col h-20 justify-between ml-4 min-w-0">
                <div>
                    <div className="text-sm whitespace-nowrap truncate">
                        {song.title}
                    </div>
                    <div className="text-xs text-zinc-400 whitespace-nowrap truncate overflow-hidden">
                        by {song.artist}
                    </div>
                </div>
            </div>
        </Link>
    )
}
