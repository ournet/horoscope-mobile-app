
import { Locales, Translator, TranslatorOptions } from 'localizy';

export class LocalizyLocalesProvider<T extends LocalizyLocales = LocalizyLocales> {
    private translator: Translator
    private localesMap: { [lang: string]: T } = {}

    constructor(options: TranslatorOptions) {
        this.translator = new Translator(options);
    }

    lang(lang: string) {
        if (!this.localesMap[lang]) {
            this.localesMap[lang] = this.createInstance(this.translator.locales(lang)) as T;
        }

        return this.localesMap[lang];
    }

    protected createInstance(t: Locales): T {
        return new LocalizyLocales(t) as T;
    }
}

export class LocalizyLocales {
    protected __locales: Locales
    constructor(locales: Locales) {
        this.__locales = locales;
    }

    s(key: LocalesKey, ...args: any[]) {
        return this.v(key, args);
    }

    v(key: LocalesKey, args?: any[]) {
        return this.__locales.t(key, args);
    }
    

    horoscope() {
        return this.v('horoscope');
    }

    daily_horoscope() {
        return this.v('daily_horoscope');
    }

    today_horoscope() {
        return this.v('today_horoscope');
    }

    loading() {
        return this.v('loading');
    }

    no_data_error() {
        return this.v('no_data_error');
    }

    today() {
        return this.v('today');
    }

    tomorrow() {
        return this.v('tomorrow');
    }

    weekly() {
        return this.v('weekly');
    }

    select_your_sign() {
        return this.v('select_your_sign');
    }

    lucky_numbers() {
        return this.v('lucky_numbers');
    }

    numbers() {
        return this.v('numbers');
    }

    health() {
        return this.v('health');
    }

    love() {
        return this.v('love');
    }

    success() {
        return this.v('success');
    }

    home() {
        return this.v('home');
    }

    my_sign() {
        return this.v('my_sign');
    }

    all_signs() {
        return this.v('all_signs');
    }

    settings() {
        return this.v('settings');
    }

    change_sign() {
        return this.v('change_sign');
    }

    sign_1() {
        return this.v('sign_1');
    }

    sign_2() {
        return this.v('sign_2');
    }

    sign_3() {
        return this.v('sign_3');
    }

    sign_4() {
        return this.v('sign_4');
    }

    sign_5() {
        return this.v('sign_5');
    }

    sign_6() {
        return this.v('sign_6');
    }

    sign_7() {
        return this.v('sign_7');
    }

    sign_8() {
        return this.v('sign_8');
    }

    sign_9() {
        return this.v('sign_9');
    }

    sign_10() {
        return this.v('sign_10');
    }

    sign_11() {
        return this.v('sign_11');
    }

    sign_12() {
        return this.v('sign_12');
    }

    unknown_error() {
        return this.v('unknown_error');
    }

    change_language() {
        return this.v('change_language');
    }

    select_language() {
        return this.v('select_language');
    }

    lang_ro() {
        return this.v('lang_ro');
    }

    lang_ru() {
        return this.v('lang_ru');
    }

    lang_bg() {
        return this.v('lang_bg');
    }

    lang_en() {
        return this.v('lang_en');
    }

    lang_hu() {
        return this.v('lang_hu');
    }

    lang_cs() {
        return this.v('lang_cs');
    }

    lang_it() {
        return this.v('lang_it');
    }
}

export type LocalesKey = 'horoscope'
    | 'daily_horoscope'
    | 'today_horoscope'
    | 'loading'
    | 'no_data_error'
    | 'today'
    | 'tomorrow'
    | 'weekly'
    | 'select_your_sign'
    | 'lucky_numbers'
    | 'numbers'
    | 'health'
    | 'love'
    | 'success'
    | 'home'
    | 'my_sign'
    | 'all_signs'
    | 'settings'
    | 'change_sign'
    | 'sign_1'
    | 'sign_2'
    | 'sign_3'
    | 'sign_4'
    | 'sign_5'
    | 'sign_6'
    | 'sign_7'
    | 'sign_8'
    | 'sign_9'
    | 'sign_10'
    | 'sign_11'
    | 'sign_12'
    | 'unknown_error'
    | 'change_language'
    | 'select_language'
    | 'lang_ro'
    | 'lang_ru'
    | 'lang_bg'
    | 'lang_en'
    | 'lang_hu'
    | 'lang_cs'
    | 'lang_it';
