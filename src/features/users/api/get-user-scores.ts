import {api} from '@/lib/api-client'
import {ScoresResponse} from '@/types/api'

export const fetchScores = async ({
    pageParam = 0,
    userID,
}: {
    pageParam: number
    userID: string
}): Promise<{
    data: ScoresResponse
}> => {
    return api.get(
        `/users/by-user-id/${userID}/scores?limit=10&offset=${pageParam}`,
    )
}
