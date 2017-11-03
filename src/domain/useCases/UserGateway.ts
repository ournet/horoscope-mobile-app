
import { User } from '../entities';

export interface UserGateway {
    save(data: User): Promise<User>
    load(): Promise<User>
}
