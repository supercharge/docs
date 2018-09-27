# HTTP Tests
Boost provides a convenient testing utility that makes it


## Introduction
Text

```js
const BaseTest = util('base-test')

class LoginTest extends BaseTest {
  /**
   * Basic HTTP test example.
   */
  async showsLoginPage (t) {
    const response = await this.get('/login')

    t.is(response.statusCode, 200)
  }
}
```

Text

```info
The CSRF middleware is automatically disabled when running HTTP tests through Boost’s base test utility.
```

If you’re composing your tests without the `base-test` utility, make sure to exclude the CSRF middleware.


## Inject Requests
Text


### GET Requests
Text


### POST Requests
Text


### PUT Requests
Text


### DELETE Requests
Text


### PATCH Requests
Text



## Customize the Request
Text


### Create a Session/Authenticate a User
Text

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async authenticateAsUser (t) {
    const user = await this.fakeUser()

    const response = await this.actAs(user).get('/login')

    t.is(response.statusCode, 200)
  }
}
```

Text


### Customize Headers
Text

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withHeader (t) {
    const response = await this.header('x-api-token', 'token').get('/login')

    t.is(response.statusCode, 200)
  }
}
```

Text

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withHeaders (t) {
    const response = await this.headers({
        'x-api-token': 'token',
        'content-type': 'application/json'
      })
      .get('/login')

    t.is(response.statusCode, 200)
  }
}
```

Text


### Customize Cookies
Text


```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withCookie (t) {
    const response = await this.cookie('name', 'Marcus').get('/login')

    t.is(response.statusCode, 200)
  }
}
```

Text


### Customize Middleware
Text

```js
const BaseTest = util('base-test')

class BasicTest extends BaseTest {
  async withoutMiddleware (t) {
    const response = await this.withoutMiddleware('verify-csrf-token').get('/login')

    t.is(response.statusCode, 200)
  }
}
```

Text

