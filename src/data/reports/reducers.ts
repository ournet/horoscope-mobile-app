
import { ReportsState } from './state';
import { ReportsActionTypes, GetReportsActionType, GetReportsSuccessAction, GetReportsErrorAction } from './actions';

export function reportsReducer<A extends GetReportsActionType>(state: ReportsState, action: A): ReportsState {
    // state = {
    //     ...state,
    //     reportsDate: action.props.date
    // };

    switch (action.type) {
        case ReportsActionTypes.GET_REPORTS_REQUESTED:
            return {
                ...state,
                period: (<GetReportsSuccessAction>action).props.period,
                isLoading: true
            };
        case ReportsActionTypes.GET_REPORTS_ERRORED:
            return {
                ...state,
                isLoading: false,
                error: (<GetReportsErrorAction>action).error
            };
        case ReportsActionTypes.GET_REPORTS_SUCCESSED:
            return {
                ...state,
                isLoading: false,
                // date: (<GetReportsSuccessAction>action).props.date,
                data: (<GetReportsSuccessAction>action).reports
            };
        default:
            return state || null;
    }
}

// function formatDateNumber(date?: Date) {
//     date = date || new Date();
//     return parseInt('' + date.getFullYear() + '' + (date.getMonth() > 10 ? date.getMonth() : '0' + date.getMonth()) + '' + (date.getDate() > 10 ? date.getDate() : '0' + date.getDate()));
// }
