
import { ZodiacSign as ZodiacSignId } from '../../../domain';
import { ZodiacSign, createZodiacSign } from '../../entities';

export interface ZodiacSignViewData extends ZodiacSign { }

export function createZodiacSignViewData(sign: ZodiacSignId): ZodiacSignViewData {
    return createZodiacSign(sign);
}
