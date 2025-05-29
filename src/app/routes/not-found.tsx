import {ContentLayout} from '@/components/layouts'

const NotFoundRoute = () => {
    return (
        <ContentLayout title="Not Found">
            <div className="mt-52 flex flex-col items-center font-semibold">
                <p>Page not found!</p>
                <p>Sorry, the page you are looking for does not exist.</p>
            </div>
        </ContentLayout>
    )
}

export default NotFoundRoute
