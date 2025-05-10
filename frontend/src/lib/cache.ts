class Cache {
    constructor() {
        this.cache = new Map();
        this.defaultTTL = 5 * 60 * 1000; // 5 minutos por defecto
    }
    static getInstance() {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }
    set(key, data, ttl = this.defaultTTL) {
        const now: any = Date.now();
        this.cache.set(key, {
            data,
            timestamp: now,
            expiresAt: now + ttl,
        });
    }
    get(key) {
        const item: any = this.cache.get(key);
        if (!item) {
            return null;
        }
        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return null;
        }
        return item.data;
    }
    delete(key) {
        this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    has(key) {
        const item: any = this.cache.get(key);
        if (!item) {
            return false;
        }
        if (Date.now() > item.expiresAt) {
            this.cache.delete(key);
            return false;
        }
        return true;
    }
    // Limpiar elementos expirados
    cleanup() {
        const now: any = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now > item.expiresAt) {
                this.cache.delete(key);
            }
        }
    }
}
export const cache: any = Cache.getInstance();
// Ejecutar limpieza cada minuto
setInterval(() => {
    cache.cleanup();
}, 60 * 1000);
