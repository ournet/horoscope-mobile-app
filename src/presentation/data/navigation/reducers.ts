
import { NavigationState } from './state';
import { NavigateAction, NavigationActionTypes, NavigationAction } from './actions';
import { NavigationRouteKey, START_ROUTE_KEY } from './route';

export function navigateReducer<A extends NavigateAction>(state: NavigationState, action: A): NavigationState {
    const currentRoute = state && state.route;
    const previousRoute = currentRoute && currentRoute.previous;
    const isBack = currentRoute && previousRoute && action.route && previousRoute.key === action.route.key;

    switch (action.type) {

        case NavigationActionTypes.NAVIGATE:
            if (!isBack) {
                action.route.previous = currentRoute;
            }
            return { route: action.route };

        case NavigationActionTypes.REPLACE:
            if (previousRoute) {
                action.route.previous = previousRoute;
            }
            return { route: action.route };

        case NavigationActionTypes.GO_BACK:
            if (previousRoute) {
                return { route: previousRoute };
            }

        // default:
        // return state || { route: { key: START_ROUTE_KEY } };
    }
    return state || { route: { key: START_ROUTE_KEY } };
}
