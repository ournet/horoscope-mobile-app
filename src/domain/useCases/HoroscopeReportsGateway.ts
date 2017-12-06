
import { HoroscopeReports } from '../entities/HoroscopeReport';

export type HoroscopeReportsGetProps = {
    lang?: string
    period?: string
    client?: string
}

export interface HoroscopeReportsGateway {
    get(props: HoroscopeReportsGetProps): Promise<HoroscopeReports>
}
