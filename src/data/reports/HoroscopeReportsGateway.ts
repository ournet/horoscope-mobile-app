
import { HoroscopeReportsGateway, HoroscopeReports, HoroscopeReportsGetProps } from '../../domain';
// import fetch from 'node-fetch';
import 'cross-fetch/polyfill';

export function createHoroscopeReportsGateway(api: { host: string, client: string }): HoroscopeReportsGateway {
    return {
        get(props: HoroscopeReportsGetProps): Promise<HoroscopeReports> {
            if (!props) {
                return Promise.reject(new Error(`Invalid props param!`));
            }
            let url = api.host + `/daily-reports.json?lang=${props.lang}&client=${props.client || api.client}`;

            if (props.date) {
                url += '&date=' + props.date;
            }

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
    };
}
