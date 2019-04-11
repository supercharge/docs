# Upgrade Guide
Tba.


## New Features

- [Class-based Middleware](#class-based-middleware)

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
