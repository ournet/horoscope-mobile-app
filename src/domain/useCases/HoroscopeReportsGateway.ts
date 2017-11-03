
import { HoroscopeReports } from '../entities/HoroscopeReport';

export type HoroscopeReportsGetProps = {
    lang?: string
    date?: number
    client?: string
}

export interface HoroscopeReportsGateway {
    get(props: HoroscopeReportsGetProps): Promise<HoroscopeReports>
}
