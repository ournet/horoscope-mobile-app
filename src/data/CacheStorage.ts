
const Storage = require('react-native-storage').default;
import { getConfig } from './config';

export interface Cache {
    put<T>(key: string, data: T, ttl: number): Promise<T>
    get<T>(key: string): Promise<T>
}

function createInstance(storageBackend: any, props?: { size?: number, defaultExpires?: number }): Cache {
    const storage = new Storage({ ...props, storageBackend });

    return {
        put<T>(key: string, data: T, ttl: number): Promise<T> {
            return storage.save({
                key: key, data: data, expires: ttl
            }).then(() => data);
        },
        get<T>(key: string): Promise<T> {
            return storage.load({ key: key }).catch((e: Error) => <T>null);
        }
    }
}

export const CacheInstance = createInstance(getConfig().Storage);
