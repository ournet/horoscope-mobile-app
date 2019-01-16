// import DeviceInfo from 'react-native-device-info';
import RNLanguages from 'react-native-languages';

export type ValidLanguage = 'en' | 'ro' | 'ru' | 'bg' | 'hu';
const VALID_LANGUAGES: ReadonlyArray<ValidLanguage> = ['en', 'ro', 'ru', 'bg', 'hu'];

export function getValidLanguages() {
    return VALID_LANGUAGES;
}

export const DEFAULT_LANGUAGE: ValidLanguage = 'en';

export function getCurrentLanguage() {
    const systemLanguage = RNLanguages.language || DEFAULT_LANGUAGE;
    const lang = systemLanguage.substring(0, 2).toLowerCase() as ValidLanguage;

    if (getValidLanguages().includes(lang)) {
        return lang;
    }

    return DEFAULT_LANGUAGE;
}

let languageChangedHandeler: (lang: ValidLanguage) => void

function changeHandler(data: {
    language: string;
    languages: string[];
}) {
    if (!languageChangedHandeler) {
        return;
    }

    languageChangedHandeler(getCurrentLanguage());
}

export function addEventSystemLanguageChanged(cb: (lang: ValidLanguage) => void) {
    if (languageChangedHandeler) {
        return;
    }
    languageChangedHandeler = cb;
    RNLanguages.addEventListener('change', changeHandler);
}

export function removeEventSystemLanguageChanged(cb: (lang: ValidLanguage) => void) {
    languageChangedHandeler = null
    RNLanguages.removeEventListener('change', changeHandler);
}
