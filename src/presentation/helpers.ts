
import { convertDateToPeriod } from './utils';
import { Locales } from './locales';
import { Styles } from './resources';

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

export function getMainReportStatsColor(stats:
    { health: number, love: number, success: number, [key: string]: number }): string {

    if (!stats) {
        return Styles.darkLayoutColor;
    }

    const max = Math.max(stats.health, stats.love, stats.success);
    const key = Object.keys(stats).find(key => stats[key] === max);

    switch (key) {
        case 'health': return Styles.healthColor;
        case 'love': return Styles.loveColor;
        case 'success': return Styles.successColor;
    }

    return Styles.darkLayoutColor;
}
