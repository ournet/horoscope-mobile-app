
import { ZodiacSign } from '../entities/ZodiacSign';
import { UserZodiacSignGateway } from './UserZodiacSignGateway';

export interface UserZodiacSignInteractor {
    save(sign: ZodiacSign): Promise<ZodiacSign>
}

export function createUserZodiacSignInteractor(userZodiacSignGateway: UserZodiacSignGateway)
    : UserZodiacSignInteractor {
    return {
        save(sign: ZodiacSign) {
            return userZodiacSignGateway.save(sign);
        }
    };
}
