import * as React from 'react'
import {useSearchParams} from 'react-router-dom'

import {env} from '@/config/env'
import type {Song} from '@/types/api'

import {useSong} from '../api/get-song'

import {BeatmapData} from './beatmap-data'
import {BeatmapDifficultyPicker, BeatmapTypePicker} from './beatmap-picker'

export const SongView = ({songID}: {songID: string}) => {
    const songQuery = useSong({songID})
    const [searchParams, setSearchParams] = useSearchParams()

    const beatmapType = searchParams.get('t')
    const difficulty = searchParams.get('d')

    const song: Song | undefined = songQuery?.data?.data

    React.useEffect(() => {
        if (!song) return

        if (song.isUtage) {
            setSearchParams({t: 'utage', d: 'utage'}, {replace: true})
            return
        }

        const nextParams = new URLSearchParams(searchParams.toString())
        let shouldUpdate = false

        const hasDx = song.beatmaps.some(map => map.type === 'dx')
        if (!beatmapType) {
            nextParams.set('t', song.isUtage ? 'utage' : hasDx ? 'dx' : 'std')
            shouldUpdate = true
        }

        if (!difficulty) {
            nextParams.set('d', 'master')
            shouldUpdate = true
        }

        if (shouldUpdate) {
            setSearchParams(
                buildOrderedSearchParams({
                    t: nextParams.get('t'),
                    d: nextParams.get('d'),
                }),
                {replace: true},
            )
        }
    }, [song, difficulty, beatmapType, searchParams, setSearchParams])

    if (songQuery.isLoading) {
        return <div>Loading...</div>
    }
    if (!song) {
        return <div>Song Not Found</div>
    }

    const availableBeatmapTypes = Array.from(
        new Set(song.beatmaps.map(b => b.type)),
    )

    const beatmaps = song.beatmaps.filter(map => map.type === beatmapType)
    const beatmap = beatmaps.find(map => map.difficulty === difficulty)

    return (
        <div className="w-full py-4 px-2">
            <div className="flex flex-col gap-5 bg-slate-800 text-white rounded border border-zinc-700 p-5">
                {/* Header */}
                <div className="grid sm:grid-cols-[200px_1fr] md:grid-cols-[200px_1fr_250px] gap-5">
                    <div className="w-[200px]">
                        <BeatmapTypePicker
                            beatmapTypes={availableBeatmapTypes}
                        />
                        <div className="w-full h-48 bg-zinc-7000 mb-3">
                            <img
                                src={`${env.S3_BUCKET_URL}songs/${song.imageUrl}`}
                                alt={song.title}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <BeatmapDifficultyPicker beatmaps={beatmaps} />
                    </div>

                    {/* Main Info */}
                    <div className="flex flex-col min-w-0">
                        <div className="text-2xl font-bold">{song.title}</div>
                        <div className="text-sm mb-5">{song.artist}</div>
                        <div className="text-xs text-gray-300 space-y-1">
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
                                    Version:
                                </span>
                                {song.version || '—'}
                            </div>
                            <div>
                                <span className="font-semibold text-white mr-1">
                                    Release Date:
                                </span>
                                {song.releaseDate || '—'}
                            </div>
                            <div>
                                <span className="font-semibold text-white mr-1">
                                    Note Designer:
                                </span>
                                {beatmap?.noteDesigner || '—'}
                            </div>
                        </div>
                    </div>
                    {beatmap ? (
                        <BeatmapData beatmap={beatmap} />
                    ) : (
                        <div className="text-gray-400">
                            No beatmap for difficulty
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const buildOrderedSearchParams = (
    params: Record<string, string | null | undefined>,
) => {
    const orderedKeys = ['t', 'd']
    const search = new URLSearchParams()

    for (const key of orderedKeys) {
        const value = params[key]
        if (value) {
            search.set(key, value)
        }
    }

    return search
}
