
import { ZodiacSign } from '../../../domain';

export interface ZodiacSignViewData {
    id: number
    name: string
}

export function createZodiacSignViewData(sign: ZodiacSign): ZodiacSignViewData {
    return {
        id: sign,
        name: 'name ' + sign
    };
}
