# Views


## Overview
Views separate the presentation logic from application logic and represent the web views. In your application, views are served as HTML by your server to the browser. In Supercharge, all views are located within the `resources/views` directory and its subfolders.


## Configuration
The view configuration file is located at `config/view.ts`. The configuration file includes the default view driver and the corresponding view driver settings.


### Required Package Dependencies
Supercharge requires the `@supercharge/view` package to support view rendering. This package registers the `response.view` macro on the HTTP response instance allowing you to render views from responses.

The Supercharge application boilerplate contains this package by default. You may double-check if `@supercharge/view` is a dependency in project and that the `ViewServiceProvider` is registered in the `bootstrap/providers.ts` file:

```ts
import { ViewServiceProvider } from '@supercharge/view'
import { ServiceProviderCtor } from '@supercharge/contracts'

export const providers: ServiceProviderCtor[] = [
  /**
   * All listed providers will be registered and booted while starting your
   * application. You may add your own providers to this list registering
   * custom functionality to your application. In alphabetical sorting.
   */
  // …
  ViewServiceProvider,
]
```

### Available View Drivers
Supercharge views use a driver-based approach for template rendering. A driver represents a given rendering engine. At this point, we’re supporting only the [Handlebars](https://handlebarsjs.com/) view engine.

| View Driver    | Description                                  |
|--------------- |--------------------------------------------- |
| `handlebars`   | Uses the [Handlebars](https://handlebarsjs.com/) view rendering engine |


## Creating Views
A very basic view may look like this:

```handlebars
<div>
  <h1>Hey, great to see you {{name}}</h1>
</div>
```

You may store this view template in `resources/views/welcome.hbs` and serve it when sending a request to a route like this:

```ts
import { Route } from '@supercharge/facades'
import { HttpContext } from '@supercharge/contracts'

Route.get('/', ({ response }: HttpContext) => {
  return response.view('welcome', { name: Supercharge })
})
```

Use the `response.view` method to send a rendered view file a response from your route handler. The `response.view` method expects the view’s file name as the first parameter. The second parameter is a data object available in the view context to dynamically replace their related placeholders. The example above provides the `{ name: 'Supercharge' }` object allowing you to inject a name into a `{{name}}` view placeholder.

If you’re storing view files in subdirectories, like `resources/views/auth/login.hbs`, you can serve them like this:

```ts
import { Route } from '@supercharge/facades'
import { HttpContext } from '@supercharge/contracts'

Route.get('/', ({ response }: HttpContext) => {
  return response.view('auth/login')
})
```

Serving views from subdirectories is no problem. Use a path-like structure with forward slashes when defining them in the `response.view` call.


## Pass Data to Views
You can pass to your views by providing an object as the second parameter to `response.view`:

```ts
import { Route } from '@supercharge/facades'
import { HttpContext } from '@supercharge/contracts'

Route.get('/', ({ response }: HttpContext) => {
  return response.view('startpage', { name: 'Supercharge '})
})
```

You’ll typically pass data to views as key-value pairs. You can then access each key in the related view and render its value into the HTML by wrapping it in curly brackets, for example `{{name}}`.


### Sharing Data to All Views
Sometimes you need to share data with all views, for example your application’s name. You can share view data across different requests using the `View` facade. A good place for shared data is a service provider, specifically the `boot` method. For example, you could use the `AppServiceProvider` within `app/providers/app-service-provider.ts`:

```ts
import { View } from '@supercharge/facades'

export default class AppServiceProvider {
  /**
   * Register application services to the container.
   */
  public register (): void {
    //
  }

  /**
   * Boot application services.
   */
  async boot (): Promise<void> {
    View.share('appName', 'Your Application Name')
  }
}
```


## Use Different Layouts
The `response.view` method supports a third argument: the view response configuration. You can adjust the view rendering for individual responses, for example to use a different base layout. Here’s an example using a landing page layout for the startpage:

```ts
import { Route } from '@supercharge/facades'
import { HttpContext } from '@supercharge/contracts'

Route.get('/', ({ response }: HttpContext) => {
  return response.view('startpage', undefined, { layout: 'landing-page' })
})
```
