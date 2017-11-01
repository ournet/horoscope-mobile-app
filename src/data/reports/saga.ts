
import { HoroscopeReports, createHoroscopeReportsInteractor, convertDateToNumber } from '../../domain';
import { call, put, fork, takeLatest, select } from 'redux-saga/effects';
import { createHoroscopeReportsGateway } from './HoroscopeReportsGateway';
import { getReportsError, getReportsSuccess, ReportsActionTypes, GetReportsAction, ReportsActionProps } from './actions';
import { getConfig } from '../config';
import { AppState, State } from '../state';

const Config = getConfig();

const reportsGateway = createHoroscopeReportsGateway({
    host: Config.ApiHost,
    client: Config.ApiClient
});

const reportsInteractor = createHoroscopeReportsInteractor(reportsGateway);

function* fetchReports(action: GetReportsAction) {
    const appState = yield select<State>(state => state.app);
    const props: ReportsActionProps = { lang: appState.language, date: convertDateToNumber(new Date()), ...action.props };

    try {
        const reports: HoroscopeReports = yield call(reportsInteractor.get, props);
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
