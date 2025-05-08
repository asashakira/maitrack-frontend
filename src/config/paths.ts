export const paths = {
    home: {
        path: '/',
        getHref: () => '/',
    },

    auth: {
        register: {
            path: '/auth/register',
            getHref: (redirectTo?: string | null | undefined) =>
                `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
        login: {
            path: '/auth/login',
            getHref: (redirectTo?: string | null | undefined) =>
                `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
        logout: {
            path: '/auth/logout',
            getHref: () => `/auth/logout`,
        },
    },

    users: {
        path: '/users/:maiID',
        getHref: (id: string) => `/users/${id}`,
    },

    settings: {
        path: '/settings',
        getHref: () => '/settings',
    },

    songs: {
        path: '/songs',
        getHref: () => '/songs',
    },
    song: {
        path: '/songs/:songID',
        getHref: (id: string) => `/songs/${id}`,
    },
} as const
