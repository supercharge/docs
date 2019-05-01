# Authentication


## Introduction
Supercharge ships with pre-built authentication that you can use almost instantly. Add authentication to your application using Supercharge’s Craft CLI.

```info
**The fastest way adding authentication** to your application is using the Craft CLI. Run `node craft make:auth` in your fresh Supercharge application.

This scaffolds the necessary routes, route handlers, user model, authentication strategy, and web views. Restart your Supercharge server and visit `http://localhost:3000` to see all changes in effect!
```

Have a look at the authentication configuration located at `config/auth.js`. This file contains the documented authentication options which you can tweak to adjust the authentication handling.

Supercharge uses [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie) to provide cookie-based authentication. The login route handler authenticates a user and creates a session. At this point, only authenticated users can have a session.

Authenticating users in Supercharge is built on “strategies”. An authentication strategy validates whether a request is authenticated or not. Imagine an authentication strategy as a middleware that authenticates a request (if possible/required).

Scaffolding the authentication with `node craft make:auth` creates the user model file `app/models/user.js`. The user model is a [Mongoose model](/docs/{{version}}/mongodb-preset#mongoose-orm). This predefined model is configured so that you can support authentication without additional configuration. If you want to change something, please go ahead and adjust the model.


## Authentication
Supercharge ships with an authentication system that is initially not part of your application. In your application, you can scaffold everything related to authentication using:

```bash
node craft make:auth
```

Supercharge won’t override any existing files when running the Craft command. You’ll be asked to confirm to override the files which you can deny and skip individual files from being overriden.

Running the authentication scaffolding in your Supercharge app creates files for sign-up, login, and logout:

- routes
- route handlers
- authentication strategy
- web views
- user model


### Authentication Strategies
The `strategy` key describes the authentication strategy used on all routes. The value must be a valid authentication strategy. Supercharge will automatically load all authentication strategies from your `app/auth/strategies` directory.

Running the `make:auth` command creates a new strategy called `session`.


### Authentication Modes
The `mode` defines how authentication is handled for each request. Supercharge supports the three authentication modes:

1. `required`: authentication is required
2. `optional`: the request must include valid credentials or no credentials at all
3. `try`: trying to authenticate every incoming request, but if the credentials are invalid, the request proceeds regardless


### Routes
Running `node craft make:auth` creates authentication routes in your application. All scaffolded route files will be placed in the `app/routes/auth` directory.

Feel free to update any of the created route handlers to your needs.

Notice that the files use the user model imported from `app/models/user.js`. When changing the user model, make sure that the login still works as expected.


### Views
Running `node craft make:auth` creates HTML views in your application. All scaffolded web view files will be placed in the `resources/views/auth` directory.

You can change any of the Handlebars files. Adjust any file to your needs. Supercharge will load the view files from your application and serve them on the related routes.


### Authenticating Users
Having the routes, views, and model included in your application, you can start signing up new users. Start your server and visit the application's URI in your browser. You'll notice new links for login and sign up in the navigation.

Ensure you're having an accessible MongoDB instance. Supercharge autoloads your models and as soon as it finds a file in your `app/models` directory, it'll try to connect to the database. You may use the [Hercules](/docs/{{version}}/hercules) virtual machine providing all the required developer tools.


#### Redirects
When a user successfully signs up or logs in to your application, they will be redirected to the `/home` URI. This is the default configuration defined in your `config/auth.js`. Adjust the values if you want different redirects post-authentication:

```js
redirects: {
  login: Env.get('AUTH_REDIRECT_LOGIN', '/profile'),
}
```

If you don't want to change the values in the configuration file, you can inject the redirect URI from [environment variables](/docs/{{version}}/configuration).


### Retrieve the Authenticated User
For authenticated requests, you may access the credentials via the `request` object.

You can access the user in all [request lifecycle methods (middlewares)](/docs/{{version}}/middleware) after the request is authenticated (`onPostAuth`).

```js
module.exports = {
  method: 'GET',
  path: '/profile',
  options: {
    handler: (request, h) => {
      const user = request.user()

      // or destructure the properties of interest
      const { id, email } = request.user()

      return user
    }
  }
}
```


#### Is the Current User Authenticated
Determine whether the current request is authenticated either by checking

- if `request.user()` has the user’s credentials or
- if `request.auth.isAuthenticated` is `true`

```js
handler: (request, h) => {
  if (request.user()) {
    // user is logged in
  }

  // or

  if (request.auth.isAuthenticated) {
    // user is logged in
  }
}
```

The return value of `request.auth.isAuthenticated` is always a boolean. With `request.user()`, you’ll receive an object with credentials if the user is authenticated, `undefined` otherwise.


## Require Authentication on Routes
The default authentication configuration in `config/auth.js` tries to authenticate a user, but will proceed the request if authentication fails.

You certainly want routes to be only accessible by authenticated users and therefore require authentication. You can either configure authentication globally in `config/auth.js` or on individual routes.

You'll find the following default authentication settings in your `config/auth.js`:

```js
default: {
  strategy: 'session',
  mode: 'try'
}
```

You can use this type of configuration object on routes as well using [route-level authentication](#route-level-authentication).


### Authentication for all Routes
You can define a default authentication handling in your `config/auth.js`. Customize the `default` property to your prefered setting, like required authentication for all routes:

```js
default: {
  strategy: 'session',
  mode: 'required'
}
```


### Route-level Authentication
You can override the default authentication settings on each of your routes. Define authentication for individual routes using the `options.auth` property:

```js
module.exports = {
  method: 'GET',
  path: '/profile',
  options: {
    auth: {
      strategy: 'jwt',
      mode: 'required'
    },
    handler: (_, h) => h.view('user/profile')
  }
}
```

This setting requires a JWT authentication strategy for the `GET /profile` route. You must ensure that an authentication strategy called `jwt` is present in your sever.

When using route-level authentication, you can rely on the default configuration and skip the keys in your custom settings.

For example, imagine the default authentication settings have the following configuration:

```js
default: {
  strategy: 'session',
  mode: 'try'
}
```

You can then skip the `strategy` key in your route settings like this:

```js
module.exports = {
  method: 'GET',
  path: '/profile',
  options: {
    auth: {
      mode: 'required'
    },
    handler: (_, h) => h.view('user/profile')
  }
}
```

Supercharge will now use the default `session` strategy and mode `required` (instead of `try`).


### Throttle Logins
Supercharge doesn’t protect your login against brute-force attacks by default. We created a Redis-based rate limiter to prevent such attacks.

At this point, you need to manually [add rate-limiting to your application](/docs/{{version}}/rate-limiting) and protect the login route.
