import { ValidLanguage, getCurrentLanguage, DEFAULT_LANGUAGE, getValidLanguages } from './languages';

type ConfigType = {
    readonly ApiClient: string
    readonly DefaultLang: ValidLanguage
    readonly SupportedLangs: ReadonlyArray<ValidLanguage>
    readonly ApiHost: string
    readonly CurrentDate: Date
    readonly CurrentLanguage: ValidLanguage
    readonly GoogleAnalyticsId: string
    readonly AppName: string
    readonly AppVersion: string
    readonly OneSignalAppId: string
}

export const Config: ConfigType = {
    AppName: 'Horoscope',
    AppVersion: '0.3.1',
    ApiClient: 'com.ournet.horoscope_0.3.1',
    ApiHost: 'https://horoscop.ournet.ro/api',
    GoogleAnalyticsId: 'UA-110586923-1',
    OneSignalAppId: '2f276d23-3644-4054-b323-debb0780ed1f',

    get CurrentDate() {
        return new Date();
    },

    get CurrentLanguage() {
        return getCurrentLanguage();
    },

    get DefaultLang() {
        return DEFAULT_LANGUAGE;
    },

    get SupportedLangs() {
        return getValidLanguages();
    }
}
