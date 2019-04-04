# Plugins


## Introduction
Supercharge supports [hapi’s](https://hapijs.com/tutorials/plugins) powerful plugin system. A plugin isolates functionality into a reusable utility. A plugin gives you access to the HTTP server instance. Make use of plugins if you want to extend the HTTP server.

Plugins in Supercharge are located in the `app/plugins` directory. This directory already exists in a default app installation.


## When to Use Plugins
Plugins are a great way to register re-usable functionality into Supercharge’s HTTP server. For example, we’ve created a [rate limiting](/docs/{{version}}/rate-limiting) plugin that can be used in any hapi application. The rate limiting plugin isn’t tied to a single application, you can bring it into any of your apps.

Another use case of plugins are [decorations](/docs/{{version}}/decorations). Decorations describe properties on the HTTP server instance, the request object or response toolkit. Because you’ve access to the server instance in Supercharge plugins, you can add your decorations there.

Here’s a list of ideas when plugins are helpful:

- you need access to the HTTP `server` instance
- decorations on the `server,`, `request`, or response toolkit `h`
- add plugins from the Supercharge and hapi ecosystem to your app
- add reusable features (like rate limiting) to your application
- add multiple middleware functions in a single place, via `server.ext()`


## Create a Plugin
Plugins in Supercharge consist of two properties:

1. `name`: a descriptive plugin name
2. `register`: the method that extends the HTTP server

Create a plugin by exporting an object that provides both of the named properties:

```js
module.exports = {
  name: 'test-plugin',
  register: (server) => {
    // your plugin code
  }
}
```

The `register` function contains all your plugin-specific code. Creating your own plugins is helpful when packaging individual functionality and globally applying it to your HTTP server.


## Register Existing Plugins
Supercharge uses the hapi framework as the HTTP core and supports version-compatible plugins from hapi’s ecosystem.

For example, we’ve created the [hapi-dev-errors](https://github.com/futurestudio/hapi-dev-errors) plugin providing a convenient error view with all developer issues. This plugin is part of a default Supercharge app.

Here’s how you install a hapi plugin into Supercharge:

```js
const Config = require('@supercharge/framework/config')

module.exports = {
  plugin: require('hapi-dev-errors'),
  options: {
    showErrors: !Config.get('app.isProduction'),
    toTerminal: false
  }
}
```

That the `hapi-dev-errors` plugin supports individual options and you can leverage the [configuration](/docs/{{version}}/configuration) utility to pass in your app’s configs.
