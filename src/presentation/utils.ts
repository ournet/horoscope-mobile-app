
import * as moment from 'moment';
import 'moment/locale/ro';
import 'moment/locale/ru';
import 'moment/locale/hu';
import 'moment/locale/bg';
import 'moment/locale/cs';
import 'moment/locale/it';

import { Config } from './config';

moment.locale(Config.CurrentLanguage);

export function momentDate(date: Date): moment.Moment {
    return moment(date);
}

export function convertDateToPeriod(date: Date, format: 'D' | 'M' | 'W' = 'D'): string {
    let result = format + date.getFullYear();

    if (format === 'W') {
        const week = moment(date).isoWeek();
        result += week < 10 ? '0' + week : week;

        return result;
    }

    const month = date.getMonth() + 1;
    result += month < 10 ? '0' + month : month;

    if (format === 'D') {
        const day = date.getDate();
        result += day < 10 ? '0' + day : day;
    }

    return result;
}
