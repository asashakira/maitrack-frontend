import {ContentLayout} from '@/components/layouts'
import {useUser} from '@/lib/auth'

const SettingsRoute = () => {
    const user = useUser()

    if (!user.data) return null

    return (
        <ContentLayout title="Settings">
            <div>{user.data.username}</div>
        </ContentLayout>
    )
}

export default SettingsRoute
