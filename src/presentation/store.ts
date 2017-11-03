
import { createStore } from 'redux';
import { reducer, State } from '../data';

export function configureStore() {
    const store = createStore<State>(reducer);
    return store;
}
