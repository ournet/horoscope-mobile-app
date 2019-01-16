
import { ZodiacSignId, HoroscopeReportStats } from '../../domain';
import { Locales } from '../locales';
import { ZodiacSignDate, getZodiacSignDate } from '../resources';
import { ValidLanguage } from '../languages';

export { ZodiacSignId, HoroscopeReportStats }

export interface ViewZodiacSign {
    id: ZodiacSignId
    name: string
    date: ZodiacSignDate
}

export function createViewZodiacSign(id: ZodiacSignId, lang: ValidLanguage): ViewZodiacSign {
    const date = getZodiacSignDate(id);
    return {
        id,
        name: Locales.lang(lang).signNameById(id),
        date,
    };
}
