
import { convertDateToPeriod } from './utils';
import { Locales } from './locales';

export function formatHeaderDates(startDate?: Date) {
    startDate = startDate || new Date();
    const currentDate = startDate;
    const tomorrowDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const dateTabs = [
        {
            id: convertDateToPeriod(currentDate),
            text: Locales.get('today')
        },
        {
            id: convertDateToPeriod(tomorrowDate),
            text: Locales.get('tomorrow')
        },
        {
            id: convertDateToPeriod(tomorrowDate, 'W'),
            text: Locales.get('weekly')
        }];

    return dateTabs;
}
