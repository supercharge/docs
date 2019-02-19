# Request Utilities


## Introduction
Supercharge uses the [hapi web framework](https://hapijs.com) as the core for routing and request handling. Hapi comes with the handy feature of decorating the request object. Decorations allow you to add your own properties or functions on the `request` object.

Supercharge’s request utilities are available for everyone on GitHub and NPM. It’s publicly available as open source and you can freely install it in your app:

- [`hapi-request-utilities`](https://github.com/futurestudio/hapi-request-utilities)

Enjoy!


## Decorations
Here’s the list of available `request` decorations. The decrations are available whenever you’ve access to the request object (typically in lifecycle methods: route handlers, extension points, and so on).


#### `request.all()`
Returns an object of merged request payload, path and query parameter data.

If a key is present in all three inputs, query parameters prioritize over path parameters and payload.

```js
const all = request.all()
```


#### `request.only(keys)`
Returns an object containing only the selected `keys` from the request payload, path and query parameters.

```js
const credentials = request.only(['email', 'password'])
// or
const { email, password } = request.only(['email', 'password'])

// works with a single key
const username = request.only('username')
```


#### `request.except(keys)`
Returns an object containing all attributes from the request payload, path and query parameters except the given `keys`.

```js
const noSecrets = request.except(['token', 'password', 'secret'])

// alternative with single key
const noToken = request.except('token')
```


#### `request.bearerToken()`
Returns the bearer token from the `Authorization` request header. This method will strip the `Bearer ` prefix and only return the token value.

```js
const token = request.bearerToken()
```


#### `request.header(name)`
Returns the selected request header by name.

```js
const accept = request.header('accept')
```


#### `request.hasHeader(name)`
Returns a boolean value indicating whether the selected header is present on the request.

```js
const hasAccept = request.hasHeader('accept')
```


#### `request.isJson()`
Returns a boolean value indicating whether the request has a `content-type` header that indicates JSON.

```js
const isJson = request.isJson()
```


#### `request.wantsJson()`
Returns a boolean value indicating whether the response should be a JSON string. It checks the `accept` header to indicate JSON.

```js
const wantsJson = request.wantsJson()
```


#### `request.wantsHtml()`
Returns a boolean value indicating whether the response should be HTML. It checks the `accept` header to indicate HTML.

```js
const wantsHtml = request.wantsHtml()
```


#### `request.cookie(name)`
Returns the selected request cookie by name.

```js
const userId = request.cookie('userId')
```


#### `request.cookies()`
Returns all request cookies.

```js
const cookies = request.cookies()
```


#### `request.hasCookie(name)`
Returns a boolean value indicating whether the selected cookie is present on the request.

```js
const hasUserId = request.hasCookie('userId')
```


## Contribute
Did we miss a helpful decoration? Please send in a [pull request](https://github.com/futurestudio/hapi-request-utilities).
