
import { ZodiacSign as ZodiacSignId } from '../domain';
import { Locales } from './locales';
import { momentDate } from './utils';

export { ZodiacSignId }

const ZODIAC_DATE_MAP: { [sign: number]: ZodiacSignDate } = require('./resources/zodiacSignDates.json');

export interface ZodiacSignDate {
    readonly startDay: number
    /**
     * Positive number: 1-12
     */
    readonly startMonth: number
    readonly endDay: number
    toString(format?: 'short' | 'long'): string
    // toStrings(format: 'short' | 'long'): string[]
}

export interface ZodiacSign {
    id: ZodiacSignId
    name: string
    date: ZodiacSignDate
}

export function createZodiacSign(id: ZodiacSignId): ZodiacSign {
    const date = ZODIAC_DATE_MAP[id];
    return {
        id,
        name: Locales.signName(id),
        date: <ZodiacSignDate>Object.assign({ toString: (format?: 'short' | 'long') => formatSignDate(date, format) }, date)
    };
}

function formatSignDate(date: { startDay: number, startMonth: number, endDay: number }, format: 'short' | 'long' = 'short'): string {
    const month = date.startMonth - 1;
    const startDate = momentDate(new Date(2017, month, date.startDay));
    const endDate = momentDate(new Date(2017, month + 1, date.endDay));
    const dateFormat = format === 'long' ? 'LL' : 'll';
    return [startDate.format(dateFormat).replace(/\d{4}/, '').trim(), endDate.format(dateFormat).replace(/\d{4}/, '').trim()].join('-');
}
