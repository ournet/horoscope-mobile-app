
import { ZodiacSign } from '../entities/ZodiacSign';
import { UserZodiacSignGateway } from './UserZodiacSignGateway';

export interface UserZodiacSignInteractor {
    save(sign: ZodiacSign): Promise<ZodiacSign>
    get(): Promise<ZodiacSign>
}

export function createUserZodiacSignInteractor(gateway: UserZodiacSignGateway)
    : UserZodiacSignInteractor {
    return {
        save(sign: ZodiacSign) {
            return gateway.save(sign);
        },
        get() {
            return gateway.get();
        }
    };
}
