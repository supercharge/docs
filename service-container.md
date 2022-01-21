# Service Container (IoC Container)


## Introduction
Supercharge uses a service container to manage dependencies. The container allows you to register dependencies and retrieve them when needed. This setup supports dependency injection in your application. Well, dependency injection is a funky term that basically describes “injecting” dependencies into a class.

Injecting dependencies instead of letting classes resolve them on their own has the benefit of controlling the dependencies instead of relying on existing setups. Controlling dependencies is especially helpful during testing.

Here’s an example where the dependency injection and the service container is helpful:

```ts
class RedisCache implements CacheContract {
    /**
     * Stores the redis instance.
     */
    private redis: Redis

    /**
     * Create a new instance.
     */
    constructor(redis: Redis) {
        this.redis = redis
    }

    /**
     * Determine whether the cache stores an item for the given `key`.
     */
    has(key: string): boolean {
        return !!await this.redis.get(key)
    }
}
```

The `RedisCache` should be responsible to for the caching of items. A Redis client should store and retrieve cache items. The Redis cache itself shouldn’t worry about setting up a Redis client instance and connecting it to the Redis database. The cache should get its dependencies injected. That’s where the container comes handy.
