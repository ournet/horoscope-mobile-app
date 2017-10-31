
import { createStore, applyMiddleware } from 'redux'
import { reducer, saga, init, State, AppState } from '../data';
import { Config } from '../Config';
import createSagaMiddleware from 'redux-saga'

init(Config);

const sagaMiddleware = createSagaMiddleware();

const initialState: State = {
    app: { language: Config.CurrentLanguage }
};

export function configureStore() {
    const store = createStore<State>(reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(saga)

    return store
}
