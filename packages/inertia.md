# Inertia


## Overview
[Inertia](https://inertiajs.com/) offers the best parts of the frontend and backend. It bridges your modern frontend stack using Vue.js or React and a powerful backend framework like Supercharge. Inertia uses routes, controllers, authentication, (and more) of the backend while hydrating the data in the frontend allowing you to build interactive apps in the browser.

The [`@supercharge/inertia`](https://github.com/supercharge/inertia) package provides the functionality to use Inertia in combination with Supercharge. This package decorates the request and response instances with `request.inertia()` and `response.inertia()` methods allowing you to retrieve Inertia-related request data or send an Inertia response.


## Requirements
This Inertia package requires view rendering support. We recommend using the integrated [views](/docs/{{version}}/views).

The `@supercharge/view` package is part of the Supercharge app boilerplate and you probably have it already installed. If you don’t have view support in your app yet, please add it to your project:

```bash
npm i @supercharge/view
```


## Installation
Adding Inertia to your Supercharge app is straight forward. Install the [`@supercharge/inertia`](https://github.com/supercharge/inertia) package from the NPM package registry. When installed, you must configure the package by following the steps below:

```bash
npm i @supercharge/inertia
```

```info
You’ll notice different versions between `@supercharge/inertia` and core packages, like `@supercharge/session`.

The reason for that: we develop the Inertia package in a dedicated GitHub repository, independently from the framework. Releases are not related to the framework  that don’t correspond with the release line of framework packages.
```


### Register the Inertia Middleware
As part of the Inertia package configuration, you must register the `HandleInertiaRequestsMiddleware` in your HTTP kernel. This middleware is needed to handle Inertia and non-Inertia requests properly. For example, the middleware returns early for non-Inertia requests or updates the [response status to 303 for specific redirects](https://inertiajs.com/redirects#303-response-code).

Register the Inertia middleware to your HTTP kernal by adding it to your `app/http/kernel.ts` file:

```ts
import { HandleInertiaRequestsMiddleware } from '@supercharge/inertia'

export class HttpKernel extends Kernel {
  /**
   * Returns the application’s global middleware stack. Every middleware
   * listed here runs on every request to the application.
   *
   * @returns {MiddlewareCtor[]}
   */
  override middleware (): Array<MiddlewareCtor | Class> {
    return [
      // other middleware …
      HandleInertiaRequestsMiddleware // 👈 add this line
    ]
  }
}
```


### Copy the Inertia Config File
At this point, the Supercharge framework doesn’t support asset publishing from third-party packages. You must manually copy over the configuration config file from the [Inertia package’s GitHub repository](https://github.com/supercharge/inertia/blob/main/config/inertia.ts) to `config/inertia.ts`.


## Inertia View File
You need an initial view entrypoint when using Inertia. The view entrypoint is used to render the template that will be picked up by Inertia. From there, Inertia takes over the rendering in the browser and managing the data flow between client and server.


### Configure the View Template
You must configure a view template used by the Inertia package to render the initial view. The view template configuration is an option in the `config/inertia.ts` file:

```ts
const inertiaConfig: InertiaOptions = {
  /**
   * This setting requires a file located inside the `resources/views` directory.
   * When changing the value for the `view` configuration, you need to make
   * sure a file exists in the views directory. For example, the current
   * configuration requires a view file at `resources/views/inertia.hbs`.
   */
  view: 'inertia'
}
```


### Using Inertia Partial Views
The configured Inertia view must contain the Inertia-related `inertia` and `inertiaHead` partial views. These partial views render the HTML that will be injected into the HTML head and body elements. Here’s a sample view file containing the Inertia partial views:

```hbs
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Supercharge Inertia</title>

    {{> inertiaHead }}
  </head>
  <body>
    {{> inertia }}
  </body>
</html>
```


## Asset Versioning
A common challenge with single-page applications is refreshing assets in the browser when they’ve changed on the server. Inertia supports hard refreshes by tracking a version across requests. [Inertia hard refreshes a page](https://inertiajs.com/asset-versioning) when detecting different versions between a request and the corresponding response.

Supercharge allows you to configure how to resolve the asset version inside the `config/inertia.ts` file. You may provide the `version` property and assign a value of type number, string, or a callback function. The package supports async callback functions. A configured callback receives the application instance as the only argument.

We recommend using an async function in combination with the `Inertia.manifestFile` helper method. The `Inertia.manifestFile` calculates the MD5 hash of the manifest file content and returns the hash as the version:

```ts
import { Inertia } from '@supercharge/inertia'

const inertiaConfig: InertiaOptions = {
  …

  version: async (app: Application) => {
    return await Inertia.manifestFile(
      app.publicPath('js/manifest.json')
    )
  }
}
```

Another approach is to use the app version. You may use the app version when you follow a (semantic) release process that bumps the application version with each release:

```ts
import { Inertia } from '@supercharge/inertia'

const inertiaConfig: InertiaOptions = {
  …

  version: (app: Application) => {
    return app.version()
  }
}
```

You may use a combination of the hash-based approach and the app version depending on the environment you’re running the code. For example, you may use the app version in production and the hash during development.

```warning
The app version is quite static because it changes only when tagging a new release. Using a calculated hash based on the manifest file content is more reliable during development.
```


## Server Side Rendering (SSR)
Server-side rendering is a process of pre-rendering the initial page visit on the server and sending that rendered HTML to the browser. This allows search engines to quickly pick up your page content and users to interact with your page before it fully loaded.


### How SSR Works
This Inertia package supports SSR out of the box. You can enable/disable SSR in the `config/inertia.ts` file by adjusting the `ssr` options. When enabled, you must configure a path to a render function. This render function is responsible to create the HTML that will be sent to the client.

You may export an SSR render function using Vue.js from `resources/js/ssr.ts` like this:

```ts
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { resolvePage, resolveTitle } from './inertia-helpers'

export function render (page): Promise<{ head: string[], body: string } | void> {
  return createInertiaApp({
    page,
    render: renderToString,
    title: resolveTitle,
    resolve: resolvePage,
    setup ({ app, props, plugin }) {
      return createSSRApp({
        render: () => h(app, props)
      }).use(plugin)
    }
  })
}
```

**Notice:** frameworks like Vue.js require you to generate the same HTML on the server as the client would do. Otherwise the hydration process on the client fails. We recommend you to use [Supercharge’s Vite](/docs/{{version}}/vite) plugin to generate outputs for the client and server side.


### Enable/Disable SSR
You can toggle whether Inertia SSR is used in your application using the `ssr.enabled` option inside the `config/inertia.ts` file. When enabled, you must provide a file path as the value for the `ssr.resolveRenderFunctionFrom` option. The file must then export a render function that will be used to render the HTML:

```ts
import { Application } from '@supercharge/contracts'
import { Inertia, InertiaOptions } from '@supercharge/inertia'

const inertiaConfig: InertiaOptions = {
  …

  ssr: {
    enabled: true,

    resolveRenderFunctionFrom: 'bootstrap/ssr.js'
  }
}

export default inertiaConfig
```


## Sharing Data
Sometimes it’s useful to share data along the request lifecycle and also add it to the response props. A common use case is adding the authenticated user to the response which will then be shown in your site’s header. Passing that user object as a prop on each response isn’t practical. That’s where shared data comes handy.


### Recommended: Extend the `HandleInertiaRequests` Middleware
We recommend to keep shared data in a single place and suggest the `HandleInertiaRequests` middleware as your file to share data. Sharing data from a single file is maintainable and your team knows where to look when changing something.

You should create your custom middleware class extending the provided middleware from the `@supercharge/inertia` package. Override the `share` method and return an object containing the shared data.

```ts
import { App } from '@supercharge/facades'
import { HandleInertiaRequestsMiddleware as BaseMiddleware } from '@supercharge/inertia'

export class HandleInertiaRequests extends BaseMiddleware {
  /**
   * Returns the props that are shared by default.
   *
   * @see https://inertiajs.com/shared-data
   *
   * @param  {HttpContext} ctx
   */
  override async share (ctx: HttpContext): Promise<Record<string, unknown>> {
    return {
      appName: App.name()
    }
  }
}
```

Then register your extended Inertial middleware in the HTTP kernel:

```ts
import { HandleInertiaRequests } from './middleware/handle-inertia-requests'

export class HttpKernel extends Kernel {
  /**
   * Returns the application’s global middleware stack. Every middleware
   * listed here runs on every request to the application.
   *
   * @returns {MiddlewareCtor[]}
   */
  override middleware (): Array<MiddlewareCtor | Class> {
    return [
      // other middleware …
      HandleInertiaRequests
    ]
  }
}
```


### Share Data via the HTTP Request
The Inertia package decorates the `request` and `response` instances adding an `.inertia()` method. You may share data from places where you have access to the HTTP request instance using the `request.inertia().share({ key: 'value' })` method. For example, you may share data from your HTTP controller:

```ts
import { HttpContext } from '@supercharge/contracts'

export class ShowDashboard {
  /**
   * Handle the incoming request.
   */
  async handle ({ request, response }: HttpContext): Promise<any> {
    request.inertia().share({
      metrics: 'calculated dashboard metrics'
    })

    // … return response
  }
}
```

When sharing data, you can chain as many `.share()` calls on the request instance as you want. The shared data will be merged (using a deepmerge).
