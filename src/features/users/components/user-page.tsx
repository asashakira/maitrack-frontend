import {Box, Typography} from '@mui/material'

import {User} from '@/types/api'

import {useUser} from '../api/get-user'

import {UserData} from './user-data'
import {UserScores} from './user-scores'

export const UserPage = ({maiID}: {maiID: string}) => {
    const userQuery = useUser({
        maiID,
    })

    if (userQuery.isLoading) {
        // TODO: loading
        return <Box>Loading...</Box>
    }

    if (userQuery.isError) {
        // TODO: error
        return <Box>Error!!!</Box>
    }

    const user: User | undefined = userQuery?.data?.data

    if (!user) return <Box>User Not Found</Box>

    return (
        <Box sx={{m: 0}}>
            <UserIconAndName user={user} />
            <UserData user={user} />
            <UserScores maiID={maiID} />
        </Box>
    )
}

export const UserIconAndName = ({user}: {user: User}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                p: 2,
                mt: 2,
                mb: 2,
                borderRadius: '6px',
                border: '1px solid rgb(195, 209, 220)',
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'gray',
                    borderRadius: '6px',
                }}
            ></Box>
            <Box sx={{ml: 2}}>
                <Typography
                    component="span"
                    sx={{fontSize: '1.5rem', fontWeight: 'bold'}}
                >
                    {user.gameName}
                </Typography>
                <Typography
                    component="span"
                    sx={{color: 'text.secondary', fontSize: '1.5rem', ml: 1}}
                >
                    #{user.tagLine}
                </Typography>
            </Box>
        </Box>
    )
}
