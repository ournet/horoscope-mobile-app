
import { combineReducers } from 'redux';
import { State } from './state';
import { reportsReducer, userReducer } from '../../data';
import { navigateReducer } from './navigation/reducers';

export const AppReducer = combineReducers<State>({
    navigation: navigateReducer,
    user: userReducer,
    reports: reportsReducer
});
