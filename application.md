# Supercharge Application


## Introduction
Every Supercharge application (HTTP and console) relies on an `Application` entry point. There are two default entry points to spin off an application:

1. **HTTP Server:** kick off a web application using an HTTP server
2. **Console:** kick off a console application using the [Craft CLI](/docs/{{version}}/craft-cli)

Supercharge abstracts the HTTP and console layer to make it easy for you to run both as an application. The required information is the root directory from where Supercharge will initialize components.

For web applications, the framework will pick up routes, middleware, events, and so on. For console applications, it registered available commands.


## Start a Web Application
The `server.js` file in your root directory contains the logic to serve a Supercharge web app. It creates a new application and starts the HTTP server. Serving an HTTP server is as simple as this:

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
The `craft` file in your application directory is the entry point to serve a Supercharge console app. It will load the core commands and then serve the application.

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

