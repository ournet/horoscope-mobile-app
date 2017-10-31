
import { combineReducers } from 'redux';
import { reportsReducer } from './reports/reducers';
import { AppState } from './state';

export default combineReducers<AppState>({
    language: (state: AppState) => ({ language: 'ro' }),
    reports: reportsReducer
});
