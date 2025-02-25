import {useParams} from 'react-router-dom'

import {ContentLayout} from '@/components/layouts'
import {UserPage} from '@/features/users/components/user-page'

const UserRoute = () => {
    const params = useParams()
    const maiID = params.maiID as string

    return (
        <ContentLayout title={maiID}>
            <UserPage maiID={maiID} />
        </ContentLayout>
    )
}

export default UserRoute
