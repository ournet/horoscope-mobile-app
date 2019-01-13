
import { LocalesClass } from './locales-class';
import { Config, ValidLanguage } from '../config';

export const Locales = new LocalesClass<ValidLanguage>(Config.CurrentLanguage);
