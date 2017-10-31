
import { ZodiacSignViewData, createZodiacSignViewData } from '../zodiacSign/ZodiacSignViewData';
import { HoroscopeReport } from '../../../domain';

export interface ReportItemViewData {
    id: string
    text: string
    sign: ZodiacSignViewData
}

export function createReportItemViewData(report: HoroscopeReport): ReportItemViewData {
    return {
        id: report.id,
        text: report.text,
        sign: createZodiacSignViewData(report.sign)
    }
}
