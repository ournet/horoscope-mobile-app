import { LocalizyLocalesProvider, LocalizyLocales, LocalesKey } from './generated-locales';
import { Locales, parseTranslationData } from 'localizy';

const translations = {
    ro: parseTranslationData(require('./ro.json')),
}

export class HoroscopeLocalesProvider extends LocalizyLocalesProvider<HoroscopeLocales> {
    constructor() {
        super({
            data: translations,
        })
    }

    createInstance(t: Locales) {
        return new HoroscopeLocales(t);
    }
}

export class HoroscopeLocales extends LocalizyLocales {
    signNameById(id: number) {
        return this.v(`sign_${id}` as LocalesKey);
    }

    langByCode(lang: string) {
        return this.v(`lang_${lang}` as LocalesKey);
    }
}
