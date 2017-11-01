
import { HoroscopeReports } from '../entities/HoroscopeReport';
import { HoroscopeReportsGateway, HoroscopeReportsGetProps } from './HoroscopeReportsGateway';

export interface HoroscopeReportsInteractor {
    get(props: HoroscopeReportsGetProps): Promise<HoroscopeReports>
}

export function createHoroscopeReportsInteractor(gateway: HoroscopeReportsGateway)
    : HoroscopeReportsInteractor {
    return {
        get(props: HoroscopeReportsGetProps) {
            const key = formatKey(props.lang, props.date);
            
            return gateway.getFromCache(key)
                .then(data => {
                    if (data) {
                        return data;
                    }
                    return gateway.getFromApi(props)
                        .then(apiData => gateway.saveToCache(key, apiData));
                });
        }
    };
}

function formatKey(lang: string, date: number) {
    return `reports:${lang.trim().toLowerCase()}:${date.toString()}`;
}
