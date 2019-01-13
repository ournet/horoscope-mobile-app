
import { HoroscopeReportsGateway, HoroscopeReports, HoroscopeReportsGetProps } from '../../domain';
import 'cross-fetch/polyfill';
import { CacheStorage } from '../cache-storage';
const ms = require('ms');

function formatKey(lang: string, period: string) {
    return `reports:${lang.trim().toLowerCase()}:${period.toString()}`;
}

export function createApiReportsGateway(apiConfig: { host: string, client: string }, cache: CacheStorage): HoroscopeReportsGateway {

    return {
        async get(props: HoroscopeReportsGetProps) {
            const key = formatKey(props.lang, props.period);

            const data = await cache.get<HoroscopeReports>(key);
            if (data) {
                return data;
            }
            const apiData = await getFromApi(apiConfig, props);
            if (apiData && apiData.reports && apiData.reports.length) {
                await cache.put(key, apiData, ms('2d'));
            }
            return apiData;
        }
    }
}


async function getFromApi(api: { host: string, client: string }, props: HoroscopeReportsGetProps): Promise<HoroscopeReports> {
    if (!props || !props.period || !props.lang) {
        return Promise.reject(new Error(`Invalid props param!`));
    }
    const url = api.host + `/reports.json?lang=${props.lang}&client=${props.client || api.client}&period=${props.period}`;

    const res = await Promise.race([
        fetch(url),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
    ]);
    const json = await (<Response>res).json();
    if (json.error) {
        return Promise.reject(new Error(`API error: ${json.error.message}`));
    }
    return json.data;
}
