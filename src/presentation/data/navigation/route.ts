
export enum NavigationRouteKey {
    HOME = 'HOME'
}

export interface NavigationRoute {
    key: NavigationRouteKey
    params?: { [key: string]: any }

    previous?: NavigationRoute
}
