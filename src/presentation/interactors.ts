
import { AsyncStorage } from 'react-native';
import { Config } from './Config';
import { Store } from 'redux';
import { createHoroscopeReportsInteractor, HoroscopeReportsInteractor, createUserInteractor, UserInteractor } from '../domain';
import { createReduxReportsGateway, State, createCacheStorage, createReduxUserGateway } from '../data';
import { Analytics } from './analytics';

export interface Interactors {
    readonly reports: HoroscopeReportsInteractor
    readonly user: UserInteractor
}

let Instance: Interactors;

export function getInstance() {
    return Instance;
}

export function configureInteractors(store: Store<State>) {

    const cache = createCacheStorage(AsyncStorage);

    const reportsGateway = createReduxReportsGateway({
        cache: cache,
        apiConfig: { host: Config.ApiHost, client: Config.ApiClient },
        dispatch: store.dispatch,
        getState: store.getState,
        analytics: Analytics
    });

    const reportsInteractor = createHoroscopeReportsInteractor(reportsGateway);

    const userGateway = createReduxUserGateway({
        cache: cache,
        dispatch: store.dispatch,
        getState: store.getState
    });

    const userInteractor = createUserInteractor(userGateway);

    Instance = {
        reports: reportsInteractor,
        user: userInteractor
    };

    return Instance;
}
