
import * as Images from './images';
import * as Styles from './styles';
import { momentDate } from '../utils';

const ZodiacSignImages = Images.ZodiacSignImages;

export { Images, Styles, ZodiacSignImages }

const ZODIAC_DATE_MAP: { [sign: number]: ZodiacSignDate } = require('./zodiac-sign-dates.json');

Object.keys(ZODIAC_DATE_MAP).forEach(id => {
    const item = ZODIAC_DATE_MAP[parseInt(id)];
    item.toString = (format?: 'short' | 'long') => formatSignDate(item, format);
});

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

export function getZodiacSignDate(sign: number) {
    return ZODIAC_DATE_MAP[sign];
}

function formatSignDate(date: { startDay: number, startMonth: number, endDay: number }, format: 'short' | 'long' = 'short'): string {
    const month = date.startMonth - 1;
    const startDate = momentDate(new Date(2017, month, date.startDay));
    const endDate = momentDate(new Date(2017, month + 1, date.endDay));
    const dateFormat = format === 'long' ? 'LL' : 'll';
    return [startDate.format(dateFormat).replace(/\d{4}/, '').trim(), endDate.format(dateFormat).replace(/\d{4}/, '').trim()].join('-');
}
