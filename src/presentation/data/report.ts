import { HoroscopeReport as DataHoroscopeReport, HoroscopeReports as DataHoroscopeReports } from '../../domain/entities/HoroscopeReport';
import { ViewZodiacSign, createViewZodiacSign } from "./zodiac-sign";
import { ValidLanguage } from '../languages';

export type ViewHoroscopeReport = {
    id: string
    text: string
    sign: ViewZodiacSign
    numbers: number[]
    stats: {
        health: number
        love: number
        success: number
    }
}

export type ViewHoroscopeReports = {
    reports: ViewHoroscopeReport[]
    period: string
}

export class ViewHoroscopeReportMapper {
    static fromData(dataReport: DataHoroscopeReport, lang: ValidLanguage): ViewHoroscopeReport {
        return {
            id: dataReport.id,
            text: dataReport.text,
            sign: createViewZodiacSign(dataReport.sign, lang),
            numbers: dataReport.numbers,
            stats: dataReport.stats,
        }
    }
}

export class ViewHoroscopeReportsMapper {
    static fromData(data: DataHoroscopeReports, lang: ValidLanguage): ViewHoroscopeReports {
        return {
            period: data.period,
            reports: data.reports.map(item => ViewHoroscopeReportMapper.fromData(item, lang)),
        }
    }
}
