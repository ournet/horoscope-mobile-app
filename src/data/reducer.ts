
import { combineReducers } from 'redux';
import { reportsReducer } from './reports/reducers';
import { userReducer } from './user/reducers';
import { State } from './state';

export default combineReducers<State>({
    user: userReducer,
    reports: reportsReducer
});
