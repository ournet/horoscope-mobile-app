
type KEYS =
    'horoscope' |
    'daily_horoscop' |
    'today_horoscope' |
    'loading' |
    'no_data_error' |
    'sign_1' |
    'sign_2' |
    'sign_3' |
    'sign_4' |
    'sign_5' |
    'sign_6' |
    'sign_7' |
    'sign_8' |
    'sign_9' |
    'sign_10' |
    'sign_11' |
    'sign_12';

export class LocalesClass<LANG extends string> {
    constructor(private defaultLang: LANG) { }

    get(key: KEYS, lang?: LANG): string {
        lang = lang || this.defaultLang;

        return getString(lang, key);
    }

    signName(id: number, lang?: LANG) {
        return getString(lang || this.defaultLang, 'sign_' + id);
    }

    language(lang?: LANG): LANG {
        if (lang) {
            this.defaultLang = lang;
        }
        return this.defaultLang;
    }
}

const Strings: { [index: string]: { [index: string]: string } } = require('./strings.json');

function getString(lang: string, key: string) {
    return Strings[lang][key] || '';
}
