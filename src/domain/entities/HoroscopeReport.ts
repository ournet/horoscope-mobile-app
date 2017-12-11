
import { ZodiacSignId } from './ZodiacSignId';

export interface HoroscopeReportStats {
    health: number
    love: number
    success: number
}

export interface HoroscopeReport {
    id: string
    period: string
    text: string
    sign: ZodiacSignId
    numbers: number[]
    stats: HoroscopeReportStats
}

export interface HoroscopeReports {
    date: number
    reports: HoroscopeReport[]
}
