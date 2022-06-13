# Service Container (IoC Container)


## Overview
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
    constructor (redis: Redis) {
        this.redis = redis
    }

    /**
     * Determine whether the cache stores an item for the given `key`.
     */
    has (key: string): boolean {
        return await this.redis.exists(key)
    }
}
```

The `RedisCache` should be responsible for the caching of items. A Redis client should store and retrieve individual cache items. The Redis cache itself shouldn’t worry about setting up a Redis client instance and connecting it to the Redis database. Here’s where the container comes handy: injecting a Redis client into the cache class  .


## Resolving Dependencies
The Supercharge service container **does not** resolve dependencies automatically for you. You need to actively retrieve services from the container when needed.

For example, you may need to retrieve a `Redis` service in your [service provider](/docs/service-providers) when building a custom Redis cache class.


## When to Use The Container
You should use the container when writing a Supercharge package that you're sharing with other Supercharge developers. Typically you’re providing a service provider that binds your services into the container.


## Binding
Typically you’re registering your container bindings in [service providers](/docs/service-providers). Within service providers you’ve access to the application instance via the `this.app()` method.

You can register a bindung using the `this.app().bind(identifier, closure)` method. The `bind` method expects a string or class constructor as an identifier and a closure returning the resolved class instance. When using a class constructor for the container binding, the service container automatically retrieves and uses the class name for that binding:

```ts
import { Application } from '@supercharge/contracts'
import { DocsRenderer } from './services/docs-renderer'
import { MarkdownRenderer } from './services/markdown-renderer'

this.app().bind(MarkdownRenderer, (app: Application) => {
    const docsRenderer = this.app().make(DocsRenderer)

    return new MarkdownRenderer(docsRenderer)
})
```

Supercharge will always create a new instance of the `MarkdownRenderer` when resolving it from the container.

**Notice:** you can use the `app` instance to resolve already registered services from the container and use them in other services. Also, you’re receiving the `app` instance as an argument to your closure function.

You may also use a string value as an identifier for container bindings:

```ts
import { Application } from '@supercharge/contracts'
import { DocsRenderer } from './services/docs-renderer'
import { MarkdownRenderer } from './services/markdown-renderer'

this.app().bind('markdown.renderer', (app: Application) => {
    // …
})

// then resolve it like this:
const renderer = this.app().make('markdown.renderer')
```


### Singleton Bindings
The container supports a `singleton` method binding a class into the container that resolves once. A singleton binding will be cached and the same instance will be returned on subsequent calls into the container:

```ts
import { Application } from '@supercharge/contracts'
import { DocsRenderer } from './services/docs-renderer'
import { MarkdownRenderer } from './services/markdown-renderer'

this.app().singleton(MarkdownRenderer, (app: Application) => {
    const docsRenderer = this.app().make(DocsRenderer)

    return new MarkdownRenderer(docsRenderer)
})
```


## Resolving
You can resolve class instances from the container using the `make` method. The `make` method accepts a string or class you wish to resolve:

```ts
import { MarkdownRenderer } from './services/markdown-renderer'

const renderer = this.app().make(MarkdownRenderer)
```

If you registered a service into the container using a string identifier, you can resolve it using the same key:

```ts
const renderer = this.app().make('markdown.renderer')
```

