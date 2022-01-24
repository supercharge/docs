# Service Providers


- [Introduction](#introduction)
- [Creating Service Providers](#creating-service-providers)
  - [The Register method](#the-register-method)
  - [The Boot method](#the-boot-method)
- [Registering Providers](#registering-providers)



## Introduction
Service providers are essential when bootstrapping your application. The Supercharge framework uses service providers to load core functionalities and your application should use them as well.

You may ask what “bootstrapping” actually means? In the context of a Supercharge application, it means composing your application: registering services into the container, loading routes and binding controllers, loading events and binding listeners. Service providers are a central place for your application.

Supercharge looks for the `bootstrap/providers.ts` file when starting your application. This file exports a `providers` property storing the service providers that will be loaded when booting your application. By default, you’ll see a handful of providers listed. For example, you’ll find the route service provider required for HTTP routing listed in the array.

This page shows you how to write your own service provider and register it with your Supercharge app.


## Creating Service Providers
All service providers should extends the `ServiceProvider` class provided by `@supercharge/support`. The main methods you can implement in your service provider are `register` and `boot`.

Here’s a `MarkdownServiceProvider` that we’ll use as an example:

```ts
import { ServiceProvider } from '@supercharge/support'
import { MarkdownRenderer } from './markdown-renderer'

export class MarkdownServiceProvider extends ServiceProvider {
  /**
   * Register application services into the container.
   */
  override register (): void {
    this.app().singleton(MarkdownRenderer, () => {
      return new MarkdownRenderer(this.app())
    })
  }

  /**
   * Boot application services.
   */
  override async boot (): Promise<void> {
    await this.app().make(MarkdownRenderer).boot()
  }
}
```

The following sections look at the `register` and `boot` methods in more detail.


### The Register Method
The `register` method should bind services into the [service container](/docs/service-container). The `register` method runs synchronously and doesn’t support promises. Remember, you should only register services and their dependencies here:

**Notice:** you have access to the `app` instance in your service providers via the `this.app()` method. Also, you must manually resolve other dependencies from the container if your service needs them.

Here’s an example registering the markdown renderer into the container and providing a factory callback returning a resolved (not booted) instance:

```ts
import { ServiceProvider } from '@supercharge/support'
import { MarkdownRenderer } from './markdown-renderer'

export class MarkdownServiceProvider extends ServiceProvider {
  /**
   * Register application services into the container.
   */
  override register (): void {
    this.app().singleton(MarkdownRenderer, () => {
      return new MarkdownRenderer(
        this.app().config().get('markdown')
      )
    })
  }
}
```

The `register` method binds an implementation of the `MarkdownRenderer` into the container. Please find more details about [the container and bindings](/docs/service-container) in its documentation.



### The Boot Method
The `boot` method is called after all service providers have been registered. Here, you have access to all services in the container. The `boot` method runs asynchronously and can return a promise. Use this method to boot your application services.

For example, let’s say the markdown renderer needs to load a syntax highlighting theme file from the local hard drive. The boot method is the correct place to load this file asynchronously.

```ts
import { ServiceProvider } from '@supercharge/support'
import { MarkdownRenderer } from './markdown-renderer'

export class MarkdownServiceProvider extends ServiceProvider {
  /**
   * Boot application services.
   */
  override async boot (): Promise<void> {
    await this.app().make(MarkdownRenderer).boot()
  }
}
```


## Registering Providers
All service providers are registered through the `bootstrap/providers.ts` file. This file must export a `providers` property. The value of this property is an array of service providers. You’ll find a handful of default service providers, for example the route service provider.

Add service providers from community packages or your own modules to this list:

```ts
import { MarkdownServiceProvider } from '../app/modules/markdown'

export const providers: ServiceProviderCtor[] = [
  // other service providers

  MarkdownServiceProvider,
]
```
