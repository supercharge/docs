# Middleware


## Introduction
Middleware are an essential mechanism in your application to filter HTTP requests. A common example is an authentication middleware letting requests proceed the request lifecycle which meet the authentication requirements. In contrast, a request that is unauthenticated will be redirected to the login screen.

Based on certain conditions, requests may proceed or terminate early in the request lifecycle.

Middleware in Supercharge are located in the `app/middleware` directory. This directory does not exist with a default installation. Go ahead and create this directory when adding your own middleware.


## Request Lifecycle Extension Points
Supercharge uses [hapi](https://hapijs.com), a Node.js web framework, as the HTTP layer. A benefit of using hapi is the extensive request lifecycle. Supercharge gives your several extension points along the request lifecycle:

- `onRequest`
- `onPreAuth`
- `onCredentials`
- `onPostAuth`
- `onPreHandler`
- `onPostHandler`
- `onPreResponse`

Middleware in Supercharge must extend one of the listed extension points. Notice that you have five extension points before hitting the route handler and two after the route handler. Every response (no matter if success and failure) will go through the `onPreResponse` extension point. This is the right place for use cases where you want to intercept all your responses.


### Request Lifecycle Cheat Sheet
We've created a [request lifecycle cheat sheet](https://futurestud.io/downloads/hapi/request-lifecycle) outlining every step that a request goes along the way through the framework. The link redirects you to the PDF download page.


## Creating Middleware
Text


## Using Middleware
Supercharge automatically loads all your middleware when starting the application. It'll recursively traverse the `app/middleware` folder, pick up every file and load it to your app.


### Registering Global Middleware
Every file located in `app/middleware` is a global middleware. Precisely, every request to your application will go through all your middleware.


### Registering Middleware on Routes
Text


