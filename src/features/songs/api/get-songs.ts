import {useQuery, queryOptions} from '@tanstack/react-query'

import {api} from '@/lib/api-client'
import {QueryConfig} from '@/lib/react-query'
import {Song} from '@/types/api'

export const getSongs = (): Promise<{data: Song[]}> => {
    return api.get('/songs')
}

export const getUserQueryOptions = () => {
    return queryOptions({
        queryKey: ['songs'],
        queryFn: () => getSongs(),
    })
}

type UseSongsOptions = {
    queryConfig?: QueryConfig<typeof getUserQueryOptions>
}

export const useSongs = ({queryConfig}: UseSongsOptions) => {
    return useQuery({
        ...getUserQueryOptions(),
        ...queryConfig,
    })
}
