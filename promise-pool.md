# Promise Pool


## Introduction
Text

```js
const PromisePool = require('@supercharge/promise-pool')

const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

const { results, errors } = await new PromisePool()
  .for(users)
  .withConcurrency(2)
  .process(async data => {
    const user = await User.createIfNotExisting(data)

    return user
  })
```

Text


## Installation
The `@supercharge/promise-pool` package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/promise-pool
```

You can use the promise pool package with every project even if it’s not build on Supercharge. Enjoy!


## Using a Promise Pool
Using the promise pool is pretty straightforward. The pacakge exposes a class and you can create a promise pool instance using the fluent interface. Here’s a working example:

```js
const PromisePool = require('@supercharge/promise-pool')

const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

const { results, errors } = await new PromisePool()
  .for(users)
  .withConcurrency(2)
  .process(async data => {
    const user = await User.createIfNotExisting(data)

    return user
  })
```


## API

#### `new PromisePool({ concurrency?, items? })` constructor
Creates a new promise pool. The constructor takes an optional `options` object allowing you to passing in the `concurrency` and `items`.

```js
const pool = new PromisePool({ concurrency: 2, items: [1, 2, 3] })
```


#### `.withConcurrency(amount)`
Set the maximum number of functions to process in parallel. Default `concurrency: 10`. Returns the promise pool instance.

```js
const pool = new PromisePool().withConcurrency(5)
```


#### `.for(items)`
Set the items to be processed in the promise pool. Returns the promise pool instance.

```js
const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

const pool = new PromisePool().withConcurrency(5).for(users)
```


#### `.process(callback)`
Starts processing the promise pool by iterating over the items and passing each item to the async mapper function. Returns an object containing the results and errors.

```js
const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

const pool = new PromisePool().withConcurrency(5).for(users)

await pool.process(async (user) => {
  await User.createIfNotExisting(user)
})
```

Text

```js
const {result, errors } = await pool.process(async (user) => {
  await User.createIfNotExisting(user)
})
```

