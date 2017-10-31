
import { HoroscopeReports, HoroscopeReportsGetProps } from '../../domain';
import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import { createHoroscopeReportsGateway } from './HoroscopeReportsGateway';
import { getReportsError, getReportsSuccess, ReportsActionTypes, GetReportsAction } from './actions';
import { getConfig } from '../config';
import { AppState, State } from '../state';

const Config = getConfig();

const horoscopeReportsGateway = createHoroscopeReportsGateway({
    host: Config.ApiHost,
    client: Config.ApiClient
});

function* fetchReports(action: GetReportsAction) {
    const appState = yield select<State>(state => state.app);
    const props: HoroscopeReportsGetProps = { lang: appState.language, ...action.props };

    try {
        const reports: HoroscopeReports = yield call(horoscopeReportsGateway.get, props);
        yield put(getReportsSuccess(props, reports));
    } catch (e) {
        yield put(getReportsError(props, e));
    }
}

function* watchfetchReports() {
    yield takeLatest(ReportsActionTypes.GET_REPORTS_REQUESTED, fetchReports);
}

export default function* root() {
    yield fork(watchfetchReports);
}
