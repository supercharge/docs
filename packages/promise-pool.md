# Promise Pool


## Introduction
Running an asynchronous function on a list of items in Node.js can be done in different ways: in sequence, in parallel, or in batches. The [`@supercharge/promise-pool`](https://github.com/superchargejs/promise-pool) package solves the problems of running a number of async operations in batches. It also ensures processing the maximum number of functions concurrently.

Imagine this example: you’re importing a list of 500 email addresses to your application and you want to create a user if it doesn’t exist. To reduce performance issues and database bottlenecks, you’re using a promise pool with a concurrency of 5. The concurrency describes how many items will be processed **at most** parallely.

Each task in the promise pool is individual from the others, meaning that the pool starts processing the next task as soon as one finishes. This way it tries to ensure the parallel processing using the defined concurrency.


## Installation
The [`@supercharge/promise-pool`](https://github.com/superchargejs/promise-pool) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/promise-pool
```

You can use the promise pool package with every project even if it’s not build on Supercharge. Enjoy!


## Using a Promise Pool
Using the promise pool is pretty straightforward. The pacakge exposes a class and you can create a promise pool instance using the fluent interface. Here’s a working example:

```js
import { PromisePool } from '@supercharge/promise-pool'
// or
const { PromisePool } = require('@supercharge/promise-pool')

const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

const { results, errors } = await PromisePool
  .for(users)
  .withConcurrency(2)
  .process(async data => {
    const user = await User.createIfNotExisting(data)

    return user
  })
```

The code describes the following: at first, create a new promise pool instance which then allows you to chain the `.for()`, `.withConcurrency()`, and `.process()` methods. The `.process()` method is an async function starting the actual processing. Be sure to call `.process()` as the last method in the chain.

The return values for the promise pool is an object containing two properties: `results` and `errors`


## Error Handling
The promise pool won’t throw when running into an error while processing an item. It saves the error to be inspected later. You’ve access to the item causing the error using `error.item`.


## API

#### `new PromisePool({ concurrency?, items? })` constructor
Creates a new promise pool. The constructor takes an optional `options` object allowing you to passing in the `concurrency` and `items`.

```js
const pool = new PromisePool({ concurrency: 2, items: [1, 2, 3] })
```


#### static `.withConcurrency(amount)`
Set the maximum number of functions to process in parallel. Default `concurrency: 10`. Returns the promise pool instance.

```js
const pool = PromisePool.withConcurrency(5)
```


#### static `.for(items)`
Set the items to be processed in the promise pool. Returns the promise pool instance.

```js
const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

const pool = PromisePool.for(users)
```


#### `.process(async (item, index, pool) => {})`
Starts processing the promise pool by iterating over the items and passing each item to the async mapper function. Returns an object containing the results and errors.

```js

const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

const pool = PromisePool.withConcurrency(5).for(users)

const { results, errors } = await pool.process(async (user, index, pool) => {
  await User.createIfNotExisting(user)
})
```

#### `.handleError(async (item, index, pool) => {})`
The promise pool allows you to provide a custom error handler. You can take over the error handling by providing a custom handler to the `.handleError(handler)` method.

> **Notice**: if you provide an error handler, the promise pool doesn’t collect any errors. You must then collect errors yourself.

Providing a custom error handler allows you to exit the promise pool early by throwing inside the error handler function. Throwing errors is in line with Node.js error handling using async/await.

```js
const { PromisePool } = require('@supercharge/promise-pool')

const errors = []

const { results } = await PromisePool
  .for(users)
  .withConcurrency(4)
  .handleError(async (error, user) => {
      // you must collect errors yourself
    if (error instanceof ValidationError) {
      return errors.push(error)
    }

    // Process error handling on specific errors
    if (error instanceof ThrottleError) {
      return await retryUser(user)
    }
  })
  .process(async data => {
    // the harder you work for something,
    // the greater you’ll feel when you achieve it
  })

await handleCollected(errors) // this may throw

return { results }
```

Providing a custom error handler allows you to exit the promise pool early by throwing inside the error handler function. Throwing errors is in line with Node.js error handling using async/await.

```js
const { PromisePool } = require('@supercharge/promise-pool')

try {
  const errors = []

  const { results } = await PromisePool
    .for(users)
    .withConcurrency(4)
    .handleError(async (error, user) => {
      // throwing errors will stop PromisePool and you must catch them yourself
      throw error
    })
    .process(async data => {})

  await handleCollected(errors) // this may throw

  return { results }
} catch (error) {
  await thisIsYourOwnErrorHandlerForThrown(error)
}
```


### Manually Stop the Pool
You can stop the processing of a promise pool using the `pool` instance provided to the `.process()` and `.handleError()` methods. Here’s an example how you can stop an active promise pool from within the `.process()` method:

```js
await PromisePool
  .for(users)
  .process(async (user, index, pool) => {
    if (condition) {
      return pool.stop()
    }

    // processes the `user` data
  })
```

You may also stop the pool from within the `.handleError()` method in case you need to:

```js
const { PromisePool } = require('@supercharge/promise-pool')

await PromisePool
  .for(users)
  .handleError(async (error, user, pool) => {
    if (error instanceof SomethingBadHappenedError) {
      return pool.stop()
    }

    // handle the given `error`
  })
  .process(async (user, index, pool) => {
    // processes the `user` data
  })
```
