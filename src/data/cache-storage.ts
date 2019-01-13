
const Storage = require('react-native-storage').default;
import { MemoryCache } from './memory-cache';

export interface CacheStorage {
    put<T>(key: string, data: T, ttl: number): Promise<T>
    get<T>(key: string): Promise<T>
}

export function createCacheStorage(storageBackend: any, props: { size: number, defaultExpires?: number }): CacheStorage {
    const storage = new Storage({ ...props, storageBackend });
    const memCache = new MemoryCache({ max: props.size, ttl: props.defaultExpires });

    return {
        async put<T>(key: string, data: T, ttl: number): Promise<T> {
            memCache.set(key, data, ttl);
            return storage.save({
                key: key, data: data, expires: ttl
            }).then(() => data);
        },
        async get<T>(key: string): Promise<T> {
            const item = memCache.get<T>(key);
            if (item !== undefined) {
                return item;
            }
            return storage.load({ key: key }).catch((e: Error) => <T>null);
        }
    }
}
