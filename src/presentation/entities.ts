
import { ZodiacSign as ZodiacSignId } from '../domain';
import { Locales } from './locales';

export interface ZodiacSign {
    id: ZodiacSignId
    name: string
}

export function createZodiacSign(id: ZodiacSignId): ZodiacSign {
    return {
        id,
        name: Locales.signName(id)
    }
}
