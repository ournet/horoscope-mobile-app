
import { NavigationState } from './state';
import { NavigateAction, NavigationActionTypes, NavigationAction } from './actions';
import { NavigationRouteKey } from './route';

export function navigateReducer<A extends NavigateAction>(state: NavigationState, action: A): NavigationState {
    const currentRoute = state && state.route;
    const isBack = currentRoute && currentRoute.previous && currentRoute.previous.key === action.route.key;
    switch (action.type) {
        case NavigationActionTypes.NAVIGATE:
            if (!isBack) {
                action.route.previous = currentRoute;
            }
            return { route: action.route };
        default:
            return state || { route: { key: NavigationRouteKey.HOME } };
    }
}
