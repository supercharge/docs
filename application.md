# Supercharge Application


## Introduction
Every Supercharge app (HTTP and console) relies on an `Application` entry point. Every Supercharge app has two default entry points to spin off an application:

1. **HTTP Server:** kick off a web application using an HTTP server
2. **Console:** kick off a console application using the [Craft CLI](/docs/{{version}}/craft-cli)

Supercharge abstracts the HTTP and console layer to make it easy for you to run an application. The required information to launch an application is a application root directory from where Supercharge will initialize start loading the application components. The root directory tells the framework where to search for application components like routes, middleware, events, or console commands.


## Start a Web Application
The `server.js` file in your application directory contains the logic to serve a Supercharge web application. It creates a new application and starts the HTTP server. Serving an HTTP server is as simple as this:

```js
const App = require('@supercharge/framework/application')

new App()
  .fromAppRoot(__dirname)
  .httpWithFullSpeed()
```

Invoke the related file with Node.js to start a web application:

```bash
node server.js
```


## Start a Console Application
The `craft` file in your application directory is the entry point to serve a Supercharge console application. The console application will load the core commands and then serve the application.

```js
#!/usr/bin/env node

const App = require('@supercharge/framework/application')

new App()
  .fromAppRoot(__dirname)
  .consoleForLife()
```

Invoke the related file with Node.js to start a console application:

```bash
node craft
```

