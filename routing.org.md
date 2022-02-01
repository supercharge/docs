# Routing


## Introduction
Routes in Supercharge are JavaScript objects consisting of three basic elements:

1. the HTTP `method`
2. the route `path`
3. the route `handler`

Here’s an example on how to create a basic route:

```js
{
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'You look awesome today!'
  }
}
```

The route handler is the core of each route, it performs the main logic. Every route handler method must return a value or a promise.


## Creating Routes
Put all your route files in the `app/routes` directory.

The framework will automatically load all files in this directory when starting the HTTP server. Your route directory may look like this:

<div class="file-tree">
  <div class="item">app</div>
  <div class="children">
    <div class="item">routes</div>
    <div class="children">
      <div class="item">welcome.js</div>
      <div class="item">404.js</div>
      <div class="item">auth</div>
      <div class="children">
        <div class="item">login.js</div>
        <div class="item">logout.js</div>
        <div class="item">signup.js</div>
      </div>
    </div>
  </div>
</div>

Organize your route files the way you want. Supercharge recursively looks for route files in the `app/routes` directory.


### Scaffold a Route with the Craft CLI
A way to create a new route is the `make:route` Craft command. This command will scaffold a new route in your application:

```bash
node craft make:route posts
# -> created: routes/posts.js

# create a route file in a folder
node craft make:route posts/create
# -> created: routes/posts/create.js
```

The resulting route file for `node craft make:route posts/create` looks like this:

```js
module.exports = {
  method: 'GET',
  path: '/posts/create',
  options: {
    handler: async (request, h) => {
      //
    }
  }
}
```


### Manually Create a Route
Every route file must export a single object or an array of objects describing a route:

```js
module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (request, h) => {
      return h.view('login')
    }
  },

  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      // attempt login

      return h.view('profile', user)
    }
  }
]
```


### Ignored Files and Folders
Sometimes you want to extract functionality from your route files into dedicated files. The framework will ignore all files and folders starting with an underscore `_`.

For example, rendering this [Supercharge documentation](https://github.com/superchargejs/superchargejs.com/tree/master/app/routes) uses two non-route classes, `Documentation` and `Renderer`, to show this documentation. This separation of functionality into files keeps the code base clean.

To ignore a `_documentation` directory, structure your files like this:

<div class="file-tree">
  <div class="item">app</div>
  <div class="children">
    <div class="item">routes</div>
    <div class="children">
      <div class="item">docs</div>
      <div class="children">
        <div class="item">pages.js</div>
        <div class="item">_helper.js</div>
        <div class="item">_documentation</div>
        <div class="children">
          <div class="item">renderer.js</div>
          <div class="item">documentation.js</div>
        </div>
      </div>
    </div>
  </div>
</div>


## Response Toolkit
Route handlers accept two arguments: `request` and `h`. The `h` parameter is the response toolkit providing you with the functionality to respond requests with HTML views or create custom responses.


### View Routes
The response toolkit renders view files located within your `resources/views` directory. Use the `h.view()` method to reference the related view. For example, render a `profile` view located at `resources/views/profile.hbs` like this:

```js
module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('profile', { name: 'Marcus' })
  }
}
```

In addition to the view name as the first argument, you may pass an object of data to the view as the optional second argument.


#### Customize the View Manager
The default templating configuration in Supercharge covers most of your use-cases. For routes where you need to customize the view rending options, pass a configuration object as the third argument to `h.view()`:

```js
module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('welcome', null, { layout: 'clean' }))
  }
}
```


#### CSRF Protection
Any route serving an HTML form pointing to a `POST`, `PUT`, `PATCH`, or `DELETE` endpoint should include a CSRF token. Requests will fail otherwise. Supercharge adds a CSRF token to every response. Use the `{{csrf}}` helper in your views to include it automatically in requests:

```html
<form method="POST" action="/login">
  {{csrf}}

  …
</form>
```

Find more details in the [CSRF documentation](/docs/{{version}}/csrf-protection).


### JSON Routes
Responding requests with data in JSON format is no problem in Supercharge. Return a JavaScript object from the route handler and that’s it:

```js
module.exports = {
  method: 'GET',
  path: '/',
  handler: () => {
    return { name: 'Marcus' }
  }
}
```

You can also compose a custom response to return JSON.


### Compose a Response
Composing custom responses is a useful feature. Changing the HTTP response status code or appending response headers is a common usage.

Create a custom response with `h.response()` and pass the response payload as an argument. From here, chain methods to further customize the responses:

```js
module.exports = {
  method: 'POST',
  path: '/comments',
  handler: async (request, h) => {
    const comment = await Comment.create(request.payload)

    return h
      .response(comment)
      .code(201)
      .type('application/json')
      .header('x-author', comment.author)
  }
}
```


### Redirects
If you define routes that should redirect to another URI, make use of the `h.redirect()` method. This method expects the destination URI as a parameter. You can either pass a relative path or a full qualified domain:

```js
module.exports = {
  method: 'GET',
  path: '/here',
  handler: (request, h) => {
    return h.redirect('/there')
  }
}
```

Redirects are temporary by default (status code 302). For permanent redirects with HTTP status code 301, you may use `h.permanentRedirect()`. This method accepts the destination as an argument.

```js
module.exports = {
  method: 'GET',
  handler: (request, h) => {
  path: '/here',
    return h.permanentRedirect('https://superchargejs.com')
  }
}
```


## Route Methods
A route’s HTTP method is defined via the `method` property in your route object. You can either assign a single string or an array of strings representing the HTTP methods to listen on.

```js
module.exports = {
  method: ['GET', 'POST'],
  path: '/posts',
  options: {
    handler: async (request, h) => {
      // handle GET and POST requests
    }
  }
}
```


## Route Parameters
Every route must identify a URI via the `path` property. You may assign required, optional or wildcard route parameters within the path.


### Required Parameters
A route path in Supercharge may contain placeholders. These placeholders identify named parameters in the URI.

Path parameters are identified by wrapping it in curly `{}` brackets.

For example, identify a user’s ID from the path segment like this:

```js
module.exports = {
  method: 'GET',
  path: '/user/{id}',
  options: {
    handler: async (request, h) => {
      const userId = request.params.id

      return `Requested user: ${userId}`
    }
  }
}
```

You‘re not limited to single route parameters. If required, add more route parameters like this:

```js
module.exports = {
  method: 'GET',
  path: '/team/{teamId}/player/{playerId}',
  options: {
    handler: async (request, h) => {
      const { teamId, playerId } = request.params

      return `Requested player ${playerId} from team ${teamId}`
    }
  }
}
```

You can assign a named parameter only once. All named path parameters are available in your route handlers via the request instance on `request.params`. Because the named path parametes in the example above are `teamId` and `playerId`, they’re available via `request.params.teamId` and `request.params.playerId`.

Named parameters must not contain the `-` character. It’s recommended to use an underscore `_` or camelcase instead.


### Optional Parameters
At times you may want to make a route parameter optional. Do this by putting a `?` character after the parameter name. Optional parameters are only allowed as the last parameter:

```js
module.exports = {
  method: 'GET',
  path: '/hello/{name?}',
  options: {
    handler: async (request, h) => {
      const name = request.params.name || 'stranger'

      return `Hello ${name}`
    }
  }
}
```

Ensure you’re adding default values in case the parameter value is empty.


### Multi-Segment Parameters
You may not always know or want to define the concrete route path. For example, if your app offers a download section you may organize files in sub-directories.

Allow a number of path segments by adding a `*` character to the paremter name:

```js
module.exports = {
  method: 'GET',
  path: '/download/{path*}',
  options: {
    handler: async (request, h) => {
      const path = request.params.path

      return `Requested download: ${path}`
    }
  }
}
```

A request to `/download/nodejs/supercharge/request-lifecycle.pdf` will result in a `path` value of `nodejs/supercharge/request-lifecycle.pdf`.

Notice that using wildcard parameters like `/{path*}` are only allowed as the last parameter.


## Advanced Routing
Supercharge uses the hapi framework as a configuration-centric HTTP layer. You can configure dozens of options on a route to customize the processing. For example, authenticate and authorize requests in `options.auth` or validate inputs in `options.validate`:

```js
const Joi = require('joi')

module.exports = {
  method: 'GET',
  path: '/admin',
  options: {
    auth: {
      strategy: 'session',
      scope: [ 'admin' ]
    },
    validate: {
      payload: {
        name: Joi.string().required()
      }
    }
    handler: (request, h) => {
      return h.view('admin-dashboard')
    }
  }
}
```

Have a look at [hapi’s route options](https://hapijs.com/api#-routeoptionsapp)  for a complete overview of allowed customizations.


## Fallback/Catch-All Route
Your Supercharge application comes with a default catch-all route located in `app/routes/404.js`. This route will render a 404 view by default. Update this route handler to your needs if you want a different behavior for this fallback route.

For example, if you want to respond with JSON payload to JSON requests, you could extend the handler to this:

```js
const Boom = require('boom')

module.exports = {
  method: 'GET',
  path: '/{path*}',
  handler: (request, h) => {
    if (request.wantsJson()) {
      return Boom.notFound('Page not available. You look great nonetheless!')
    }

    return h.view('errors/404').code(404)
  }
}
```


## Rate Limiting
You can extend Supercharge’s core with rate limiting. Have a look at the [Rate Limiting](/docs/{{version}}/rate-limiting) chapter and how to add this to your project.
