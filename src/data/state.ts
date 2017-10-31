
import { ReportsState } from './reports/state';

export interface AppState {
    language: string
    reports?: ReportsState
}
