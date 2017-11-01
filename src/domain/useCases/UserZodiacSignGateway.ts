
import { ZodiacSign } from '../entities/ZodiacSign';

export interface UserZodiacSignGateway {
    save(sign: ZodiacSign): Promise<ZodiacSign>
    get(): Promise<ZodiacSign>
}
