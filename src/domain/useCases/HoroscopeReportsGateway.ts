
import { HoroscopeReports } from '../entities/HoroscopeReport';

export type HoroscopeReportsGetProps = {
    lang: string
    date: number
    client: string
}

export interface HoroscopeReportsGateway {
    getFromApi(props: HoroscopeReportsGetProps): Promise<HoroscopeReports>
    getFromCache(key: string): Promise<HoroscopeReports>
    saveToCache(key: string, data: HoroscopeReports): Promise<HoroscopeReports>
}
