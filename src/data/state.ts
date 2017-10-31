
import { ReportsState } from './reports/state';

export interface AppState {
    language: string
}

export interface State {
    app?: AppState
    reports?: ReportsState
}
