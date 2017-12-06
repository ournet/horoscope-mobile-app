
import { HoroscopeReportsGateway, HoroscopeReportsGetProps } from '../../domain';
import { Dispatch } from 'redux';
import { CacheStorage } from '../CacheStorage';
import { State } from '../state';
import { getReports, getReportsError, getReportsSuccess, ReportsActionProps } from './actions';
import { createApiReportsGateway } from './ApiReportsGateway';

export type ReportsGatewayParams = {
    apiConfig: { host: string, client: string }
    cache: CacheStorage
    dispatch: Dispatch<State>
    getState: () => State
}

export function createReduxReportsGateway(params: ReportsGatewayParams): HoroscopeReportsGateway {

    const { dispatch, getState } = params;
    const apiGateway = createApiReportsGateway(params.apiConfig, params.cache);

    return {
        get(props: HoroscopeReportsGetProps) {

            // const state = getState();

            const actionProps: ReportsActionProps = <ReportsActionProps>props;

            dispatch(getReports(actionProps));
            return apiGateway.get(actionProps)
                .then(data => {
                    dispatch(getReportsSuccess(actionProps, data));
                    return data;
                })
                .catch(error => {
                    dispatch(getReportsError(actionProps, error));
                    return null;
                });
        }
    }
}
