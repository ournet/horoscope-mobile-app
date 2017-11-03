
import { HoroscopeReportsGateway, HoroscopeReports, HoroscopeReportsGetProps } from '../../domain';
import 'cross-fetch/polyfill';
import { CacheStorage } from '../CacheStorage';
const ms = require('ms');

function formatKey(lang: string, date: number) {
    return `reports:${lang.trim().toLowerCase()}:${date.toString()}`;
}

export function createApiReportsGateway(apiConfig: { host: string, client: string }, cache: CacheStorage): HoroscopeReportsGateway {

    return {
        get(props: HoroscopeReportsGetProps) {
            const key = formatKey(props.lang, props.date);

            return cache.get<HoroscopeReports>(key)
                .then(data => {
                    if (data) {
                        return data;
                    }
                    return getFromApi(apiConfig, props)
                        .then(apiData => cache.put(key, apiData, ms('2d')));
                });
        }
    }
}


function getFromApi(api: { host: string, client: string }, props: HoroscopeReportsGetProps): Promise<HoroscopeReports> {
    if (!props || !props.date || !props.lang) {
        return Promise.reject(new Error(`Invalid props param!`));
    }
    const url = api.host + `/daily-reports.json?lang=${props.lang}&client=${props.client || api.client}&date=${props.date}`;

    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 5000)
        )
    ])
        .then(res => (<Response>res).json())
        .then(json => {
            if (json.error) {
                return Promise.reject(new Error(`API error: ${json.error.message}`));
            }
            return json.data;
        });
}
