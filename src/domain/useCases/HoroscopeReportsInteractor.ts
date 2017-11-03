
import { HoroscopeReports } from '../entities/HoroscopeReport';
import { HoroscopeReportsGateway, HoroscopeReportsGetProps } from './HoroscopeReportsGateway';

export interface HoroscopeReportsInteractor {
    get(props: HoroscopeReportsGetProps): Promise<HoroscopeReports>
}

export function createHoroscopeReportsInteractor(gateway: HoroscopeReportsGateway)
    : HoroscopeReportsInteractor {
    return {
        get(props: HoroscopeReportsGetProps) {
            return gateway.get(props);
        }
    };
}
