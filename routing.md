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
Route parameters represent segments in the route’s URI. For example, you may want to capture a user’s ID from the URI. You can do that by using route parameters. Route parameters


### Required Route Parameters


```ts
Route.get('/:page', ShowDocs)
```


### Optional Route Parameters

```ts
Route.get('/:page?', ShowDocs)
```


## Route Groups
Tba.


### Middleware
Tba.


### Prefixes
Tba.


## Accessing the Current Route
You can retrieve route information using the [request](/docs/requests) instance. At this point you can’t access the route instance used by Supercharge.


## Cross-Origin Resource Sharing (CORS)
Tba.


