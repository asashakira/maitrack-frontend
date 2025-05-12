import {useSearchParams} from 'react-router-dom'

import {Select} from '@/components/ui/select'

export type FilterOption = {
    id: number | string
    name: string
}

export type AvailableFilters = {
    genres: FilterOption[]
    versions: FilterOption[]
}

export const charToKey = {
    g: 'genre',
    v: 'version',
}

// FIXME: full width & is gross
export const genres: FilterOption[] = [
    {id: 1, name: 'POPS＆アニメ'},
    {id: 2, name: 'niconico＆ボーカロイド'},
    {id: 3, name: '東方Project'},
    {id: 4, name: 'ゲーム＆バラエティ'},
    {id: 5, name: 'maimai'},
    {id: 6, name: 'オンゲキ&CHUNITHM'},
    {id: 7, name: '宴会場'},
]

export const versions: FilterOption[] = [
    {id: 1, name: 'maimai'},
    {id: 2, name: 'maimai PLUS'},
    {id: 3, name: 'GreeN'},
    {id: 4, name: 'GreeN PLUS'},
    {id: 5, name: 'ORANGE'},
    {id: 6, name: 'ORANGE PLUS'},
    {id: 7, name: 'PiNK'},
    {id: 8, name: 'PiNK PLUS'},
    {id: 9, name: 'MURASAKi'},
    {id: 10, name: 'MURASAKi PLUS'},
    {id: 11, name: 'MiLK'},
    {id: 12, name: 'MiLK PLUS'},
    {id: 13, name: 'FiNALE'},
    {id: 14, name: 'maimaiでらっくす'},
    {id: 15, name: 'maimaiでらっくす PLUS'},
    {id: 16, name: 'Splash'},
    {id: 17, name: 'Splash PLUS'},
    {id: 18, name: 'UNiVERSE'},
    {id: 19, name: 'UNiVERSE PLUS'},
    {id: 20, name: 'FESTiVAL'},
    {id: 21, name: 'FESTiVAL PLUS'},
    {id: 22, name: 'BUDDiES'},
    {id: 23, name: 'BUDDiES PLUS'},
    {id: 24, name: 'PRiSM'},
    {id: 25, name: 'PRiSM PLUS'},
]

export const levelOptions: FilterOption[] = [
    ...Array.from({length: 15}, (_, i) => {
        const level = i + 1
        return [
            {id: `${level}`, name: `${level}`},
            ...(level >= 7 && level < 15
                ? [{id: `${level}+`, name: `${level}+`}]
                : []),
        ]
    }).flat(),
]

export const SearchFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = e.target.value
        if (genre) {
            setSearchParams(
                prev => {
                    prev.set('g', genre)
                    return prev
                },
                {
                    preventScrollReset: true,
                },
            )
        } else {
            setSearchParams(
                prev => {
                    prev.delete('g')
                    return prev
                },
                {
                    preventScrollReset: true,
                },
            )
        }
    }
    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const version = e.target.value
        if (version) {
            setSearchParams(
                prev => {
                    prev.set('v', version)
                    return prev
                },
                {
                    preventScrollReset: true,
                },
            )
        } else {
            setSearchParams(
                prev => {
                    prev.delete('v')
                    return prev
                },
                {
                    preventScrollReset: true,
                },
            )
        }
    }
    // const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const level = e.target.value
    //     setSearchParams(
    //         prev => {
    //             prev.set('l', level)
    //             return prev
    //         },
    //         {
    //             preventScrollReset: true,
    //         },
    //     )
    // }

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 my-4">
            <Select
                options={genres}
                value={searchParams.get('g') || ''}
                onChange={handleGenreChange}
                placeholder="Genre"
            />
            <Select
                options={versions}
                value={searchParams.get('v') || ''}
                onChange={handleVersionChange}
                placeholder="Version"
            />
            {/* <Select */}
            {/*     options={levelOptions} */}
            {/*     value={searchParams.get('l') || ''} */}
            {/*     onChange={handleLevelChange} */}
            {/*     placeholder="Level" */}
            {/* /> */}
        </div>
    )
}
