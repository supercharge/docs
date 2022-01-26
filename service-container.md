# Service Container (IoC Container)


## Introduction
Supercharge uses a service container to manage dependencies. The container allows you to register dependencies and retrieve them when needed. This setup supports dependency injection in your application. Well, dependency injection is a funky term that basically describes “injecting” dependencies into a class (or function).

Injecting dependencies instead of letting classes resolve them on their own has the benefit of controlling the dependencies. Controlling dependencies is especially helpful during testing because you can inject mock objects or fake data and run assertions on them.

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
        return await this.redis.exists(key)
    }
}
```

The `RedisCache` should be responsible for the caching of items. A Redis client should store and retrieve individual cache items. The Redis cache itself shouldn’t worry about setting up a Redis client instance and connecting it to the Redis database. Here’s where the container comes handy: injecting a Redis client into the cache class  .


## Resolving Dependendies
The Supercharge service container **does not** resolve dependencies automatically for you. You need to actively retrieve services from the container when needed.

For example, you may need to retrieve a `Redis` service in your [service provider](/docs/service-providers) when building a custom Redis cache class.


## When to Use The Container
You should use the container when writing a Supercharge package that you're sharing with other Supercharge developers. Typically, you’re providing a service provider that binds your services into the container.


## Binding
tba.


## Resolving
tba.
