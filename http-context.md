# HTTP Context


## Overview
The HTTP context is a request-related object holding the `request` and `response` instances. You’ve access to the HTTP context in HTTP controllers (or route handler functions), middleware, and the error handler.


### HTTP Context in Route Handlers
Here’s an example of the HTTP context for an inline route handler:

```ts
import { Route } from '@supercharge/facades'
import { HttpContext } from '@supercharge/contracts'

Route.get('/docs', (ctx: HttpContext) => {
    // use the `ctx.request` and `ctx.response` instances
    // to process the incoming request
    // and return a response
})
```


### HTTP Context in Controllers
Supercharge provides the HTTP context to the `handle` method in HTTP controllers:

```ts
import { Controller } from '@supercharge/http'
import { HttpContext } from '@supercharge/contracts'

export class ShowDocs extends Controller {
  /**
   * Handle the given request.
   */
  handle (ctx: HttpContext): HttpRedirect {
    // run the processing …
  }
}
```

You can also destructure the HTTP context instance when needed:

```ts
export class ShowDocs extends Controller {
  handle ({ request, response }: HttpContext): HttpRedirect {
    // run the processing …
  }
}
```

```info
**Notice:** you must explicitly type the `HttpContext` instance in such cases because your IDE can’t derive the types automatically
```


## Accessing the Raw Node.js Request
Sometimes you need to access the raw Node.js request instance. For example, when running tests with a library that requires the plain Node.js objects. You may retrieve the raw `IncomingMessage` request instance like this:

```ts
export class ShowDocs extends Controller {
  handle ({ request, response }: HttpContext): HttpRedirect {
    const incomingMessage = request.req()
  }
}
```


## Properties
The HTTP context object provides two properties:

- [request](/docs/{{version}}/requests): a reference to the HTTP request
- [response](/docs/{{version}}/responses): a reference to the HTTP response

Find more details about them on their related documentation pages.
