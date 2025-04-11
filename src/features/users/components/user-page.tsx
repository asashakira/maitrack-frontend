import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import {useInfiniteQuery, useMutation} from '@tanstack/react-query'

import {Score, User} from '@/types/api'

import {useUser} from '../api/get-user'
import {fetchScores} from '../api/get-user-scores'
import {updateUser} from '../api/update-user-page'

export const UserPage = ({maiID}: {maiID: string}) => {
    const userQuery = useUser({
        maiID,
    })

    const scoresQuery = useInfiniteQuery({
        queryKey: ['scores', maiID],
        queryFn: ({pageParam}) => fetchScores({pageParam, maiID}),
        initialPageParam: 0,
        getNextPageParam: lastPage =>
            lastPage.data.hasMore ? lastPage.data.nextOffset : undefined,
    })

    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            userQuery.refetch()
            scoresQuery.refetch()
        },
    })

    if (userQuery.isLoading || scoresQuery.isLoading)
        return <Box>Loading...</Box>
    if (userQuery.error) return <Box>Error loading user data</Box>
    if (scoresQuery.error) return <Box>Error loading user scores</Box>

    const user: User | undefined = userQuery?.data?.data

    if (!user) return <Box>User Not Found</Box>

    const handleUpdateButton = () => {
        updateUserMutation.mutate({userID: user.userID})
    }

    return (
        <Box sx={{m: 0}}>
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
                {/* Profile Icon */}
                <Box
                    sx={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'gray',
                        borderRadius: '6px',
                    }}
                >
                    {/* TODO: Profile picture here */}
                </Box>

                <Box
                    sx={{
                        ml: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Info */}
                    <Box>
                        <Typography
                            component="span"
                            sx={{fontSize: '1.5rem', fontWeight: 'bold'}}
                        >
                            {user.gameName}
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                color: 'text.secondary',
                                fontSize: '1.5rem',
                                ml: 1,
                            }}
                        >
                            #{user.tagLine}
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box>
                        <Button
                            variant="contained"
                            onClick={handleUpdateButton}
                            disabled={updateUserMutation.isPending}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Box>

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
                <Box>
                    <Typography>{user.totalPlayCount}</Typography>
                    <Typography>{user.seasonPlayCount}</Typography>
                </Box>
            </Box>

            {scoresQuery.data?.pages.map(page =>
                page.data.scores.map((score: Score) => (
                    <ScoreCard key={score.scoreID} score={score} />
                )),
            )}
            {scoresQuery.hasNextPage && !scoresQuery.isFetching && (
                <Button
                    onClick={() => scoresQuery.fetchNextPage()}
                    disabled={scoresQuery.isFetchingNextPage}
                >
                    SHOW MORE
                </Button>
            )}

            {scoresQuery.isFetching && <Box>Fetching more data...</Box>}
        </Box>
    )
}

const ScoreCard = ({score}: {score: Score}) => {
    return (
        <Card
            variant="outlined"
            sx={{boxShadow: 2, display: 'flex', m: 0, mb: 2, minWidth: 900}}
        >
            <CardMedia
                sx={{height: 150, width: 150}}
                image={score.imageUrl}
                title={score.title}
            />
            <CardContent
                sx={{display: 'flex', flex: 1, justifyContent: 'space-between'}}
            >
                <Box>
                    <Typography>{score.title}</Typography>
                    <Typography
                        sx={{color: 'text.secondary', fontSize: '0.75rem'}}
                    >
                        by {score.artist}
                    </Typography>
                </Box>
                <Typography component="div">{score.accuracy}</Typography>
            </CardContent>
        </Card>
    )
}
