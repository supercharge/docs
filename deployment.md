# Deployment


## Introduction
At some point you want to deploy your Supercharge application to production. You want to serve your application as best as possible to your audience when going live. This documentation page will point you to different deployment ideas.


## Asset Pipeline
At this point, Supercharge doesn’t ship with an asset pipeline to minify your client-side CSS and JS assets. Please choose your favorite build tool and bundler and create your custom setup. We’ve good experience using [Webpack](https://webpack.js.org) or [Parcel](https://parceljs.org).


## Zero-Downtime Deployments
You want to minimize downtimes when running your application in production. Supercharge supports zero-downtime deployments out-of-the-box. You can extend the HTTP kernel in case you need to send signal messages.

For example, this Supercharge website uses PM2 in production. We configured PM2 two run two app instances in cluster mode in production. Two app instances allow us to have an “always on” setup while one instance reboots. We also [send a `READY` signal from the HTTP kernel](https://github.com/supercharge/superchargejs.com/blob/11cfece6e7729a2884be733fab2714fcb51cd7ea/app/http/kernel.ts#L14-L29) telling PM2 that the instance is online.


### PM2 Deployments
We recommend to use a process manager, like [PM2](http://pm2.keymetrics.io/), to run your application in production. Zero-downtime deployments with PM2 are only available cluster mode. You may check out the [PM2 configuration file from this Supercharge website](https://github.com/supercharge/superchargejs.com/blob/main/pm2.config.js).

Here’s a sample PM2 configuration which you could save as `pm2.json` in your app:

```json
{
  "apps": [
    {
      name: 'superchargejs.com',
      args: 'server.ts',
      exec_mode: 'cluster',
      instances: 2,

      /**
       * The `wait-ready` and `listen-timeout` settings support graceful restarts in a
       * zero-downtime manner. A “booted” callback in the HTTP kernel sends the `wait`
       * signal when the server is ready to accept connections. PM2 waits at most
       * the configured `listen-timeout` before marking the app as ready.
       */
      wait_ready: true,
      listen_timeout: 15_000,

      env: {
        NODE_ENV: 'production',
        PORT: 2021
      }
    }
  ]
}
```


## SSL
Ensure that your application uses HTTPS in production. At this point, Supercharge will create a Node.js HTTP server and you can’t adjust the setup to bootstrap an HTTPS server.

You should deploy a reverse proxy (like [nginx](https://nginx.org/en/) or [Caddy](https://futurestud.io/tutorials/caddy-reverse-proxy-a-node-js-app)) to terminate Internet traffic and pass requests through to your application.

[Let's Encrypt](https://letsencrypt.org/) offers free SSL certificates to protect your applications. The [Certbot](https://certbot.eff.org/) command line utility generates Let's Encrypt SSL certificates and integrates with nginx. It updates the nginx configurations for your domains to support HTTPS.


## Deployment Checklist
Serving this documentation as fast as possible in “always on” manner is important to let you read it whenever you want. Therefore, we collected a list of deployment tips. Use this checklist as a reference when deploying your app to the public:


**Application**
- ensure `NODE_ENV=production`
- enable error logging or use an error tracking service (e.g., [Sentry](https://sentry.io))
- use an LTS or stable Node.js release
- check if your server has sufficient resources
- ensure you’re not using `JSON.parse()` for large data (large is `1 MB` or more)
- validate request input values


**Performance**
- activate HTTP/2 (nginx or your Node.js server)
- use a process manager to run your application (e.g., [PM2](http://pm2.keymetrics.io/))
- remove unused dependencies from your `package.json`
- offload computational intensive operations from route handlers/controllers to worker threads
- prefer asynchronous operations to not block the Node.js event-loop
- minify static assets: CSS and JavaScript
- minify your images (e.g., [tinypng.com](https://tinypng.com))
- serve static files with long-lasting expiration headers
- lazy load images


**Security**
- use SSL
- [check your SSL configuration](https://www.ssllabs.com/ssltest/)
- all tests pass
- the `.env` file is not checked-in to your source control
- no sensitve data (API keys, passwords) in the configuration files
- check your depencencies for securiy concerns with `npm audit`
- enable rate limiting whenever possible
- run your application as a non-root user
- use HTTPS when requesting external links
- [check your HTTP headers](https://securityheaders.com/)
