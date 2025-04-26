import * as React from 'react'

import {Footer} from './footer'
import {Header} from './header'

type ContentLayoutProps = {
    children: React.ReactNode
    title?: string
}

export const ContentLayout = ({children}: ContentLayoutProps) => {
    document.body.classList = 'bg-gray-900 text-white'

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col items-center flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    )
}
