# Application


## Introduction
Every Supercharge application (HTTP and console) relies on an `Application`. The `Application` instance in Supercharge is the central place holding your app together. Each app requires a “base path” defining the app’s root directory path. This base path tells the framework from where to boot your Supercharge app.

You’ll find bootstrapping files for HTTP and console applications inside of the `bootstrap` directory. Both bootstrapping files are used by the `server.ts` and `craft.ts` files (they are in the root of your app directory). Both files then start one of the following apps:

1. **HTTP Server:** start a web application using an HTTP server
2. **Console:** start a console application using the [Craft CLI](/docs/{{version}}/craft-cli)


## IoC Container
Supercharge’s `Application` class is also an [IoC container](/docs/service-container) used to manage class dependencies. This allows apps to follow the concept of dependency injection.

👉 [IoC Container docs](/docs/service-container)

## Start a Web Application
The `server.ts` file in your root directory contains the logic to serve a Supercharge web app. It creates a new application and starts the HTTP server. Serving an HTTP server is as simple as invoking the `server.ts` file with Node.js to start a web application:

```bash
ts-node server.ts
```


## Start a Console Application
The `craft.ts` file in your application directory is the entry point to serve a Supercharge console app. It will load the core commands and then serve the CLI application.

```bash
ts-node craft.ts
```

