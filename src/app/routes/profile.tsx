import {Box} from '@mui/material'

import {ContentLayout} from '@/components/layouts'
import {useUser} from '@/lib/auth'

const ProfileRoute = () => {
    const user = useUser()

    if (!user.data) return null

    return (
        <ContentLayout title="Profile">
            <Box>User Profile</Box>
        </ContentLayout>
    )
}

export default ProfileRoute
