
export enum NavigationRouteKey {
    START = 'START',
    SIGN = 'SIGN',
    REPORTS = 'REPORTS',
    SELECT_SIGN = 'SELECT_SIGN',
}

export const START_ROUTE_KEY: NavigationRouteKey = NavigationRouteKey.START;

export interface NavigationRoute {
    key: NavigationRouteKey
    params?: { [key: string]: any }

    previous?: NavigationRoute
}
