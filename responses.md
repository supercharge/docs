# HTTP Responses


## Sending Responses
All your routes must have a route handler which return an HTTP response back to the browser or requesting client. Sending a response is pretty straightforward: just return a value from the route handler. The framework takes care of setting the corresponding response type:

```js
module.exports = {
  method: 'GET',
  path: '/',
  handler: () => {
    return 'Supercharge is sweet'
}
```

You can send HTTP responses in Supercharge from route handlers and change the response in request lifecycle extension points coming after the route handler.

```info
Please notice that an HTTP response is available at `request.response` after the route handler was executed.
```

### Response Toolkit
Supercharge uses the `hapi` web framework as the HTTP core. Each route handler receives two arguments: `request` and `h`.

The `request` object describes the incoming request containing details like the request parameter, payload, header, and more.

The `h` argument is the response toolkit where `h` just represents the first letter from “hapi”.

```js
module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h
      .response('Supercharge is sweet')
      .header('Content-Type', 'text/plain')
      .code(202)
}
```

The response toolkit is your helper to compose more complex responses. Imagine such complex responses as responses where you modify the status code, add response headers, set the response type, and add cookies. All this functionality is included in the response toolkit.


### Continuing Responses
In some situations, you want to change the response and proceed the request lifecycle as usual. A use-case for this is adding headers to your response without composing a new response, but just extending the existing one.

In these situations, you can send a continue signal using the response toolkit:

```js
class MyMiddleware {
  onPreResponse(request, h) {
    request.response.header('my-header', 'value')

    return h.continue
  }
}
```


### Add Response Headers
The response toolkit provides a fluent interface to seamlessly chain methods constructing responses. Use the `header` method to append response headers before sending the response:

```js
return h
    .response(data)
    .header('Header-1', 'value')
    .header('Header-2', 'value')
```


### Add Cookies to Responses
Adding cookies to the response can be done using the `h.cookie` method. The required parameters are the cookie name and value:

```js
return h
    .response(data)
    .cookie('name', 'value')
```

Also, the `h.cookie` method is part of the fluent interface and allows you to chain further methods, like adding response headers.

If you want to set a custom coookie configuration, you can pass an object as the third argument to the `h.cookie` method:

```js
return h
    .response(data)
    .cookie('last-login', new Date(), { ttl: 1000 * 60   * 60 * 24 }) // 1d lifetime
```

```info
Cookies in hapi (and with that in Supercharge) can be configured either on the HTTP `server` instance or when defining the response cookie.
```


## Redirects
Redirects are part of the response toolkit as well. The frameword has supports two types of redirects, temporary and permanent. All redirect methods accept the redirect URI as an argument.


### Temporary Redirects
Use the `h.redirect` method to redirect users temporarily. Supercharge automatically sets the HTTP 302 status code and related response headers for you:

```js
module.exports = {
  method: 'GET',
  path: '/profile',
  handler: (request, h) => {
    if (! request.auth.isAuthenticated) {
      return h.redirect('/login')
    }

    //
}
```

For situations where you want to ensure that a redirect keeps the requested HTTP method, you should use the `h.redirectWithPayload` method. This will set the HTTP status code to 307 and keeps the requested method, like `POST` stays `POST`:

```js
module.exports = {
  method: 'POST',
  path: '/profile',
  handler: (request, h) => {
    if (! request.auth.isAuthenticated) {
      return h.redirectWithPayload('/login')
    }

    //
}
```


### Permanent Redirects
Permanent redirects use the HTTP status code 301 and Supercharge provides the related `h.permanentRedirect` method. This will also set the related response headers for you:

```js
module.exports = {
  method: 'GET',
  path: '/blog',
  handler: (request, h) => {
    return h.permanentRedirect('/tutorials')
}
```

If you want to keep the requested HTTP method while redirecting it to a new URI, you should use the `h.permanentRedirectWithPayload` method:

```js
module.exports = {
  method: 'POST',
  path: '/register',
  handler: (request, h) => {
    return h.permanentRedirectWithPayload('/signup')
}
```


## Response Types
Supercharge has support for multiple response types, for example HTML views, JSON, buffers, or streams.


### View Responses
Building a web application requires you to render web views using HTML. Supercharge has solid view rendering support built on top [`@hapi/vision`](https://github.com/hapijs/vision) using the Handlebars template rendering engine. It configures a view manager for you using the `resources/views` directory as the place to look for view templates.

Use the `h.view` method to render HTML views on server side and send the resulting HTML to the browser. Pass the path of the view file as the first parameter:

```js
module.exports = {
  method: 'GET',
  path: '/signup',
  handler: (request, h) => {
    return h.view('auth/signup)
}
```


#### Passing Data to Views
You can also pass data to views to dynamically render content. Pass your custom data as the second argument of `h.view`:

```js
module.exports = {
  method: 'POST',
  path: '/signup',
  handler: (request, h) => {
    return h.view('auth/signup, { email: request.payload.email })
}
```


#### Customizing the View Manager
You can adjust the pre-configured view manager on individual views by passing a third argument to the `h.view` method. The third argument is the configuration object of the view manager.

```js
return h.view('auth/login', data, { layout: 'clean' })
```

```info
Please find more details about the [view manager configuration in the API docs of @hapi/vision](https://github.com/hapijs/vision/blob/master/API.md#views-manager).
```


#### JSON Responses
Sending JSON responses is seamlessly integrated in Supercharge. Return a plain data type and Supercharge automatically converts the data to JSON and sets the `content-type` header to `application/json`. For

```js
module.exports = {
  method: 'GET',
  path: '/users',
  handler: async () => {
    return [
      { name: 'Marcus' },
      { name: 'Supercharge' }
    ]
  }
}
```

If you want to modify the response, like changing the response status code, adding response headers, or changing the response type, you should wrap the response data into the `h.response(data)` function. This ensures your that your response data is sent along with other customizations:

```js
const User = require('../models/user)

return h
    .response(await Users.findById(1))
    .type('application/json')
```


#### File Downloads
By default, Supercharge includes routes to serve assets (CSS, JS, images). Serving assets uses the `@hapi/inert` plugin, registered as a plugin in `app/plugins/serve-assets.js`. The `@hapi/inert` plugin decorates the response toolkit with a `file` method allowing you to respond files. Provide the file's path to the
`h.file` method and the framework takes care of sending the response:

```js
return h.file('pathToFile')
```
