# Request Lifecycle


## Introduction
Starting a Supercharge application via the `server.js` file serves an HTTP server. This HTTP server handles web requests. Each HTTP request to your application goes through a pre-defined lifecycle.

It's important to understand the request lifecycle. Supercharge uses the [hapi](https://hapijs.com) Node.js framework as it's HTTP layer. A benefit of using hapi: the granular request lifecycle with extension points at various lifecycle steps.

At this point, only the Supercharge HTTP server supports a request lifecycle. Craft CLI commands don't have a request lifecycle.


## Lifecycle Extension Points
Supercharge supports multiple extension points throughout the request lifecycle. Use the following extension points to intercept the request's procesing:

- `onRequest`: always called for incoming requests, the route is not determined yet
- `onPreAuth`: called regardless of authentication; route available, JSONP and cookies parsed
- `onCredentials`: called for successfully authenticated requests
- `onPostAuth`: called regardless of authentication; authorization based on access configuration
- `onPreHandler`: called if validations pass for payload, header, query and path params, cookies
- `onPostHandler`: response is defined and can be modified
- `onPreResponse`: always called unless the request is aborted

Extend the request lifecycle granularly at each of the seven extension points using [middlewares](/docs/{{version}}/middleware).


## Request Lifecycle Cheat Sheet
A picture says more than a thousand words. This quote fits perfectly for the request lifecycle. We created a [hapi request lifecycle cheat sheet](https://futurestud.io/downloads/hapi/request-lifecycle) outlining the request flow. Supercharge uses hapi as the HTTP core.

[![Supercharge feat. hapi request lifecycle](https://futurestud.io/images/hapi-request-lifecycle-preview.png)](https://futurestud.io/downloads/hapi/request-lifecycle)


## Request vs. Application Lifecycle
This documentation's navigation has a page for the request lifecycle and an application lifecycle. The difference between both lifecycles is that the request lifecycle describes how an HTTP request is handled within a running application. The application lifecycle describes the start and shutdown of your application.

You can intercept the application shutdown at three extension points. Find more details in the [application lifecycle docs](/docs/{{version}}/app-lifecycle).

