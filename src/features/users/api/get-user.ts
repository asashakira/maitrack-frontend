import {useQuery, queryOptions} from '@tanstack/react-query'

import {api} from '@/lib/api-client'
import {QueryConfig} from '@/lib/react-query'
import {User} from '@/types/api'

export const getUser = ({userID}: {userID: string}): Promise<{data: User}> => {
    return api.get(`/users/by-user-id/${userID}`)
}

export const getUserQueryOptions = (userID: string) => {
    return queryOptions({
        queryKey: ['users', userID],
        queryFn: () => getUser({userID}),
    })
}

type UseUserOptions = {
    userID: string
    queryConfig?: QueryConfig<typeof getUserQueryOptions>
}

export const useUser = ({userID, queryConfig}: UseUserOptions) => {
    return useQuery({
        ...getUserQueryOptions(userID),
        ...queryConfig,
    })
}
