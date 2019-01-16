
import * as Images from './images';
import * as Styles from './styles';
import { momentDate } from '../utils';
import { ValidLanguage } from '../languages';

const ZodiacSignImages = Images.ZodiacSignImages;

export { Images, Styles, ZodiacSignImages }

const ZODIAC_DATE_MAP: { [sign: number]: ZodiacSignDate } = require('./zodiac-sign-dates.json');

Object.keys(ZODIAC_DATE_MAP).forEach(id => {
    const item = ZODIAC_DATE_MAP[parseInt(id)];
    item.toString = (lang: ValidLanguage, format?: 'short' | 'long') => formatSignDate(item, lang, format);
});

export interface ZodiacSignDate {
    readonly startDay: number
    /**
     * Positive number: 1-12
     */
    readonly startMonth: number
    readonly endDay: number
    toString(lang: ValidLanguage, format?: 'short' | 'long'): string
    // toStrings(format: 'short' | 'long'): string[]
}

export function getZodiacSignDate(sign: number) {
    return ZODIAC_DATE_MAP[sign];
}

function formatSignDate(date: { startDay: number, startMonth: number, endDay: number }, lang: ValidLanguage, format: 'short' | 'long' = 'short'): string {
    const month = date.startMonth - 1;
    const startDate = momentDate(new Date(2017, month, date.startDay)).locale(lang);
    const endDate = momentDate(new Date(2017, month + 1, date.endDay)).locale(lang);
    const dateFormat = format === 'long' ? 'LL' : 'll';
    return [removeYear(startDate.format(dateFormat)), removeYear(endDate.format(dateFormat))].join(' - ');
}

function removeYear(date: string) {
    return date.replace(/\d{4}/, '').trim()
        .replace(/,$/, '').trim()
        .replace(/\sг.$/, '').trim()
}
