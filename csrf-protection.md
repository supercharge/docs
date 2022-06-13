# CSRF Protection


## Overview
Supercharge has support for [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) (CSRF) protection. A cross-site request forgery is a malicious exploit where unauthorized commands are transmitted on behalf of an authenticated user.

Supercharge ships with CSRF protection out-of-the-box. It generates a “CSRF token” for active user sessions. To use CSRF protection, you must register the session [bootstrapper](/docs/{{version}}/bootstrappers).

Supercharge will verify the CSRF token for all request methods except `GET`, `HEAD`, `OPTIONS`.

Supercharge provides you a Handlebars helper to seamlessly add the CSRF token to your forms. Make use of the `{{csrf}}` helper inside your HTML forms. This helper generates and adds a hidden input field to your form. Use the helper like this:

```html
<form method="POST" action="/login">
  {{csrf}}

  …
</form>
```

Typically when submitting forms, you’ll use a `POST` request with requires the CSRF token to be present. If the form request doesn’t contain a CSRF token, requests will fail with an `403 Forbidden` error.

```info
Supercharge automatically disables CSRF protection when running tests.
```


## Exclude Routes from CSRF Protection
At some point, you may want to exclude URIs from CSRF protection. Common use cases are external platforms calling your application via webhooks.

For example, if you’re integrating payment processing via [Stripe](https://stripe.com) or [Braintree](https://www.braintreegateway.com/) you may wish to disable CSRF protection for the related routes. Neither of the platforms will have a valid CSRF token to send along with the request. In these situations, you typically have another form of integrety check for incoming requests.

You may exclude individual routes from CSRF verification by adding them to the `exclude` property in the `verify-csrf-token` middleware:

```js
'use strict'

const Middleware = require('@supercharge/framework/http/middleware/verify-csrf-token')

class VerifyCsrfToken extends Middleware {
  /**
   * Returns an array of URIs that should
   * be excluded from CSRF verfication.
   *
   * @returns {Array}
   */
  get exclude() {
    return [
      '/braintree/*',
      '/my/secret/endpoint
    ]
  }
}

module.exports = VerifyCsrfToken
```


## X-CSRF-Token for Restful Routes
Supercharge appends an encrypted `XSRF-Token` cookie to responses. This cookie contains the CSRF token. HTTP libraries like [Axios](https://github.com/axios/axios) automatically pick up this cookie and append it to requests.

Appending the `XSRF-Token` cookie to requests is helpful when using client-side frameworks in combination with Axios. You can then send authenticated requests from the client-side with an existing cookie.


### Manually Appending the CSRF-Token
If you want to manually grab the CSRF-Token and append it to requests, you may grab it from an HTML meta tag:

```html
<meta name="csrf-token" content="{{csrfToken}}">
```

Then you may fetch the CSRF token from the HTML source:

```js
const token = document.head.querySelector('meta[name="csrf-token"]');
```

Use the `token` value in your HTTP library, like Axios, and append it as a request header:

```js
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
```
