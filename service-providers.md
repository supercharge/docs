# Service Providers


- [Introduction](#introduction)
- [Creating Service Providers](#creating-service-providers)
  - [The Register method](#the-register-method)
  - [The Boot method](#the-boot-method)
- [Registering Providers](#registering-providers)



## Introduction
tba.


## Creating Service Providers
All service providers should extends the `ServiceProvider` class provided by `@supercharge/support`. The main methods you can implement in your service provider are `register` and `boot`:

```ts
import { ServiceProvider } from '@supercharge/support'
import { MarkdownRenderer } from './markdown-renderer'

export class MarkdownServiceProvider extends ServiceProvider {
  /**
   * Register application services to the container.
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



### The Register Method
tba.


### The Boot Method
tba.


## Registering Providers
tba.
