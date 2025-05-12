import {useParams} from 'react-router-dom'

import {ContentLayout} from '@/components/layouts'
import {SongView} from '@/features/songs/components/song-view'

const SongRoute = () => {
    const params = useParams()
    const songID = params.songID as string
    return (
        <ContentLayout>
            <SongView songID={songID} />
        </ContentLayout>
    )
}

export default SongRoute
