
export type ValidLanguage = 'ro';

type ConfigType = {
    readonly ApiClient: string
    readonly DefaultLang: ValidLanguage
    readonly SupportedLangs: ValidLanguage[]
    readonly ApiHost: string
    readonly CurrentDate: Date
    readonly CurrentLanguage: ValidLanguage
    readonly GoogleAnalyticsId: string
    readonly AppName: string
    readonly AppVersion: string
}

export const Config: ConfigType = {
    AppName: 'Horoscope',
    AppVersion: '0.2.4',
    ApiClient: 'com.ournet.horoscope_0.2.4',
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
