
import { ZodiacSignId } from './ZodiacSignId';

export interface HoroscopeReport {
    id: string
    period: string
    text: string
    sign: ZodiacSignId
}

export interface HoroscopeReports {
    date: number
    reports: HoroscopeReport[]
}
