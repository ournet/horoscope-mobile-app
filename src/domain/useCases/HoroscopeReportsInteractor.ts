
import { HoroscopeReports } from '../entities/HoroscopeReport';
import { HoroscopeReportsGateway, HoroscopeReportsGetProps } from './HoroscopeReportsGateway';

export interface HoroscopeReportsInteractor {
    get(props: HoroscopeReportsGetProps): Promise<HoroscopeReports>
}

export function createHoroscopeReportsInteractor(horoscopeReportsGateway: HoroscopeReportsGateway)
    : HoroscopeReportsInteractor {
    return {
        get(props: HoroscopeReportsGetProps) {
            return horoscopeReportsGateway.get(props);
        }
    };
}
