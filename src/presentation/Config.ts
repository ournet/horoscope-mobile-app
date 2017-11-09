
type ConfigType = {
    readonly ApiClient: string
    readonly DefaultLang: string
    readonly SupportedLangs: string[]
    readonly ApiHost: string
    readonly CurrentDate: Date
    readonly CurrentLanguage: string
}

export const Config: ConfigType = {
    ApiClient: 'com.ournet.horoscope',
    DefaultLang: 'ro',
    SupportedLangs: ['ro', 'ru', 'en'],
    ApiHost: 'https://horoscop.ournet.ro/api',

    get CurrentDate() {
        return new Date();
    },

    get CurrentLanguage() {
        return Config.DefaultLang;
    }
}
