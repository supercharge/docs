# Sttp


## Introduction
The [`@supercharge/sttp`](https://github.com/supercharge/sttp) package is an elegant wrapper around the [`axios`](https://github.com/axios/axios) HTTP client. Sttp provides a fluent interface allowing you to create HTTP requests communicating with other web applications.


## Installation
The [`@supercharge/sttp`](https://github.com/supercharge/sttp) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/sttp
```


```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```


## CommonJS, ESM, and TypeScript Support
Sttp supports both module loaders, CommonJS and ESM, and also TypeScript. Import Sttp in your projects like this:

```js
// ESM and TypeScript
import { Sttp } from '@supercharge/sttp'

// CommonJS
const { Sttp } = require('@supercharge/sttp')
```


## Sending Requests
To send requests you may use the `get`, `post`, `put`, `patch`, `delete`, or `option` methods provided by Sttp. First, here’s an example how to send a basic GET request:

```js
import { Sttp } from '@supercharge/sttp'

const response = await Sttp.get('https://your-api.com/v2/users')
```

You may send a POST request with query parameters, request headers, and payload like this:

```js
import { Sttp } from '@supercharge/sttp'

const response = await Sttp
  .withQueryParams({ page: 3 })
  .withHeaders({ 'X-API-Token': 123 })
  .withPayload({ name: 'Supercharge' })
  .post('/your-api-url')
```


### Request Methods
Sttp provides the following HTTP methods:

```js
const response = await Sttp.get(url, queryParams)
const response = await Sttp.post(url, payload)
const response = await Sttp.put(url, payload)
const response = await Sttp.patch(url, payload)
const response = await Sttp.delete(url, queryParams)
const response = await Sttp.options(url, queryParams)
```


### Request Data
It’s common to send data with your requests when making requests. For example, you may attach query parameters to a `GET` request or a payload to a `POST` request.


#### Sending Request Payloads
You may send request data along with your `POST`, `PUT`, or `PATCH` requests using the `withPayload` method:

```js
const response = await Sttp
  .withPayload({
    name: 'Supercharge',
    role: 'admin'
  })
  .post('https://your-api.com/v2/users')
```

You can also pass the request data as the second parameter to the `Sttp.post` method:

```js
const response = await Sttp.post('https://your-api.com/v2/users', {
    name: 'Supercharge',
    role: 'admin'
  })
```

By default, Sttp sends your data using the `application/json` content type.

**Notice:** request data passed as the second parameter to `Sttp.post(url, data)` overrides any previously added data using the `withPayload` method.


#### Sending Query Parameters
You may send request input as query parameters in your `GET`, `DELETE`, or `OPTIONS` requests. You can do that by manually appending a query string directly to the request URL. Another option is to pass an object of key-value pairs to the fluent `withQueryParams` method:

```js
const response = await Sttp
  .withQueryParams({
    name: 'Supercharge',
    page: 1
  })
  .get('https://your-api.com/v2/users')
```

You can also send query parameters with your requests by passing them as the second parameter to the `Sttp.get` (or `patch`/`delete`) method:

```js
const response = await Sttp.get('https://your-api.com/v2/users', {
    name: 'Supercharge',
    page: 1
  })
```

**Notice:** Sttp merges the query parameters assigned using `withQueryParams` and passed as a second parameter to the `Sttp.get` methods.


#### Sending Form Requests
You should call the `asFormParams` method if you want to send request data using the `application/x-www-form-urlencoded` content type. Sttp automatically encodes the request data and sets the content type for you:

```js
const response = await Sttp
  .asFormParams()
  .post('https://your-api.com/v2/users', {
    name: 'Supercharge'
  })
```


### Request Headers
You can attach request headers using the `withHeaders` method. This method accepts an object of key-value pairs:

```js
const response = await Sttp
  .withHeaders({
    'X-Header-1': 'foo',
    'X-Custom-2': 'bar'
  })
  .post('https://your-api.com/v2/users', {
    name: 'Supercharge'
  })
```

Use the fluent `accept` method to set the `Accept` header defining the expected response content type of your request:

```js
const response = await Sttp
  .accept('application/json')
  .get('https://your-api.com/v2/users')
```

You may also use the descriptive and convenient `acceptJson` method defining that you expect the `application/json` content type in response to your request:

```js
const response = await Sttp.acceptJson().get('https://your-api.com/v2/users')
```


### Responses
Outgoing requests from Sttp return an instance of `SttpResponse`. The Sttp response instance provides methods to interact with the response attributes or inspect the response itself:

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
You can create a reusable Sttp instance using the parameterless `Sttp.create()` method:

```js
const instance = Sttp.create()
```

You may use the fluent Sttp interface to assign default values to that instance:

```js
const instance = Sttp.create()
  .withBaseUrl('https://your-api.com/v2/')
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
Unlike axios’s default behavior of throwing errors on respones with HTTP level `400` or `500`, Sttp always returns a response instance. You can still determine the type of a response using the `isSuccess`, `isRedirect`, `isError` methods:

```js
// determine if the response status code is >= 200 and < 300
response.isSuccess();

// determine if the response status code is >= 300 and < 400
response.isRedirect();

// determine if the response status code is >= 400
response.isError();
```

Use the `isClientError` or `isServerError` methods if you want to determine the response’s error type.

```js
// determine if the response status code is >= 400 and < 500
response.isClientError();

// determine if the response status code is >= 500
response.isServerError();
```


## Assigning Axios Options
Sttp is an [axios](https://github.com/axios/axios) wrapper and you may assign axios options using the `Sttp.withOptions(options)` method to configure axios options:

```js
const instance = Sttp.withOptions({
  baseURL: 'https://your-api.com/v2/'
})
```

