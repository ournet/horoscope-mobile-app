
import { UserGateway, User } from '../../domain';
import { CacheStorage } from '../CacheStorage';

function formatKey() {
    return `user`;
}

export function createApiUserGateway(cache: CacheStorage): UserGateway {

    return {
        load() {
            const key = formatKey();

            return cache.get<User>(key);
        },
        save(user: User) {
            const key = formatKey();

            return cache.put(key, user, null);
        }
    }
}
