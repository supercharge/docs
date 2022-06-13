# Decorations


## Overview
Decorations in Supercharge describe custom functionality extending the HTTP core. You’re essentially adding your own properties or methods to the core. It’s a controlled and safe way to extend three core objects in your application:

- `server`: the HTTP server instance
- `request`: a request instance in a lifecycle method
- `toolkit`: the response toolkit, also known as `(h)`


## Where to Add Decorations
[Plugins](/docs/{{version}}/plugins) are a good place to add decorations. Adding a new decoration requires the server instance and plugins expose it.


## Create a Decoration
A decoration can be a function or any other value, like an object, string, boolean, number or anything else.

A new decoration has this format:

```js
server.decorate(type, property, method)
```

- `type`: the decorating interface (`request`, `toolkit`, `server`)
- `property`: the decoration’s name
- `method`: the decoration’s function or value

Let’s look at some examples to illustrate the usage.


### Example 1: Function Decoration
Imagine an application where you often need to check whether a resource exists. In case it isn’t available, you’ll render a 404 page. This is a typical reply: `h.view('errors/404').code(404)`.

Using decorations, you can create a dedicated method to reply a 404 error view. You can centralize the reference to the error view and status code in a single place.

Here’s what a 404 decoration on the `toolkit` can look like:

```js
module.exports = {
  name: 'decorate-404-quickshot',
  register: (server) => {
    async function render404() {
      return this.view('errors/404').code(404)
    }

    server.decorate('toolkit', 'notFound', render404)
  }
}
```

Please notice that the `this` context in your decoration methods binds to the decorated object. Here, `this` binds to the `toolkit` and it’s methods. That’s the reason you can create a response from the toolkit decoration.

Go ahead and use the decoration in your application. Here’s an example of a route handler for this documentation searching for the requested page. In case the page isn’t available, the 404 response is a quick call to the decorated method:

```js
handler: (request, h) => {
  const page = await docs.getPageContent(request.params.page)

  if (!page) {
    return h.notFound()
  }

  return h.view('docs/page', { page })
}
```

The benefit here is that you compose a repeated response once and use it throughout your app.


### Example 2: Object Decoration
This example illustrates how to decorate the `server` instance with the `app` property. The `app` property is an object including details about your application. Here’s what a decoration may look like:

```js
const { version } = require('../package.json')

module.exports = {
  name: 'decorate-request-docs',
  register: (server) => {
    server.decorate('server', 'app', { version })
}
```

Throughout your application, you can use your decoration by accessing `server.app.version`. In lifecycle methods (request handler, middleware), you may access the decorated object via `request.server.app.version`.

