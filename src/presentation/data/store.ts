
import { createStore } from 'redux';
import { State } from './state';
import { AppReducer } from './reducers';

export function configureStore() {
    return createStore<State>(AppReducer);
}
