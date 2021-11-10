# Sttp


## Introduction
The [`@supercharge/sttp`](https://github.com/supercharge/sttp) package provides TBA.


## Installation
The [`@supercharge/sttp`](https://github.com/supercharge/sttp) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/sttp
```

```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```

Using `@supercharge/sttp` is pretty straightforward.

Sttp provides a fluent interface allowing you to compose your request with chainable methods.


### Requests
You may send a POST request with query parameters, request headers, and payload like this:

```js
const { Sttp } = require('@supercharge/sttp')

const response = await Sttp
  .withQueryParams({ page: 3 })
  .withHeaders({ 'X-API-Token': 123 })
  .withPayload({ name: 'Supercharge' })
  .post('/your-api-url')
```


### Request Methods
Sttp provides methods for the following HTTP methods

- `Sttp.get(url, queryParams)`
- `Sttp.post(url, payload)`
- `Sttp.put(url, payload)`
- `Sttp.patch(url, payload)`
- `Sttp.delete(url, queryParams)`
- `Sttp.options(url, queryParams)`


### Sending Form-URL-Encoded Requests

`Sttp.asFormParams()`
`application/x-www-form-urlencoded`

```js
const instance = await Sttp
  .asFormParams()
  .post('https://your-api.com/v2/users', {
    name: 'Supercharge
  })
```


### Responses
Sttp comes with a response wrapper giving you access to response attributes:

```js
const response = await Sttp
  .withPayload({ name: 'Supercharge' })
  .post('/api/users')

response.status(): number
// 201

response.payload(): any
// { id: 1, name: 'Supercharge' }

response.headers(): object
// { 'content-type': 'application/json' }

response.isSuccess(): boolean
// true

response.isRedirect(): boolean
// false

response.isError(): boolean
// false

response.isClientError(): boolean
// false

response.isServerError(): boolean
// false
```


## Creating an Sttp Instance
You can create an Sttp instance using the parameterless `Sttp.create()` method:

```js
const instance = Sttp.create()
```

You may use the fluent Sttp interface to assign default values to that instance:

```js
const instance = Sttp.create()
  .withHeaders({
    'X-Custom-Header': 'value'
  })
  .withTimeoutInSeconds(2)
```


## Authentication
You may assign basic authentication credentials using the `Sttp.withBasicAuth(username, password)` method:

```js
const instance = await Sttp
  .withBasicAuth('marcus', 'secret')
  .post(…)
```


### Bearer Tokens
You can also assign a bearer token or any kind of token to the `Authorization` header using the `Sttp.withToken(token, type?)` method.

Sttp automatically adds the `Bearer ` prefix when using the `withToken` method:

```js
const instance = await Sttp
  .withToken('your-bearer-token')
  .post(…)
```

If you want to use a different token prefix than “Bearer” you may pass it the second parameter:

```js
const instance = await Sttp
  .withToken('your-bearer-token', 'X-Bearer')
  .post(…)
```


## Timeouts
Use the `timeout` method to specify a maximum number of milliseconds to wait for a response:

```js
const instance = await Sttp
  .timeout(2000)
  .post(…)
```

Sttp provides a `withTimeoutInSeconds` method that converts the given number of seconds to milliseconds. It’s a convenience method to work with smaller numbers and be precise about the unit:

```js
const instance = await Sttp
  .withTimeoutInSeconds(2)
  .post(…)
```


## Error Handling
Unlike axios’s default behavior of throwing errors on client or server errors (HTTP `400` and `500` level responses), Sttp always returns a response instance. You can still determine the type of a response using the `isSuccess`, `isRedirect`, `isError` methods:

```js
// Determine if the status code is >= 200 and < 300
response.isSuccess();

// Determine if the status code is >= 300 and < 400
response.isRedirect();

// Determine if the status code is >= 400
response.isError();
response.failed();
```

In case of errors you may also determine the response’s error type using the `isClientError` or `isServerError` methods:

```js
// Determine if the status code is >= 400 and < 500
response.isClientError();

// Determine if the response status code is >= 500
response.isServerError();
```


## Assigning Axios Options
Sttp is an [axios](https://github.com/axios/axios) wrapper and you may assign axios options using the `Sttp.withOptions(options)` method to configure axios options:

```js
const instance = Sttp.withOptions({
  baseURL: 'https://your-api.com/v2/'
})
```

