
import { ZodiacSign as ZodiacSignId } from '../domain';

export interface ZodiacSign {
    id: ZodiacSignId
    name: string
}

export function createZodiacSign(id: ZodiacSignId): ZodiacSign {
    return {
        id,
        name: 'Name ' + id
    }
}
