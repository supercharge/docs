# Request Utilities


## Introduction
Supercharge uses the [hapi web framework](https://hapijs.com) as the core for routing and request handling. Hapi comes with the handy feature of decorating the request object. Decorations allow you to add your own properties or functions on the `request` object.

Supercharge’s request utilities are available for everyone on GitHub and NPM. It’s publicly available as open source and you can freely install it in your app:

- [`hapi-request-utilities`](https://github.com/futurestudio/hapi-request-utilities)

Enjoy!


## Decorations
Here’s the list of available `request` decorations. The decrations are available whenever you’ve access to the request object (typically in lifecycle methods: route handlers, extension points, and so on).


#### `request.user`
Returns the authenticated credentials.

Remember that calling `request.user` before `onPostAuth` in the request lifecycle will result in an `undefined` value. Credentials are available as soon as the request is authenticated.

```js
const credentials = request.user
// shortcut for request.auth.credentials
// Example: { id: 1 }
```


#### `request.all()`
Returns an object of merged request `payload`, `path` and `query` parameter data.

```js
const all = request.all()
// Example: { searchTerm: 'Super Charge', page: 3}
```

When merging the input from all three inputs, query parameters prioritize over path parameters and path parameters prioritize over payload.


#### `request.input(key)`
Returns the value identified by `key` from the request’s input. The request input is the request payload, path and query parameters.

```js
const username = request.input('username')
```


#### `request.only(keys)`
Returns an object containing only the selected `keys` from the request payload, path and query parameters.

```js
const { username } = request.only('username')

// or an array
const { email, password } = request.only(['email', 'password'])
```


#### `request.except(keys)`
Returns an object containing all attributes from the request payload, path and query parameters except the given `keys`.

```js
const noToken = request.except('token')
// Example: { email: 'email@example.com', secret: 'psssst', password: 'super1' }

const noSecrets = request.except(['token', 'password', 'secret'])
// Example: { email: 'email@example.com' }
```


#### `request.bearerToken()`
Returns the bearer token from the `Authorization` request header. This method will strip the `Bearer ` prefix and only return the token value.

```js
const token = request.bearerToken()
// Example: token = eyJhbGciOiJIUzI…
```


#### `request.header(name)`
Returns the selected request header by name.

```js
const accept = request.header('accept')
// Example: accept = 'application/json'
```


#### `request.hasHeader(name)`
Returns a `boolean` value indicating whether the selected header is present on the request.

```js
const hasAccept = request.hasHeader('accept')
```


#### `request.isJson()`
Returns a `boolean` value indicating whether the request has a `content-type` header includes `/json` or `+json`.

```js
const isJson = request.isJson()
```


#### `request.wantsJson()`
Returns a `boolean` value indicating whether the response should be a JSON string. It checks the `accept` header to indicate JSON.

```js
const wantsJson = request.wantsJson()
```


#### `request.wantsHtml()`
Returns a `boolean` value indicating whether the response should be HTML. It checks the `accept` header to indicate HTML.

```js
const wantsHtml = request.wantsHtml()
```


#### `request.cookie(name)`
Returns the selected request cookie by name.

```js
const userId = request.cookie('userId')
// Example: userId = 1
```


#### `request.cookies()`
Returns all request cookies.

```js
const cookies = request.cookies()
// Example: { userId: 1, username: 'supercharge' }
```


#### `request.hasCookie(name)`
Returns a `boolean` value indicating whether the selected cookie is present on the request.

```js
const hasUserId = request.hasCookie('userId')
```


#### `request.has(keys)`
Returns a `boolean` value indicating whether the request includes the given input `keys`.

```js
if (request.has('email')) {
    //
}

// or check an array
if (request.has(['username', 'email'])) {
    //
}
```

When checking an array of keys, the `has` method will return true if all of the keys are present.


#### `request.filled(keys)`
Returns a `boolean` value indicating whether the request includes a non-empty value for the input `keys`.

```js
if (request.filled('email')) {
    //
}

// or check an array
if (request.filled(['username', 'email'])) {
    //
}
```

You can check an array of keys and `filled` will return true if all of the keys have non-empty values.



## Contribute
Did we miss a helpful decoration? Please send in a [pull request](https://github.com/futurestudio/hapi-request-utilities).
