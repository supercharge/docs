# Upgrade Guide
Tba.


## New Features

- [Class-based Middleware](#class-based-middleware)
- [New Handlebars helpers](#new-handlebars-helpers)
    - [`csrfToken`](#-code-csrftoken-code-)

## Upgrading from `1.0-beta0` to `1.0-beta1`
Text


### Updating Dependencies
Update the `@supercharge/framework` dependency in your `package.json` file to `1.0-beta1`.


### Class-based Middleware
Text

```js
class Middleware {
    constructor(server) {
        this.server
    }

    onRequest(request, h) {
        // your middleware functionality

        return h.continue
    }
}

module.exports = Middleware
```


### New Handlebars Helpers
Supercharge 1.0-beta1 includes a handful of new Handlebars helpers.


#### `csrfToken`
The new `csrfToken` helper returns the raw CSRF token value. This is useful single-page applications when using an HTTP library that includes the CSRF tokens to restful requests.

```html
<meta name="csrf-token" content="{{csrfToken}}">
```