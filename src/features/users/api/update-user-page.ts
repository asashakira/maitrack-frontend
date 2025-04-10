import {api} from '@/lib/api-client'
import {User} from '@/types/api'

export const updateUser = ({
    userID,
}: {
    userID: string
}): Promise<{data: User}> => {
    return api.post('/users/renew', {userID})
}
