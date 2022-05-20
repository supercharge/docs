# Promise Pool


## Introduction
The [@supercharge/promise-pool](https://github.com/superchargejs/promise-pool) package allows you to run a number of promises in batches. The promise pool ensures a maximum number of concurrently processed tasks.

Each task in the promise pool is individual from others, meaning that the pool starts processing the next task as soon as one finishes. This handling ensures the best batch-processing for your tasks.


## Installation
The [@supercharge/promise-pool](https://github.com/superchargejs/promise-pool) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/promise-pool
```

```success
`@supercharge/promise-pool` is a standalone package and — of course — you can use it in all your projects.
```


## CommonJS, ESM, and TypeScript Support
The `@supercharge/promise-pool` package supports both module loaders, CommonJS and ESM, and also TypeScript. Import the `PromisePool` class in your projects like this:

```js
// ESM and TypeScript
import { PromisePool } from '@supercharge/promise-pool'

// CommonJS
const { PromisePool } = require('@supercharge/promise-pool')
```

We’re using ESM imports in the upcoming examples. They’re interchangeable with CommonJS imports.


## Using a Promise Pool
The package exports a `PromisePool` class. This class provides a fluent interface to create a promise pool instance. Create an instance using the static `for` method that accepts the list of items you want to process.

Here’s a working example on how to use the `PromisePool` class:

```js
import { PromisePool } from '@supercharge/promise-pool'

const { results, errors } = await PromisePool
  .for([1, 2, 3])
  .process(async num => {
    return num * 2
  })
// results: [2, 4, 6]
// errors: []
```

This example outlines the creation and processing of a promise pool for a list of numbers.

The return value for the promise pool is an object containing two properties: `results` and `errors`. The `resuls` property is a list of returned values from the `process` function. The `errors` property contains all errors thrown while running the processing callback. Find more details about errors in the [error handling section](#error-handling).


### Customize the Concurrency
You can configure the maximum number of tasks being processed in parallel using the `withConcurrency` method:

```js
const pool = PromisePool
  .for(users)
  .withConcurrency(100)
```

The default concurrency is `10`.


### Start Processing
The `process` method should be the last call in your method chain because it starts the promise pool processing. The `process` method accepts an async callback (function) defining the processing for each item:

```js
const users = [
  { name: 'Marcus' },
  { name: 'Norman' },
  { name: 'Christian' }
]

await PromisePool
  .for(users)
  .withConcurrency(2)
  .process(async user => {
    await User.createIfNotExisting(user)
  })
```

Depending in your use case it can be helpful to know the index of the currently processed item or you need to manually stop the pool. We’re passing three arguments to the callback function provided to `process`: the `item`, `index`, and `pool` instance:

```js
await PromisePool
  .for(users)
  .process(async (user, index, pool) => {
    // …
  })
```


### Run Callbacks when a Task Starts
You may use the `onTaskStarted` method to run a callback function as soon as an item in the promise pool started processing. The callback function receives two arguments:

1. the `item` for which the pool finished a task
2. the `pool` instance allowing you to retrieve statistics

Here’s an `onTaskStarted` usage example:

```js
const pool = PromisePool
  .for(users)
  .onTaskStarted((user, pool) => {
    // retrieve the number of currently active tasks in the pool
    pool.activeTaskCount()

    // retrieve the percentage of processed tasks in the pool
    pool.processedPercentage()
  })
```

You can add multiple callbacks by chaining the `onTaskStarted` calls. This allows you to separate the concerns of each function when you’re doing different things:

```js
const pool = PromisePool
  .for(users)
  .onTaskStarted((user, pool) => {
    // update the progress bar with the processed using `pool.processedPercentage()`
  })
  .onTaskStarted((user, pool) => {
    // log the amount of currently processed items using pool.activeTaskCount()
  })
```

```info
**Notice:** the `onTaskStarted` callbacks don’t support async functions.
```


### Run Callbacks when a Task Finished
You may use the `onTaskFinished` method to run a callback function as soon as an item in the pool finished processing. The callback function receives two arguments:

1. the `item` for which the pool finished a task
2. the `pool` instance allowing you to retrieve statistics

Here’s an `onTaskFinished` usage example:

```js
const pool = PromisePool
  .for(users)
  .onTaskFinished((user, pool) => {
    // retrieve the number of currently active tasks in the pool
    pool.activeTaskCount()

    // retrieve the percentage of processed tasks in the pool
    pool.processedPercentage()
  })
```

You can add multiple callbacks by chaining the `onTaskFinished` calls. This allows you to separate the concerns of each function when you’re doing different things:

```js
const pool = PromisePool
  .for(users)
  .onTaskFinished((user, pool) => {
    // update the progress bar with the processed using `pool.processedPercentage()`
  })
  .onTaskFinished((user, pool) => {
    // log the amount of currently processed items using pool.activeTaskCount()
  })
```

```info
**Notice:** the `onTaskFinished` callbacks don’t support async functions.
```


## Error Handling
The promise pool won’t throw errors while processing the items. It collects all errors and returns them after processing all items. You may then inspect the errors and handle them individually.


### Access the Failed Item
The returned `errors` property contains a list of occured errors while processing the pool. Each error contains the related item causing this error. You may access that item via `error.item`:


```js
const { errors } = await PromisePool
  .for(users)
  .process(async (user, index, pool) => {
    // …
  })

errors.forEach(error => {
  // `error.item` contains the field causing this error
})
```


### Manually Handle Errors
You can attach a custom error handler to your promise pool. Use the `handleError` method and provide an async callback function that runs on each error.

**Notice**: when providing a custom error handler, you’re taking over the error handling. The default “collect all errors” handler doesn’t apply anymore. You must collect or handle errors yourself:


```js
import { PromisePool } from '@supercharge/promise-pool'

const errors = []

const { results } = await PromisePool
  .for(users)
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
import { PromisePool } from '@supercharge/promise-pool'

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


## Manually Stop the Pool
You can stop the processing of a promise pool using the `pool` instance provided to the `.process()` and `.handleError()` methods.

Here’s an example on how to stop an active promise pool from within the `.process()` method:

```js
await PromisePool
  .for(users)
  .process(async (user, index, pool) => {
    if (index > 100) {
      return pool.stop()
    }

    // processes the `user` data
  })
```

You may also stop the pool from within the `.handleError()` method in case you need to:

```js
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
