
import { createStore, applyMiddleware } from 'redux'
import { init } from '../data/config';
import { Config } from '../Config';
import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from 'react-native';

init({ ApiClient: Config.ApiClient, ApiHost: Config.ApiHost, Storage: AsyncStorage });

import { reducer, saga, State, AppState } from '../data';

const sagaMiddleware = createSagaMiddleware();

const initialState: State = {
    app: { language: Config.CurrentLanguage }
};

export function configureStore() {
    const store = createStore<State>(reducer, initialState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(saga)

    return store
}
