import {useParams} from 'react-router-dom'

import {ContentLayout} from '@/components/layouts'
import {Spinner} from '@/components/ui/spinner/spinner'
import {useSong} from '@/features/songs/api/get-song'
import {SongView} from '@/features/songs/components/song-view'

const SongRoute = () => {
    const params = useParams()
    const songID = params.songID as string
    const songQuery = useSong({songID})

    if (songQuery.isLoading) {
        return (
            <ContentLayout title="">
                <div className="flex h-48 w-full items-center justify-center">
                    <Spinner size="lg" />
                </div>
            </ContentLayout>
        )
    }

    const song = songQuery?.data?.data

    if (!song) return null

    return (
        <ContentLayout title={song.title}>
            <SongView songID={songID} />
        </ContentLayout>
    )
}

export default SongRoute
