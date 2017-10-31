
import reportsSaga from './reports/saga';
import { fork } from 'redux-saga/effects';

export default function* root() {
    yield fork(reportsSaga);
}
