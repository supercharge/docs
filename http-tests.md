# HTTP Tests


## Introduction
Supercharge’s `base-test` utility provides a convenient interface to inject HTTP requests to your application. Each injected request returns a response object for further evaluation. Injecting HTTP requests is a great way to run integration tests in your application.

The following code snippet outlines a basic HTTP test:

```js
const BaseTest = util('base-test')

class LoginTest extends BaseTest {
  /**
   * Basic HTTP test example.
   */
  async getUsers (t) {
    const response = await this.get('/users')

    t.is(response.statusCode, 200)
  }
}
```

Calling `get(<url>)` injects a `GET` request to the given URL. The `response` is an actual response object from the framework that you can inspect and run assertions on.

```info
The CSRF middleware is automatically disabled when running HTTP tests through Supercharge’s base test utility.

If you’re composing your tests without the `base-test` utility, make sure to exclude the CSRF middleware when injecting requests into the application.
```


## Inject Requests
The HTTP testing example above shows an injected `GET` request.  Supercharge supports the `get`, `post`, `put`, `patch`, and `delete` methods to inject requests that match the HTTP verb.

Calling either of the methods must be the last method in the request building process. Compose a request by using the fluent API to customize request headers, payload, cookies, server middleware, and the authenticated user.


## Inject Request Headers
Customize a request’s headers using the `withHeader(name, value)` or the `withHeaders(object)` methods before injecting it to the application:

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withHeader (t) {
    const withHeader = await
      this.withHeader('x-api-token', 'token')
          .get('/users')

    t.is(withHeader.statusCode, 200)

    // or

    const withHeaders = await
      this.withHeaders({
             'x-api-token': 'token',
             'content-type': 'application/json'
           })
          .get('/users')

    t.is(withHeaders.statusCode, 200)
  }
}
```


## Inject Request Payload
Inject a request payload along the testing request using the `withPayload(object)` method:

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withPayload (t) {
    const response = await
      this
        .withPayload({
          'username': 'marcus',
          'password': 'secret'
        })
        .post('/signup')

    t.is(response.statusCode, 201)
  }
}
```


## Inject Request Cookies
Inject cookies with a request using the `withCookie(name, value)` method:

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withCookie (t) {
    const response = await
      this.withCookie('name', 'Marcus')
          .get('/profile')

    t.is(response.statusCode, 200)
  }
}
```

At this point, Supercharge does not offer you to pass in an object with key-value-pairs. Chain the `withCookie` method if you want to inject two or more cookies.


## Authenticated Requests
Inject authenticated requests if you want to test routes that require authentication using the `actAs(user)` method:

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async authenticateAsUser (t) {
    const user = await this.fakeUser()

    const response = await
      this.actAs(user)
          .get('/me')  // this route requires authentication

    t.is(response.statusCode, 200)
  }
}
```

Acting as a user will bypass the route’s authentication strategies and assign the given `user` as the authenticated credentials.


## Customize Middleware
Supercharge automatically disables the middleware that verifies CSRF token during testing. You can disable any other middleware located in the `app/http/middleware` folder using the `withoutMiddleware(name)` method:

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withoutMiddleware (t) {
    const response = await
      this.withoutMiddleware('verify-csrf-token')
          .get('/profile')

    t.is(response.statusCode, 200)
  }
}
```

A middleware is identified by its file or folder name in `app/http/middleware`. For example, you may disable a “check for maintenance mode” middleware located in `app/http/middleware/maintenance` via `this.withoutMiddlware('maintenance')`.

