
import { ReportItemViewData, createReportItemViewData } from '../reportItem/ReportItemViewData';
import { HoroscopeReports } from '../../../domain';

export interface ReportsViewData {
    items: ReportItemViewData[]
}

export function createReportsViewData(reports: HoroscopeReports): ReportsViewData {
    return {
        items: reports && reports.reports && reports.reports.map(createReportItemViewData)
    }
}

