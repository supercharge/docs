# Routing


## Introduction
Routing is an essential part of your web applictions. Each route requires a URI and route handler. The simplest way to create a route in Supercharge is to use the `Route` facade and providing the route URI and a closure function as the route handler:

```ts
import { Route } from '@supercharge/facades'

Route.get('/hello', () => {
    return 'Hello you!'
})
```


### Default Route Files
All routes of your Supercharge application are defined inside of route files. Route files are located inside of the `routes` directory. The `routes` directory of a new Supercharge application contains a `routes/web.ts` file. This `web.ts` file defines routes for your web applications.

Route files are loaded automatically loaded by the `RouteServiceProvider` which is located at `app/providers/route-service-provider.ts`.


### Routing Basics
Most of the time you’re adding routes to your application by defining them in the `routes/web.ts` file. All routes defined there are available after starting the HTTP server.

For example, when adding the following route you’re able to access it via the browser at `http://localhost:3000/user`:

```ts
import { Route } from '@supercharge/facades'

Route.get('/user', () => {
    return 'Hello Supercharge'
})
```


### Available Router Methods
Supercharge’s `Route` facade supports the following HTTP verbs:

```ts
Route.get(uri, routeHandler)
Route.post(uri, routeHandler)
Route.put(uri, routeHandler)
Route.delete(uri, routeHandler)
Route.patch(uri, routeHandler)
Route.options(uri, routeHandler)
```


### Using Controllers as Route Handlers
Supercharge supports [controller classes](/docs/{{version}}/controllers) besides inline route handlers. Instead of passing a closure function as the route handler, you may provide a class constructor. The controller class must implement a `handle` method which will be called when resolving the controller for a route call:

```ts
import { Route } from '@supercharge/facades'

class HelloController {
    handle(): string {
        return 'Hello Supercharge'
    }
}

Route.get('/user', HelloController)
```

**Notice:** you’re typically not creating controller classes in the `routes/web.ts` file. Find more details on [HTTP controllers in Supercharge](/docs/{{version}}/controllers) in the related docs.


## Route Parameters
Route parameters represent segments in the route’s URI. For example, you may want to capture a user’s ID from the URI. You can do that by using route parameters.

Route parameters start with a colon, like `:userId`. The route parameter name follows after the colon and should consist of alphabetic characters. You can also use underscores (`_`) in route parameter names:

```ts
Route.get('/hello/:name', ({ request }) => {
    const name = request.param('name')

    return `Hello ${name}`
})
```


### Required Path Parameters
Required path parameters end with their name. The router matches only requests providing a name as the second URI segment:

```ts
Route.get('/hello/:name', ({ request }) => {
    const name = request.param('name')

    return `Hello ${name}`
})
```


### Optional Path Parameters
Sometimes it’s useful to define a path parameter that isn’t required to be present on a URI. You can specify optional path parameters by putting a `?` mark at the end of the parameter name:

```ts
Route.get('/hello/:name?', ({ request }) => {
    const name = request.params().get('name', 'Supercharge')

    return `Hello ${name}`
})
```

You’ve access to the path parameters on the [request](/docs/{{version}}/requests) instance. The `request` instance allows you to fetch path parameters and assign a default value in case no parameter value is present on the URI.


## Route Groups
Route groups share attributes, like middleware or URI prefixes, across a number of routes without needing to assign these attributes on each route individually.

The Supercharge router also supports nested route groups. Attributes for nested route groups are merged with their parents. Middleware between route groups are merged. Path prefixes are appended and slashes will be added automatically to properly resolve route paths.


### Middleware
You can assign [middleware](/docs/{{version}}/middleware) to a route group using the `middleware` method before defining the group. Pass the defined middleware names as the parameter to the route group’s `middleware` method:

```ts
Route.middleware(['first', 'second']).group(() => {
    // `first` and `second` middleware run for all routes defined in this group

    Route.get('/', () => {
        // …
    })
})
```


### Prefixes
You can assign URI prefixes to a route group using the `prefix` method. Each route in that group receives the provided prefix. For nested route groups with prefixes, Supercharge appends the prefixes from parents:

```ts
Route.prefix('/admin').group(() => {
    Route.get('/', () => {
        // resolves to route path `/admin`
    })

    Route.get('/users', () => {
        // resolves to route path `/admin/users`
    })
})
```


## Accessing the Current Route
You can retrieve route information using the [request](/docs/requests) instance. At this point you can’t access the route instance used by Supercharge.


## Cross-Origin Resource Sharing (CORS)
A Supercharge applications comes with a CORS middleware. This CORS middleware is enabled by default for new applications and configured in `middleware` method of the HTTP kernel. You can find the HTTP kernel in `app/http/kernel.ts`. All CORS settings are adjustable in the `config/cors.ts` configuration file.


