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

The framework will automatically load all files in this directory when starting the HTTP server.

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

Organize your route files the way you want. Supercharge recursively looks for route files in the `app/routes` directory.


### Ignored Files and Folders
Sometimes you want to extract functionality from your route files into dedicated files. The framework will ignore all files and folders starting with an underscore, like `app/routes/_documentation`.

For example, rendering this Supercharge documentation uses two non-route classes, `Documentation` and `Renderer`, to show this documentation. This separation of functionality into files keeps the code base clean.

To ignore a `_documentation` directory, structure your files like this:

<div class="file-tree">
  <div class="item">app</div>
  <div class="children">
    <div class="item">routes</div>
    <div class="children">
      <div class="item">docs</div>
      <div class="children">
        <div class="item">pages.js</div>
        <div class="item">_documentation</div>
        <div class="children">
          <div class="item">renderer.js</div>
          <div class="item">documentation.js</div>
        </div>
      </div>
    </div>
  </div>
</div>




### Response Toolkit
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
If you define routes that should redirect to another URI, make use of the `h.redirect()` method. This method expects the destination URI as a parameter. You can either path a relative path or a full qualified domain:

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


### Advanced Routing
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


### Fallback/Catch-All Route
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
