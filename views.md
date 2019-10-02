# Views


## Introduction
Views separate the presentation logic from application logic and represent the web views. In your application, views are served as HTML by your server to the browser. In Supercharge, all views are located in the `resources/views` directory and its subfolders.

Supercharge uses the [@hapi/vision](https://github.com/hapijs/vision) library to support template rendering. The framework is configured to use [Handlebars](/docs/{{version}}/handlebars) as the view rendering engine. Find more details on Handlebars in the linked documentation.


## Creating Views
A very basic view may look like this:

```handlebars
<div>
  <h1>Hej, great to see you {{name}}</h1>
</div>
```

You may store this view template in `resources/views/welcome.hbs` and serve it when sending a request to a route like this:

```js
{
  method: 'GET',
  path: '/welcome',
  handler: (request, h) => {
    return h.view('welcome', { name: 'Marcus' })
  }
}
```

To render a view and send it as a response from your route handler, use the `h.view()` method. As you can see, `h.view` expects the view’s name as the first parameter. The second parameter is a data object that should be a available in the view context.

If you’re storing views in subdirectories, like `resources/views/auth/login.hbs`, you can serve them like this:

```js
{
  method: 'GET',
  path: '/welcome',
  handler: (request, h) => {
    return h.view('auth/login')
  }
}
```

Serving views located in subdirectories is no problem. Use a path-like structure with forward slashes when defining them in `h.view`.


## Pass Data to Views
Passing data to your views is pretty straightforward, pass an object as the second parameter to `h.view`:

```js
{
  method: 'GET',
  path: '/welcome',
  handler: (request, h) => {
    return h.view('welcome', { name: 'Marcus' })
  }
}
```

You’ll typically pass data to views as key-value pairs. You can then access each key in the related view and render its value into the HTML by wrapping it in curly brackets, for example `{{name}}`.


### Data Available to All Views
Supercharge appends the following object to all views:

```js
{
  request, // the request object
  user, // the authenticated user
  title, // the app title from config/app.js
  description // the app description from config/app.js
}
```

You can override each key from your route handler response. For example, if you want to use a `title` property on a web view, you may override it like this:

```js
{
  method: 'GET',
  path: '/welcome',
  handler: (request, h) => {
    return h.view('checkout', { title: 'Thank you for your purchase!' })
  }
}
```

You route view context overrides the default context and the `title` property from your route handler precedes the default `title`.


## Use Different Layouts
The `h.view` method supports a third argument: the view manager configuration. You can adjust the view manager for individual responses, for example to use a different base layout. Here’s an example using a landing page layout layout for the startpage:

```js
{
  method: 'GET',
  path: '/welcome',
  handler: (request, h) => {
    return h.view('startpage', null, { layout: 'landing-page' })
  }
}
```

Please head over to the `@hapi/vision` documentation for all allowed [view manager configuration options](https://github.com/hapijs/vision/blob/master/API.md#views-manager).
