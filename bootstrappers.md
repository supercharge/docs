# Supercharge Bootstrappers


## Introduction
Bootstrappers are the core of your Supercharge application. When starting your Supercharge Node.js server, the framework composes your whole application using the framework’s bootstrappers and your application bootstrappers.

The idea of bootstrappers in Supercharge is to “register” functionality to the application. For example, reading the environment context of your Node.js proces happens in an environment bootstrapper when starting your application. Core bootstrappers load configurations, events, loggers, middleware, routes, or connect to the database.


## Configuration
Supercharge automatically loads core bootstrappers when starting your application. These core bootstrappers are environment, configuration, events, loggging, database, composing the HTTP and console kernels, loading routes and middleware.

To load your own bootstrappers, open the `bootstrap/app.js` configuration file. This file exports an object containing the `bootstrappers` property exposing an array of bootstrappers:

```js
module.exports = {
  bootstrappers: [
    require('../app/bootstrappers/session'),

    // further bootstrappers come here
  ]
}
```


## Registering Bootstrappers
A default Supercharge installation registers the session bootstrapper providing server side sessions. If you don’t need sessions in your application, for example when developing stateless apps like APIs, you can remove the bootstrapper from the `bootstrappers` array.

Register your own bootstrappers by adding them to the `bootstrappers` array in the `bootstrap/app.js` config file:

```js
module.exports = {
  bootstrappers: [
    require('../app/bootstrappers/session'),

    require('a-supercharge-package/bootstrapper'),
  ]
}
```

The `require('a-supercharge-package/bootstrapper')` statement assumes that your `a-supercharge-package` has a `bootstrapper.js` file in the root of the package directory. The `require` method form Node.js will search for a file located at the defined package path. This allows you to reference a bootstrapper file without exporting it as the main entry point to your module.


## Bootstrappers and the Boot Method
Every bootstrapper in Supercharge must be a class. The constructor of your bootstrapper class receives the application instance. The application instance gives you access to the HTTP `server` and `console` kernel instances.

For the actual bootstrapping, the framework calls the `async boot` method when starting the application.

Depending on whether your want to extend the HTTP server or the console kernel, you have access to both:

```js
class YourBootstrapper {
  constructor ({ server, console }) {
    this.server = server
    this.console = console
  }

async boot () {
    //
  }
}

module.exports = YourBootstrapper
```

Here’s a sample “maintenance bootstrapper” adding request lifecycle extension points (middleware) and two Craft console commands:


```js
const MaintenanceLifecycle = require('my-maintenance-package/middleware')
const StopMaintenanceCommand = require('my-maintenance-package/commands/stop')
const StartMaintenanceCommand = require('my-maintenance-package/commands/start')

class MaintenanceBootstrapper {
  constructor ({ server, console }) {
    this.server = server
    this.console = console
  }

  async boot () {
    await this.server.extClass(MaintenanceLifecycle)

    await this.console.addCommand(StopMaintenanceCommand)
    await this.console.addCommand(StartMaintenanceCommand)
  }
}

module.exports = MaintenanceBootstrapper
```
