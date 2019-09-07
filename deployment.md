# Deployment


## Introduction
At some point you want to deploy your Supercharge application to production. When “going live” you want to serve your application as best as possible to your audience. This documentation page will point you to different deployment ideas.


## Asset Pipeline
At this point, Supercharge doesn’t ship with an pipeline to minify your client-side CSS and JS assets. Please choose your favorite build tool and create your custom setup.


## Zero-Downtime Deployments
You want to minimize downtimes when running your application in production. Supercharge supports zero-downtime deployments out-of-the-box. Any processing that you want to run while your HTTP server stops should be part of the [application lifecycle](/docs/{{version}}/app-lifecycle).

Supercharge uses [hapi-pulse](https://github.com/futurestudio/hapi-pulse) to gracefully stop the HTTP server and run your lifecycle methods. It listens for the `SIGINT` and `SIGTERM` events to gracefully shut down.


### PM2 Deployments
We recommend to use a process manager, like [PM2](http://pm2.keymetrics.io/), to run your application in production. Zero-downtime deployments with PM2 are only available cluster mode:

Here’s a sample PM2 configuration which you could save as `pm2.json` in your app:

```json
{
  "apps": [
    {
      "name": "my-supercharge-app",
      "script": "./server.js",
      "instances": 2,
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production",
        "PORT": 2019
      }
    }
  ]
}
```


## SSL
Ensure your application uses HTTPS in production. At this point, Supercharge will create a Node.js HTTP server and you can’t adjust the setup to bootstrap an HTTPS server.

You should deploy a reverse proxy (like nginx) to terminate Internet traffic and pass requests through to your application.

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
