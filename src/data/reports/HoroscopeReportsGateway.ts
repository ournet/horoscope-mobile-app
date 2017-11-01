
import { HoroscopeReportsGateway, HoroscopeReports, HoroscopeReportsGetProps } from '../../domain';
// import fetch from 'node-fetch';
import 'cross-fetch/polyfill';
import { Cache, CacheInstance } from '../CacheStorage';
const ms = require('ms');

export function createHoroscopeReportsGateway(api: { host: string, client: string }, cache?: Cache): HoroscopeReportsGateway {
    cache = cache || CacheInstance;

    return {
        getFromApi(props: HoroscopeReportsGetProps) {
            return getFromApi(api, props);
        },
        getFromCache(key: string) {
            return cache.get<HoroscopeReports>(key);
        },
        saveToCache(key: string, data: HoroscopeReports) {
            return cache.put(key, data, ms('2d'));
        }
    };
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
