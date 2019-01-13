
import { NavigationActionTypes } from './actions';
import { NavigationRouteKey, NavigationRoute } from './route';

export type RouteChangedCallback = (oldRoute: NavigationRoute, newRoute: NavigationRoute) => void

export interface INavigator {
    navigate(route: NavigationRoute): NavigationRoute
    replace(route: NavigationRoute): NavigationRoute
    goBack(): NavigationRoute

    addRouteChangedCallback: (callback: RouteChangedCallback) => void
    removeRouteChangedCallback: (callback: RouteChangedCallback) => void
}

export class Navigator implements INavigator {
    private emitters: RouteChangedCallback[] = []
    constructor(private route: NavigationRoute) {

    }
    navigate(route: NavigationRoute): NavigationRoute {
        return this.nav(route, NavigationActionTypes.NAVIGATE);
    }
    replace(route: NavigationRoute): NavigationRoute {
        return this.nav(route, NavigationActionTypes.REPLACE);
    }
    goBack(): NavigationRoute {
        return this.nav(this.route, NavigationActionTypes.GO_BACK);
    }

    addRouteChangedCallback(callback: RouteChangedCallback) {
        this.emitters.push(callback);
    }
    removeRouteChangedCallback(callback: RouteChangedCallback) {
        const index = this.emitters.indexOf(callback);
        if (index >= 0) {
            this.emitters.splice(index, 1);
        }
    }

    private nav(route: NavigationRoute, type: NavigationActionTypes) {
        const newRoute = this._nav(route, type);

        this.emitters.forEach(item => item(route, newRoute));

        return newRoute;
    }

    private _nav(route: NavigationRoute, type: NavigationActionTypes): NavigationRoute {
        const currentRoute = this.route;
        const previousRoute = currentRoute && currentRoute.previous;
        const isBack = currentRoute && previousRoute && previousRoute.key === route.key;

        switch (type) {

            case NavigationActionTypes.NAVIGATE:
                if (!isBack) {
                    route.previous = currentRoute;
                }
                // is HOME page
                if (route.key === NavigationRouteKey.SIGN) {
                    route.previous = null;
                }
                return route;

            case NavigationActionTypes.REPLACE:
                if (previousRoute && previousRoute.key !== route.key) {
                    route.previous = previousRoute;
                }
                return route;

            case NavigationActionTypes.GO_BACK:
                if (previousRoute) {
                    return previousRoute;
                }

            // default:
            // return state || { route: { key: START_ROUTE_KEY } };
        }
        return this.route;
    }
}
