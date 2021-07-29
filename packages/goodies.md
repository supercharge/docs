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

[ifNullish](#ifnullish)
[isAsyncFunction](#isasyncfunction)
[isPromise](#ispromise)
[tap](#tap)
[upon](#upon)

</div>


## Methods


#### ifNullish
The `ifNullish` method invokes a callback if the given `predicate` is `null` or `undefined`. It returns the result of the callback:

```js
const { ifNullish } = require('@supercharge/goodies')

const subscribedUser = ifNullish(await User.findById(1), async () => {
    const user = await User.createBy({ email })

    return user.subscribeToNewsletter()
})
```


#### isAsyncFunction
The `isAsyncFunction` method determines whether the given parameter is an async function:

```js
const { isAsyncFunction } = require('@supercharge/goodies')

async function subscribe() { … }

isAsyncFunction(subscribe)
// true
```


#### isPromise
The `isPromise` method determines whether the given parameter is a promise:

```js
const { isPromise } = require('@supercharge/goodies')

async function subscribe() { … }

isPromise(subscribe())
// true

isPromise(new Promise(() => {}))
// true

isPromise('promise')
// false
```


#### tap
The `tap` method invokes a callback passing the given value as an argument to the callback and returns the value. It accepts two arguments, a `value` and a `callback`:

`tap` has the following signature:

```js
async tap(value, async callback)
```

Using tap allows you to run a side-effect on the value and return the value:

```js
const { tap } = require('@supercharge/goodies')

const user = await tap(User.findBy({ email }), async (user) => {
    await user.subscribeToNewsletter()
})

// user = the found user for `email`
```

#### upon
The `upon` method invokes a callback passing the given value as an argument to the callback. It accepts two arguments, a `value` and a `callback`. Returns the result of the callback:

`upon` has the following signature:

```js
async upon(value, async callback)
```

Using upon allows you to change the return value using a closure function:

```js
const { upon } = require('@supercharge/goodies')

const email = await upon(User.findBy({ email }), async (user) => {
    return user.email
})

// email = the found user's email address
```
