import * as React from 'react'
import {useSearchParams} from 'react-router-dom'

import type {Song} from '@/types/api'

import {useSong} from '../api/get-song'

import {BeatmapData} from './beatmap-data-table'
import {BeatmapPicker} from './beatmap-picker'

export const SongView = ({songID}: {songID: string}) => {
    const songQuery = useSong({songID})
    const [searchParams, setSearchParams] = useSearchParams()
    const difficulty = searchParams.get('d') || 'master'

    React.useEffect(() => {
        if (!searchParams.get('d')) {
            setSearchParams({d: 'master'})
        }
    }, [searchParams, setSearchParams])

    if (songQuery.isLoading) {
        return <div>Loading...</div>
    }

    const song: Song | undefined = songQuery?.data?.data

    if (!song) {
        return <div>Song Not Found</div>
    }

    const beatmap = song.beatmaps.find(map => map.difficulty === difficulty)
    if (!song) {
        return <div>Beatmap Not Found</div>
    }

    return (
        <div className="w-full py-4 px-2">
            <div className="flex flex-col gap-5 bg-slate-800 text-white rounded border border-zinc-700 p-5">
                <div className="flex flex-col sm:flex-row gap-5">
                    <div>
                        {/* Image */}
                        <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="mb-5"
                        />
                        <BeatmapPicker beatmaps={song.beatmaps} />
                    </div>

                    {/* Main Info */}
                    <div className="flex flex-col w-full min-w-0">
                        <div className="text-2xl font-bold">{song.title}</div>
                        <div className="text-lg mb-2 whitespace-nowrap truncate">
                            {song.artist}
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                            <div>
                                <span className="font-semibold text-white mr-1">
                                    BPM:
                                </span>
                                {song.bpm || '—'}
                            </div>
                            <div>
                                <span className="font-semibold text-white mr-1">
                                    Genre:
                                </span>
                                {song.genre || '—'}
                            </div>
                            <div>
                                <span className="font-semibold text-white mr-1">
                                    Note Designer:
                                </span>
                                {beatmap?.noteDesigner || '—'}
                            </div>
                        </div>
                    </div>
                </div>

                <BeatmapData beatmap={beatmap} />
            </div>
        </div>
    )
}
