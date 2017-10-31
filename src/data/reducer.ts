
import { combineReducers } from 'redux';
import { reportsReducer } from './reports/reducers';
import { State } from './state';

export default combineReducers<State>({
    app: (state: State) => state || null,
    reports: reportsReducer
});
