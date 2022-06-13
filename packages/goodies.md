# Goodies


## Overview
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
import { tap } from '@supercharge/goodies'
```


## Available Methods
Here’s a list of available methods in the collections package:

<style>
#method-list>p {
    column-count: 2;
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-gap: 2rem;
    -moz-column-gap: 2rem;
    -webkit-column-gap: 2rem;
}

#method-list a {
    display: block;
}
</style>

<div id="method-list" markdown="1">

[esmRequire](#esmrequire)
[esmResolve](#esmresolve)
[ifNullish](#ifnullish)
[isAsyncFunction](#isasyncfunction)
[isFunction](#isfunction)
[isNullish](#isnullish)
[isNotNullish](#isnotnullish)
[isPromise](#ispromise)
[tap](#tap)
[upon](#upon)

</div>


## Methods


#### esmRequire
The `esmRequire` method `require`’s a given file `path` and returns the resolved ESM default exports or CommonJS exports. It uses [esmResolve](#esmresolve) to resolve the exports from the given file:

```js
const Path = require('path')
const { esmResolve } = require('@supercharge/goodies')

// cjs-file.js
module.exports = { name: 'Supercharge' }
const required = esmRequire('./cjs-file')
// { name: 'Supercharge' }

// esm-file.js
export default { name: 'Supercharge' }
const required = esmRequire('./esm-file')
// { name: 'Supercharge' }
```


#### esmResolve
The `esmResolve` method returns the resolved ESM default exports or CommonJS (module) exports:

```js
const { esmResolve } = require('@supercharge/goodies')

esmResolve({ name: 'Supercharge' }))
// { name: 'Supercharge' }

esmResolve({ default: { name: 'Supercharge' } }))
// { name: 'Supercharge' }
```


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

isAsyncFunction(async () => {})
isAsyncFunction(async function () {})
// true

isAsyncFunction(() => {})
// false
```


#### isFunction
The `isFunction` method determines whether the given parameter is a function:

```js
const { isFunction } = require('@supercharge/goodies')

isFunction(() => {})
isFunction(function () {})
isAsyncFunction(async () => {})
// true

isFunction(123)
// false
```


#### isNullish
The `isNullish` method determines whether a given input is `null` or `undefined`:

```js
const { isNullish } = require('@supercharge/goodies')

isNullish()
isNullish(null)
isNullish(undefined)
// true

isNullish(0)
isNullish('')
isNullish('any-other-value')
// false
```


#### isNotNullish
The `isNotNullish` method determines whether a given input **is not** `null` or `undefined`:

```js
const { isNotNullish } = require('@supercharge/goodies')

isNotNullish(0)
isNotNullish('')
isNotNullish('any-other-value')
// true

isNotNullish()
isNotNullish(null)
isNotNullish(undefined)
// false

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
