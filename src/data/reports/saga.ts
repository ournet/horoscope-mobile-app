
import { HoroscopeReports } from '../../domain';
import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { createHoroscopeReportsGateway } from './HoroscopeReportsGateway';
import { getReportsError, getReportsSuccess, ReportsActionTypes, GetReportsAction } from './actions';
import { getConfig } from '../config';

const horoscopeReportsGateway = createHoroscopeReportsGateway({ host: getConfig().ApiHost });

function* fetchReports(action: GetReportsAction) {
    const props = action.props;
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
