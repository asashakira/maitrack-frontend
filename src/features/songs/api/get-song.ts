import {useQuery, queryOptions} from '@tanstack/react-query'

import {api} from '@/lib/api-client'
import {QueryConfig} from '@/lib/react-query'
import {Song} from '@/types/api'

export const getSong = ({songID}: {songID: string}): Promise<{data: Song}> => {
    return api.get(`/songs/by-id/${songID}`)
}

export const getUserQueryOptions = (songID: string) => {
    return queryOptions({
        queryKey: ['songs', songID],
        queryFn: () => getSong({songID}),
    })
}

type UseSongOptions = {
    songID: string
    queryConfig?: QueryConfig<typeof getUserQueryOptions>
}

export const useSong = ({songID, queryConfig}: UseSongOptions) => {
    return useQuery({
        ...getUserQueryOptions(songID),
        ...queryConfig,
    })
}
