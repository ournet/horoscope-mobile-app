
import { LocalesClass } from './LocalesClass';
import { Config, ValidLanguage } from '../Config';

export const Locales = new LocalesClass<ValidLanguage>(Config.CurrentLanguage);
