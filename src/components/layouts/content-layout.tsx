import * as React from 'react'

import {Head} from '../seo'

import {Footer} from './footer'
import {Header} from './header'

type ContentLayoutProps = {
    children: React.ReactNode
    title: string
}

export const ContentLayout = ({children, title}: ContentLayoutProps) => {
    document.body.classList = 'bg-gray-900 text-white'

    return (
        <>
            <Head title={title} />
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex flex-col items-center flex-grow w-full max-w-[1000px] mx-auto">
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}
