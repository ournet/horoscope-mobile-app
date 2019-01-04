
const Storage = require('react-native-storage').default;
import LRU = require('lru-cache');

export interface CacheStorage {
    put<T>(key: string, data: T, ttl: number): Promise<T>
    get<T>(key: string): Promise<T>
}

export function createCacheStorage(storageBackend: any, props: { size: number, defaultExpires?: number }): CacheStorage {
    const storage = new Storage({ ...props, storageBackend });
    const memCache = new LRU<string, any>({ max: props.size, maxAge: props.defaultExpires });

    return {
        put<T>(key: string, data: T, ttl: number): Promise<T> {
            memCache.set(key, data, ttl);
            return storage.save({
                key: key, data: data, expires: ttl
            }).then(() => data);
        },
        async get<T>(key: string): Promise<T> {
            const item = memCache.get(key);
            if (item !== undefined) {
                return item as T;
            }
            return storage.load({ key: key }).catch((e: Error) => <T>null);
        }
    }
}
