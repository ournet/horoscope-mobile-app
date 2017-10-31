
import { ZodiacSign } from './ZodiacSign';

export interface HoroscopeReport {
    id: string
    period: string
    text: string
    sign: ZodiacSign
}

export interface HoroscopeReports {
    date: number
    reports: HoroscopeReport[]
}
