# Application


## Introduction
Every Supercharge application (HTTP and console) relies on an `Application`. The `Application` instance in Supercharge is the central place holding your app together. Each app requires a “base path” defining the app’s root directory path. This base path tells the framework from where to boot your Supercharge app.

You’ll find bootstrapping files for HTTP and console applications inside of the `bootstrap` directory. Both bootstrapping files are used by the `server.ts` and `craft.ts` files (they are in the root of your app directory). Both files then start one of the following apps:

1. **HTTP Server:** start a web application using an HTTP server
2. **Console:** start a console application using the [Craft CLI](/docs/{{version}}/craft-console)


## IoC Container
Supercharge’s `Application` class is also an [IoC container](/docs/service-container) used to manage class dependencies. This allows apps to follow the concept of dependency injection. Find more details about the service container in the related docs:

👉 [IoC Service Container docs](/docs/service-container)

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


## Application Paths
You’ll find references to Supercharge’s `app` instance in most parts of the framework. And also within the documentation. The reason is that your `app` instance is the central place storing the base path to your application’s directory. Your base directory is the starting point to resolve paths to directories in your Supercharge application.


### `App.basePath()`
The `App.basePath` method returns the absolute path to your application’s root directory:

```ts
const path = app.basePath()
// /home/users/marcus/dev/supercharge/superchargejs.com
```


### `App.configPath()`
The `App.configPath` method returns the absolute path to your application’s `config` directory. You can also generate an absolute path to a given file within the configuration directory:

```ts
const path = app.configPath()
// <base-path>/config

const path = app.configPath('app.ts')
// <base-path>/config/app.ts
```


### `App.publicPath()`
The `App.publicPath` method returns the absolute path to your application’s `public` directory. You can also generate an absolute path to a given file within the public directory:

```ts
const path = app.publicPath()
// <base-path>/public

const path = app.publicPath('js/app.js')
// <base-path>/public/js/app.js
```


### `App.resourcePath()`
The `App.resourcePath` method returns the absolute path to your application’s `resources` directory. You can also generate an absolute path to a given file within the resources directory:

```ts
const path = app.resourcePath()
// <base-path>/resources

const path = app.resourcePath('js/app.ts')
// <base-path>/resource/js/app.ts
```


### `App.storagePath()`
The `App.storagePath` method returns the absolute path to your application’s `storage` directory. You can also generate an absolute path to a given file within the storage directory:

```ts
const path = app.storagePath()
// <base-path>/storage

const path = app.storagePath('cache/sessions')
// <base-path>/storage/cache/sessions
```


### `App.databasePath()`
The `App.databasePath` method returns the absolute path to your application’s `database` directory. You can also generate an absolute path to a given file within the database directory:

```ts
const path = app.databasePath()
// <base-path>/database

const path = app.databasePath('migrations/create-users-table-20220124.ts')
// <base-path>/database/migrations/create-users-table-20220124.ts
```

