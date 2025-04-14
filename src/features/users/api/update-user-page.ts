import {api} from '@/lib/api-client'

export const updateUser = ({maiID}: {maiID: string}) => {
    return api.post(`/users/by-mai-id/${maiID}/update`)
}
