
import { User } from '../entities';
import { UserGateway } from './UserGateway';

export interface UserInteractor {
    save(user: User): Promise<User>
    load(): Promise<User>
}

export function createUserInteractor(gateway: UserGateway)
    : UserInteractor {
    return {
        save(user: User) {
            return gateway.save(user);
        },
        load() {
            return gateway.load();
        }
    };
}
