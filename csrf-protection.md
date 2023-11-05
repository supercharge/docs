# CSRF Protection


## Overview
Supercharge has support for [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) (CSRF) protection. A cross-site request forgery is a malicious exploit where unauthorized commands are transmitted on behalf of an authenticated user.

The Supercharge project boilerplate ships with CSRF protection out-of-the-box. It generates a “CSRF token” for active user sessions. The HTTP kernel registeres the related CSRF middleware by default.

Supercharge will verify the CSRF token for all request methods except `GET`, `HEAD`, and `OPTIONS`.

Typically when submitting forms, you’ll use a `POST` request that requires the CSRF token to be present. If the form request doesn’t contain a CSRF token, requests will fail with a `403 Forbidden` error.


## Exclude Routes from CSRF Protection
At some point, you may want to exclude URIs from CSRF protection. Common use cases are external platforms calling your application via webhooks.

For example, if you’re integrating payment processing via [Stripe](https://stripe.com) or [Braintree](https://www.braintreegateway.com/) you may wish to disable CSRF protection for the related routes. Neither of the platforms will have a valid CSRF token to send along with the request. In these situations, you typically have another form of integrety check for incoming requests.

You may exclude individual routes from CSRF verification by adding the URI to the `exclude` array in the `VerifyCsrfToken` middleware. You find this middleware in the file located at `app/http/middleware/verify-csrf-token.ts`:

```ts
import { VerifyCsrfTokenMiddleware } from '@supercharge/session'

export class VerifyCsrfToken extends VerifyCsrfTokenMiddleware {
  /**
   * Returns an array of URIs that should be excluded from CSRF verfication.
   * The URI parsing uses the `lukeed/matchit` package allowing the usage
   * of dynamic URLs with placeholders and glob-like star * notations.
   *
   * @see https://github.com/lukeed/matchit
   */
  override exclude (): string[] {
    return [
      '/stripe/*',
      '/braintree/*',
      '/my/secret/endpoint'
    ]
  }
}
```


## X-CSRF-Token for Restful Routes
Supercharge appends a `XSRF-Token` cookie to responses. This cookie contains the CSRF token. HTTP libraries like [Axios](https://github.com/axios/axios) automatically pick up this cookie and append it to requests.

Appending the `XSRF-Token` cookie to requests is helpful when using client-side frameworks in combination with Axios or other client-side HTTP tools. You can then send authenticated requests from the client-side with an existing cookie.


### Manually Appending the CSRF-Token
If you want to manually grab the CSRF-Token and append it to requests, you may grab it from an HTML meta tag in your layout:

```html
<meta name="csrf-token" content="{{csrfToken}}">
```

Then you may fetch the CSRF token from the HTML source:

```js
const token = document.head.querySelector('meta[name="csrf-token"]');
```

Use the `token` value in your HTTP requests, like Axios, and append it as a request header:

```js
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
```
