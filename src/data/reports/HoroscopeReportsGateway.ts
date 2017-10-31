
import { HoroscopeReportsGateway, HoroscopeReports, HoroscopeReportsGetProps } from '../../domain';
// import fetch from 'node-fetch';
import 'cross-fetch/polyfill';

export function createHoroscopeReportsGateway(api: { host: string }): HoroscopeReportsGateway {
    return {
        get(props: HoroscopeReportsGetProps): Promise<HoroscopeReports> {
            const url = api.host + `/daily-reports.json?lang=${props.lang}&client=${props.client}&date=${props.date || ''}`;

            return Promise.race([
                fetch(url),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 5000)
                )
            ]).then(res => (<Response>res).json()).then(json => json && json.data);
        }
    };
}
