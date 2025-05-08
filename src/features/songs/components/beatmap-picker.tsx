import {useSearchParams} from 'react-router-dom'

import type {Beatmap} from '@/types/api'
import {env} from '@/config/env'

type BeatmapTypePickerProps = {
    beatmapTypes: string[]
}

export const BeatmapTypePicker = ({beatmapTypes}: BeatmapTypePickerProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const currentType = searchParams.get('t')

    const handleSelect = (type: string) => {
        const nextParams = new URLSearchParams(searchParams.toString())
        nextParams.set('t', type)
        setSearchParams(
            buildOrderedSearchParams({
                t: nextParams.get('t'),
                d: nextParams.get('d'),
            }),
            {replace: true},
        )
    }

    if (currentType === 'utage') {
	return null
    }

    return (
        <div className="flex">
            {beatmapTypes.map(type => (
                <button key={type} onClick={() => handleSelect(type)}>
                    <img
                        src={`${env.S3_BUCKET_URL}beatmap-type/${type}.png`}
                        className={`cursor-pointer ${
                            currentType === type
                                ? 'w-24'
                                : 'opacity-80 hover:opacity-200 w-20'
                        }`}
                    />
                </button>
            ))}
        </div>
    )
}

type BeatmapDifficultyPickerProps = {
    beatmaps: Beatmap[]
}

export const BeatmapDifficultyPicker = ({
    beatmaps,
}: BeatmapDifficultyPickerProps) => {
    return (
        <div className="flex gap-3">
            {beatmaps.map(beatmap => (
                <BeatmapDifficultyPickerItem
                    key={beatmap.beatmapID}
                    beatmap={beatmap}
                />
            ))}
        </div>
    )
}

type BeatmapDifficultyPickerItemProps = {
    beatmap: Beatmap
}

const BeatmapDifficultyPickerItem = ({
    beatmap,
}: BeatmapDifficultyPickerItemProps) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const colors: Record<string, string> = {
        basic: 'bg-green-400',
        advanced: 'bg-yellow-500',
        expert: 'bg-red-400',
        master: 'bg-purple-400',
        remaster: 'bg-pink-200',
        utage: 'bg-pink-500',
    }

    const handleClick = () => {
        const nextParams = new URLSearchParams(searchParams.toString())
        nextParams.set('d', beatmap.difficulty)
        setSearchParams(buildOrderedSearchParams({
	    t: nextParams.get('t'),
	    d: nextParams.get('d'),
	}), {replace: true})
    }

    const beatmapColor = colors[beatmap.difficulty]

    const isSelected = searchParams.get('d') === beatmap.difficulty

    const baseStyle =
        'flex justify-center items-center text-black font-bold w-10 h-10 rounded-lg cursor-pointer'

    const selectedStyle = isSelected
        ? 'ring-3 ring-white scale-105'
        : 'opacity-80 hover:opacity-100'

    return (
        <button className="no-underline" onClick={handleClick}>
            <div className={`${baseStyle} ${beatmapColor} ${selectedStyle}`}>
                {beatmap.level}
            </div>
        </button>
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
