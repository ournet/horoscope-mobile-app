
import { ReportItemViewData, createReportItemViewData } from '../reportItem/ReportItemViewData';
import { ReportsState } from '../../../data/reports/state';

export interface ReportsViewData {
    items: ReportItemViewData[]
    isLoading: boolean
    error?: string
    period?: string
}

export function createReportsViewData(state: ReportsState): ReportsViewData {
    const viewData: ReportsViewData = { isLoading: state.isLoading, items: [], period: state.period };
    if (state.error) {
        viewData.error = state.error.message;
    }
    else if (state.data && state.data.reports) {
        viewData.items = state.data.reports.map(createReportItemViewData)
    }
    return viewData;
}

