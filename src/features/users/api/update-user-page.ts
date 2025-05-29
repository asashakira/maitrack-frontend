import {api} from '@/lib/api-client'

export const updateUser = ({userID}: {userID: string}) => {
    return api.post(`/users/by-user-id/${userID}/update`)
}
