import {useSearchParams} from 'react-router-dom'

import type {Beatmap} from '@/types/api'

type BeatmapPickerProps = {
    beatmaps: Beatmap[]
}

export const BeatmapPicker = ({beatmaps}: BeatmapPickerProps) => {
    return (
        <div className="flex gap-3">
            {beatmaps.map(beatmap => (
                <BeatmapPickerItem key={beatmap.beatmapID} beatmap={beatmap} />
            ))}
        </div>
    )
}

type BeatmapPickerItemProps = {
    beatmap: Beatmap
}

const BeatmapPickerItem = ({beatmap}: BeatmapPickerItemProps) => {
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
        setSearchParams({d: beatmap.difficulty})
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
