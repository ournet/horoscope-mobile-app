
import { createStore, applyMiddleware } from 'redux'
import { reducer, saga, init, AppState } from '../data';
import { Config } from '../Config';
import createSagaMiddleware from 'redux-saga'

init(Config);

const sagaMiddleware = createSagaMiddleware();

const initialState: AppState = {
    language: Config.CurrentLanguage
};

export function configureStore() {
    const store = createStore<AppState>(reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(saga)
    return store
}
