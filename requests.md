# HTTP Requests


## Introduction
Supercharge uses the [hapi web framework](https://hapijs.com) as the core for routing and request handling. Hapi comes with a solid HTTP core and the handy feature of decorating the request object. Decorations allow you to add your own properties or functions on the `request` object.

Supercharge comes with dozens of request utilities provided by the [`hapi-request-utilities`](https://github.com/futurestudio/hapi-request-utilities) package. This package is available for everyone on GitHub and NPM. Feel free to install it in your app:

- [`hapi-request-utilities`](https://github.com/futurestudio/hapi-request-utilities)

Enjoy!


## Request Method and Path
You've access to an incoming HTTP `request` in all route handlers and request lifecycle methods, including request lifecycle extension points and pre-handlers. The following reviews the important parts of the `request` instance and how to retrieve specific data from it.


#### Retrieve the Request Method
The HTTP verb (method) of an incoming request is a property on the request instance:

```js
const method = request.method
```


#### Retrieve the Request Path
Use the `path` property to retrieve a request's path. For example, when requesting `https://superchargejs.com/docs/request`, the `path` returns `/docs/request`.

```js
const path = request.path
```


## Retrieve Request Input
Interacting with a request input allows you to access information like path and query parameters, payload, headers, cookies, authenticated credentials, and request or response types.


#### Retrieve All Request Data
Use the `all` method to retrieve an object of merged request properties from the request's `payload`, `path`, and `query` parameter data.

```js
const all = request.all()
// Example: { searchTerm: 'Super Charge', page: 3}
```

When merging the input from all three inputs, query parameters prioritize over path parameters and path parameters prioritize over payload.


#### Retrieve an Input Item
Retrieve a single input item identified by `key`. The request input is the request payload, path and query parameters. Internally, this method fetches the `key` from `request.all()`.

```js
const username = request.input('username')
```

You can also pass a default value as the second parameter:
```js
const username = request.input('username', 'default-value')
```


#### Retrive Multiple Input Items
Retrieve an object containing only the selected `keys` from the request payload, path and query parameters.

```js
const { username } = request.only('username')

// or an array
const { email, password } = request.only(['email', 'password'])
```

The inverse method to `request.only` is `request.except` returning an object containing all attributes from the request payload, path and query parameters **except** the given `keys`.

```js
const withoutToken = request.except('token')
// Example: { email: 'email@example.com', secret: 'psssst', password: 'super1' }

const withoutSecrets = request.except(['token', 'password', 'secret'])
// Example: { email: 'email@example.com' }
```


#### Determine If an Input Is Present
Use `has` to determine whether the request includes an input `key` or a list of `keys`.

```js
if (request.has('email')) {
    //
}

// or check an array
if (request.has(['username', 'email'])) {
    //
}
```

When checking an array of keys, the `has` method returns `true` if all of the keys are present.


To ensure a given key is present on the request and includes a non-empty value, use the `filled` method:

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


### Headers
All request headers are stored in the `headers` property.

```js
const headers = request.headers
```

You can request a single header by name using the `header` method:

```js
const accept = request.header('accept')
// Example: accept = 'application/json'
```

To determine whether a request header is present on the request, use the `hasHeader` method:

```js
const hasAccept = request.hasHeader('accept')
// false
```



### Cookies
A request's cookies are stored within a `state` property on the request instance:

```js
const cookies = request.state
```

For naming consistency and readability, you can also use the `cookies` method to retrieve all request cookies:

```js
const cookies = request.cookies()
// Example: { userId: 1, username: 'supercharge' }
```

Retrieve a selected request cookie by name using the `cookie` method:

```js
const userId = request.cookie('userId')
// Example: userId = 1
```

Determine whether a selected cookie is present on the request with the help of the `hasCookie` method:

```js
const hasUserId = request.hasCookie('userId')
```


### Authenticated Credentials
If your application supports a login and a user successfully authenticated against your application, you can retrieve the credentials of an authenticated via the `user` property:

```js
const credentials = request.user
// the same as request.auth.credentials
// Example: { id: 1, username: 'marcus' }
```

Remember that calling `request.user` before `onPostAuth` in the request lifecycle will result in an `undefined` value. Credentials are available as soon as the request is authenticated.

When authenticating users with the help of bearer tokens, you may retrieve an incoming bearer token from the `Authorization` request header using the `bearerToken` method. This method will strip the `Bearer ` prefix and only return the token value:

```js
const token = request.bearerToken()
// Example: token = eyJhbGciOiJIUzI…
```


### Request and Response Types
Determine whether the request has a `content-type` header includes `/json` or `+json`:

```js
const isJson = request.isJson()
// false
```

You may also check the incoming request for a specific response format. If you support HTML and JSON responses on individual routes, the `wantsJson` method is a helpful method. It indicates whether the response should be a JSON string. It checks the `accept` header to indicate JSON:

```js
const wantsJson = request.wantsJson()
// false
```

Supercharge provides a companion method `wantsHtml` indicating whether the response should be HTML. It checks the `accept` header to indicate HTML:

```js
const wantsHtml = request.wantsHtml()
// true
```

