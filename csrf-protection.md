# CSRF Protection


## Introduction
Supercharge has support for [cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) (CSRF) protection. A Cross-site request forgery is a type of malicious exploit where unauthorized commands are transmitted on behalf of an authenticated user.

Supercharge ships with CSRF protection out-of-the-box. It generates a “CSRF token” for active user sessions. Supercharge will verify the CSRF token for `POST`, `PUT`, `PATCH`, and `DELETE` requests to your application.

Supercharge provides you a Handlerbars helper to seamlessly add the CSRF token to your forms. Make use of the `{{csrf}}` helper inside your forms. This helper generates and adds a hidden input field to your form. Use the helper like this:

```html
<form method="POST" action="/login">
  {{csrf}}

  …
</form>
```

Supercharge verfies the CSRF token in a middleware. The CSRF middleware will check incoming requests if they apply to CSRF validation based on the HTTP method. In case the HTTP method matches `POST`, `PUT`, `PATCH`, or `DELETE`, the CSRF token must be present. If it doesn’t contain a token, requests will fail with an `403 Forbidden` error.

```info
Supercharge automatically disables the CSRF when running tests.
```
