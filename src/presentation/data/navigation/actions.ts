
import { NavigationRoute } from './route';

export enum NavigationActionTypes {
    NAVIGATE = 'NAV_NAVIGATE',
    REPLACE = 'NAV_REPLACE',
}

export interface NavigationAction {
    type: NavigationActionTypes
}

export interface NavigateAction extends NavigationAction {
    route: NavigationRoute
}

export function navigate(route: NavigationRoute)
    : NavigateAction {
    return {
        type: NavigationActionTypes.NAVIGATE,
        route: route
    };
}

export function replace(route: NavigationRoute)
    : NavigateAction {
    return {
        type: NavigationActionTypes.REPLACE,
        route: route
    };
}
