
import * as moment from 'moment';
import 'moment/locale/ro';
import 'moment/locale/ru';

import { Config } from './Config';

moment.locale(Config.CurrentLanguage);

export function momentDate(date: Date): moment.Moment {
    return moment(date);
}
