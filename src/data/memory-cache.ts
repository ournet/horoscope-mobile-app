
type MemoryCacheItem = {
    value: any
    enpiresAt?: number
}

export class MemoryCache {
    private map: Map<string, MemoryCacheItem> = new Map()

    constructor(private options: { max: number, ttl?: number }) { }

    set(key: string, value: any, ttl?: number) {
        ttl = ttl || this.options.ttl;

        const item: MemoryCacheItem = {
            value,
            enpiresAt: ttl ? Date.now() + ttl : undefined,
        };

        this.map.set(key, item);
    }

    get<T>(key: string): T | undefined {
        const item = this.map.get(key);

        if (item) {
            if (item.enpiresAt && item.enpiresAt < Date.now()) {
                this.map.delete(key);
                return;
            }
            return item.value as T;
        }
    }
}
