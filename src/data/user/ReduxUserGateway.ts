
import { UserGateway, User } from '../../domain';
import { Dispatch } from 'redux';
import { CacheStorage } from '../CacheStorage';
import { State } from '../state';
import { loadUser, loadUserError, loadUserSuccess, saveUser, saveUserError, saveUserSuccess } from './actions';
import { createApiUserGateway } from './ApiUserGateway';

export type UserGatewayParams = {
    cache: CacheStorage
    dispatch: Dispatch
    getState: () => State
}

export function createReduxUserGateway(params: UserGatewayParams): UserGateway {

    const { dispatch, getState } = params;
    const apiGateway = createApiUserGateway(params.cache);

    return {
        load() {
            dispatch(loadUser());

            return apiGateway.load()
                .then(data => {
                    dispatch(loadUserSuccess(data));
                    return data;
                })
                .catch(error => {
                    dispatch(loadUserError(error));
                    return null;
                });
        },
        save(user: User) {
            dispatch(saveUser());

            const state = getState();
            const stateUser = state.user && state.user.data || {};

            user = { ...stateUser, ...user };

            return apiGateway.save(user)
                .then(data => {
                    dispatch(saveUserSuccess(data));
                    return data;
                })
                .catch(error => {
                    dispatch(saveUserError(error));
                    return null;
                });
        }
    }
}
