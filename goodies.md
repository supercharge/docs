# Goodies


## Introduction
The [`@supercharge/goodies`](https://github.com/supercharge/goodies) package provides a handful of useful helper functions for Node.js and JavaScript, like an async `tap` function.


## Installation
The [`@supercharge/goodies`](https://github.com/supercharge/goodies) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/goodies
```

```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```

## Using Goodie Methods
The `@supercharge/goodies` package exports a handful methods that you can reach for when using `require()`:

```js
const { tap } = require('@supercharge/goodies')

// or

const Goodies = require('@supercharge/goodies')

Goodies.tap(…)
```


## Available Methods
Here’s a list of available methods in the collections package:

<style>
    #method-list > p {
        column-count: 2; -moz-column-count: 2; -webkit-column-count: 2;
        column-gap: 2rem; -moz-column-gap: 2rem; -webkit-column-gap: 2rem;
    }

    #method-list a {
        display: block;
    }
</style>

<div id="method-list" markdown="1">

[tap](#tap)

</div>


## Methods


#### tap
The `tap` method invokes a callback passing the given value as an argument to the callback and returns the value. It accepts two arguments, a `value` and a `callback`:

`tap` has the following signature:

```js
async tap(value, async callback)
```

Using tap allows you to run a side-effect on the value and return the value:

```js
const { tap } = require('@supercharge/goodies')

const user = await tap(await User.findBy({ email }), async (user) => {
    await user.subscribeToNewsletter()
})

// user = the found user for `email`
```
