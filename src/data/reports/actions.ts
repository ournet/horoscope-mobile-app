
import { HoroscopeReportsGetProps, HoroscopeReports } from '../../domain';

export enum ReportsActionTypes {
    GET_REPORTS_REQUESTED = 'GET_REPORTS_REQUESTED',
    GET_REPORTS_ERRORED = 'GET_REPORTS_ERRORED',
    GET_REPORTS_SUCCESSED = 'GET_REPORTS_SUCCESSED'
}

export interface ReportsAction {
    type: ReportsActionTypes
}

export interface GetReportsAction extends ReportsAction {
    props: HoroscopeReportsGetProps
}

export interface GetReportsErrorAction extends GetReportsAction {
    error: Error
}

export interface GetReportsSuccessAction extends GetReportsAction {
    reports: HoroscopeReports
}

export type GetReportsActionType = GetReportsAction | GetReportsErrorAction | GetReportsSuccessAction;

export function getReports(props: HoroscopeReportsGetProps)
    : GetReportsAction {
    return {
        type: ReportsActionTypes.GET_REPORTS_REQUESTED,
        props: props
    };
}

export function getReportsError(props: HoroscopeReportsGetProps, error: Error)
    : GetReportsErrorAction {
    return {
        type: ReportsActionTypes.GET_REPORTS_ERRORED,
        props: props,
        error: error
    };
}

export function getReportsSuccess(props: HoroscopeReportsGetProps, reports: HoroscopeReports)
    : GetReportsSuccessAction {
    return {
        type: ReportsActionTypes.GET_REPORTS_SUCCESSED,
        props: props,
        reports: reports
    };
}