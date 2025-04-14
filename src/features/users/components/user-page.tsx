import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useInfiniteQuery, useMutation} from '@tanstack/react-query'

import {Button} from '@/components/ui/button'
import {Score, User} from '@/types/api'
import {getScoreRank} from '@/utils/maimai'

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
        return <div>Loading...</div>
    if (userQuery.error) return <div>Error loading user data</div>
    if (scoresQuery.error) return <div>Error loading user scores</div>

    const user: User | undefined = userQuery?.data?.data

    if (!user) return <div>User Not Found</div>

    // Update Button
    const lastScrapedAt = new Date(user.lastScrapedAt).getTime()
    const now = new Date().getTime()
    const updateCD = 5 * 1000 * 60 // 5 minutes
    const updateAvailableAt = lastScrapedAt + updateCD
    const disableUpdateButton =
        now < updateAvailableAt || updateUserMutation.isPending

    const handleUpdateButton = () => {
        updateUserMutation.mutate({maiID})
    }

    return (
        <div className="px-2 my-4">
            {/* Profile section */}
            <div className="flex">
                {/* Profile Icon */}
                <div className="w-[100px] h-[100px] bg-gray-400 rounded">
                    {/* TODO: Profile picture here */}
                </div>

                {/* User Info */}
                <div className="ml-4 flex flex-col justify-between">
                    <div className="text-xl font-bold flex items-center gap-2">
                        <span>{user.gameName}</span>
                        <span className="text-gray-500">#{user.tagLine}</span>
                    </div>

                    <div>
                        <Button
                            size="small"
                            onClick={handleUpdateButton}
                            isLoading={updateUserMutation.isPending}
                            disabled={disableUpdateButton}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-around items-center p-4 my-4 bg-slate-800 rounded border border-gray-700 shadow-md">
                <div className="text-center">
                    <div className="text-2xl font-bold">{user.rating}</div>
                    <div className="text-sm text-gray-400">Rating</div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-600 mx-4" />

                <div className="text-center">
                    <div className="text-2xl font-bold">
                        {user.totalPlayCount}
                    </div>
                    <div className="text-sm text-gray-400">Total Plays</div>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-gray-600 mx-4" />

                <div className="text-center">
                    <div className="text-2xl font-bold">
                        {user.seasonPlayCount}
                    </div>
                    <div className="text-sm text-gray-400">Season Plays</div>
                </div>
            </div>

            {/* Recent Scores */}
            <div className="mb-2">
                <span className="text-white underline decoration-lime-400 font-semibold">
                    Recent
                </span>
            </div>

            {/* TODO: loading circle */}
            {updateUserMutation.isPending ?? (
                <div className="my-2">Loading...</div>
            )}

            {scoresQuery.data?.pages.map(page =>
                page.data.scores?.map((score: Score) => (
                    <ScoreCard key={score.scoreID} score={score} />
                )),
            )}

            {scoresQuery.hasNextPage && !scoresQuery.isFetching && (
                <div className="text-center">
                    <Button
                        size="small"
                        onClick={() => scoresQuery.fetchNextPage()}
                        disabled={scoresQuery.isFetchingNextPage}
                    >
                        <FontAwesomeIcon icon={faAngleDown} className="mx-3" />
                        SHOW MORE
                        <FontAwesomeIcon icon={faAngleDown} className="mx-3" />
                    </Button>
                </div>
            )}
        </div>
    )
}

const ScoreCard = ({score}: {score: Score}) => {
    return (
        <div className="flex items-center bg-slate-800 text-white rounded border border-zinc-700 mb-4 p-2 w-full max-w-3xl mx-auto">
            {/* Image */}
            <img
                src={score.imageUrl}
                alt={score.title}
                className="w-24 h-24 object-cover rounded-lg"
            />

            {/* Main Info */}
            <div className="flex flex-col h-24 items-stretch justify-between flex-grow ml-4">
                <div>
                    <h3 className="text-sm">{score.title}</h3>
                    <p className="text-xs text-zinc-400">by {score.artist}</p>
                </div>

                <div className="flex items-center gap-4 mt-2">
                    {/* Rank */}
                    <ScoreRankBadge accuracy={score.accuracy} />

                    {/* Accuracy */}
                    <div className="text-lime-400 font-semibold text-lg sm:text-xl">
                        {score.accuracy}
                    </div>
                </div>
            </div>
        </div>
    )
}

type ScoreRankBadgeProps = {
    accuracy: string
}

const rankColors: Record<string, string> = {
    'SSS+': 'bg-yellow-400 text-black',
    SSS: 'bg-yellow-300 text-black',
    'SS+': 'bg-orange-400 text-white',
    SS: 'bg-orange-300 text-black',
    'S+': 'bg-red-400 text-white',
    S: 'bg-red-300 text-black',
    AAA: 'bg-purple-500 text-white',
    AA: 'bg-purple-400 text-white',
    A: 'bg-blue-500 text-white',
    BB: 'bg-blue-400 text-white',
    B: 'bg-green-400 text-black',
    C: 'bg-lime-400 text-black',
    D: 'bg-gray-400 text-white',
    Invalid: 'bg-black text-white',
}

export const ScoreRankBadge = ({accuracy}: ScoreRankBadgeProps) => {
    const rank = getScoreRank(accuracy)
    const color = rankColors[rank] || 'bg-black text-white'

    return (
        <div
            className={`w-15 h-8 inline-flex items-center justify-center text-xs font-bold rounded-md ${color}`}
        >
            {rank}
        </div>
    )
}
