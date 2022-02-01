# Middleware


## Introduction
Middlewares are an essential mechanism in your application to filter HTTP requests. A common example is an authentication middleware letting requests proceed the request lifecycle which meet the authentication requirements. In contrast, a request that is unauthenticated will be redirected to the login screen.

Based on certain conditions, requests may proceed or terminate early in the request lifecycle.

![Middleware in Supercharge](/images/docs/middleware.png)

Middleware in Supercharge are located in the `app/middleware` directory. This directory does not exist with a default installation. Go ahead and create this directory when adding your own middleware.



## Request Lifecycle
Supercharge uses [hapi](https://hapijs.com), a Node.js web framework, as the HTTP layer. A benefit of using hapi is the extensive request lifecycle.


### Extension Points
Supercharge provides seven extension points along the request lifecycle:

- `onRequest`
- `onPreAuth`
- `onCredentials`
- `onPostAuth`
- `onPreHandler`
- `onPostHandler`
- `onPreResponse`

Middleware in Supercharge must extend one of the listed extension points. Notice that you have five extension points before hitting the route handler and two after the route handler. Every response (no matter if success or failure) will go through the `onPreResponse` extension point. This is the right place for use cases where you want to intercept all your responses.


### Request Lifecycle Cheat Sheet
We’ve created a [request lifecycle cheat sheet](https://futurestud.io/downloads/hapi/request-lifecycle) outlining every step that a request goes along the way through the framework. The link redirects you to the PDF download page.


## Creating Middleware
A middleware in Supercharge is a so called “lifecycle function”. The term lifecycle function is related to being a function in the request lifecycle. A middleware that touches every incoming request is a “global” lifecycle extension located in the `app/middlewar directory.

Create middleware in Supercharge using a class and implementing at least one of the request lifecycle extension points. Each extension function has the signature `async (request, h)`:

```js
class MyMiddleware {
  async onPreHandler(request, h) {
    // …
  }
}
```

Supercharge automatically instantiates the middleware instances and passes the HTTP `server` instance as the only parameter to the constructor:

```js
class MyMiddleware {
  constructor(server) {
    this.server = server
  }

  async onPreHandler(request, h) {
    // …
  }
}
```

You can surely create other methods besides the extension points to split the responsibility:

```js
const Env = require('@supercharge/framework/env')

class MyMiddleware {
  async onPreHandler(request, h) {
    if (this.isTesting()) {
      return h.continue
    }

    // further processing
  }

  isTesting() {
    return Env.isTesting()
  }
}
```

A middleware can remove duplicated code from your route handlers. Remember global and route-level middleware whenever you think that functionality should live outside of route handlers.


## Using Middleware
Supercharge automatically loads all your middleware when starting the application. It’ll recursively traverse the `app/middleware` folder, pick up all files and load it as individual middleware to your app.


### Registering Global Middleware
Every file located in `app/middleware` is a global middleware. Precisely, every request to your application will go through all middleware located in the `app/middleware`.


### Registering Middleware on Routes
You can create middleware and assign it to [individual routes](/docs/{{version}}/routing). In this case, you should locate the route-level middleware next to your route file. To tell Supercharge to skip your route-level middleware when loading route file (because it’s not a route), prefix the file with an underscore `_`.

Skipping middleware files isn’t available in Supercharge yet. That’s the reason you have to put route-level middleware in the routes folder. If you [want to PR this feature, please don’t hesitate!](https://github.com/superchargejs/framework/blob/master/src/foundation/http/bootstrap/load-middleware.js)


#### Example
Imagine an application rendering the docs you’re currently reading. A file tree in the application may look like this:

<div class="file-tree">
  <div class="item">app</div>
  <div class="children">
    <div class="item">routes</div>
    <div class="children">
      <div class="item">docs</div>
      <div class="children">
        <div class="item">page.js</div>
        <div class="item">_check-version-middleware.js</div>
      </div>
    </div>
  </div>
</div>

Remember that `_check-version-middleware.js` is prefixed with an underscore telling Supercharge to skip this file when loading routes.

The `_check-version-middleware.js` then exports the middleware’s lifecycle function:

```js
async function checkVersion(request, h) {
  // check docs version
}

module.exports = checkVersion
```

The next step is to assign this middleware in your documation’s `page.js` route:

```js
module.exports = {
  method: 'GET',
  path: '/docs/{{page}}',
  options: {
    ext: {
      onPreHandler: {
        method: require('./_check-version-middleware')
      }
    }
    handler: (request, h) => {
      // render docs page
    })
  }
}
```

Requests to `GET /docs/{{page}}` will go through the version check middleware at the `onPreHandler` extension point.
