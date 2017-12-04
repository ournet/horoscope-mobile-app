
export type ValidLanguage = 'ro';

type ConfigType = {
    readonly ApiClient: string
    readonly DefaultLang: ValidLanguage
    readonly SupportedLangs: ValidLanguage[]
    readonly ApiHost: string
    readonly CurrentDate: Date
    readonly CurrentLanguage: ValidLanguage
    readonly GoogleAnalyticsId: string
}

export const Config: ConfigType = {
    ApiClient: 'com.ournet.horoscope',
    DefaultLang: 'ro',
    SupportedLangs: ['ro'],
    ApiHost: 'https://horoscop.ournet.ro/api',
    GoogleAnalyticsId: 'UA-110586923-1',

    get CurrentDate() {
        return new Date();
    },

    get CurrentLanguage() {
        return Config.DefaultLang;
    }
}
