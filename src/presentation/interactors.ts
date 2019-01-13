
import { AsyncStorage } from 'react-native';
import { Config } from './config';
import { createHoroscopeReportsInteractor, HoroscopeReportsInteractor, createUserInteractor, UserInteractor } from '../domain';
import { createCacheStorage } from '../data/cache-storage';
import { createApiReportsGateway } from '../data/reports/api-reports-gateway';
import { createApiUserGateway } from '../data/user/api-user-gateway';

export interface Interactors {
    readonly reports: HoroscopeReportsInteractor
    readonly user: UserInteractor
}

let Instance: Interactors;

export function configureInteractors() {

    const reportsCacheStorage = createCacheStorage(AsyncStorage, { size: 20 });

    const reportsGateway = createApiReportsGateway({ host: Config.ApiHost, client: Config.ApiClient }, reportsCacheStorage);

    const reportsInteractor = createHoroscopeReportsInteractor(reportsGateway);

    const userCacheStorage = createCacheStorage(AsyncStorage, { size: 2 });

    const userGateway = createApiUserGateway(userCacheStorage);

    const userInteractor = createUserInteractor(userGateway);

    Instance = {
        reports: reportsInteractor,
        user: userInteractor,
    };

    return Instance;
}
