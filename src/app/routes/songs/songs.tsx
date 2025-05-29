import {ContentLayout} from '@/components/layouts'
import {SongsList} from '@/features/songs/components/songs-list'

const SongsRoute = () => {
    return (
        <ContentLayout title="Songs">
            <SongsList />
        </ContentLayout>
    )
}

export default SongsRoute
