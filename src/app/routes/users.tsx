import {useParams} from 'react-router-dom'

import {ContentLayout} from '@/components/layouts'
import {UserPage} from '@/features/users/components/user-page'

const UserRoute = () => {
    const params = useParams()
    const userID = params.userID as string

    return (
        <ContentLayout title={userID}>
            <UserPage userID={userID} />
        </ContentLayout>
    )
}

export default UserRoute
