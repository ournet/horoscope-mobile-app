
import { ReportsState } from './reports/state';
import { UserState } from './user/state';

export interface State {
    user?: UserState
    reports?: ReportsState
}
