
import { Dispatch } from 'redux';
import { State } from '../state';
import { navigate, replace } from './actions';
import { NavigationRoute } from './route';

export type NavigationInteractorParams = {
    dispatch: Dispatch<State>
    getState: () => State
}

export interface NavigationInteractor {
    navigate(route: NavigationRoute):void
    replace(route: NavigationRoute):void
}

export function createNavigationInteractor(params: NavigationInteractorParams): NavigationInteractor {

    const { dispatch, getState } = params;

    return {
        navigate(route: NavigationRoute) {
            dispatch(navigate(route))
        },
        replace(route: NavigationRoute) {
            dispatch(replace(route))
        },
    }
}