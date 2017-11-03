
import { createZodiacSign, ZodiacSign } from '../../entities';
import { HoroscopeReport } from '../../../domain';

export interface ReportItemViewData {
    id: string
    text: string
    sign: ZodiacSign
}

export function createReportItemViewData(report: HoroscopeReport): ReportItemViewData {
    return {
        id: report.id,
        text: report.text.split(/\n/g)[0].trim(),
        sign: createZodiacSign(report.sign)
    }
}
