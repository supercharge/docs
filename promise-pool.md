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

The code describes the following: at first, create a new promise pool instance which then allows you to chain the `.for()`, `.withConcurrency()`, and `.process()` methods. The `.process()` method is an async function starting the actual processing. Be sure to call this as the last item in the chain.

The return values for the promise pool is an object containing two properties: `results` and `errors`


## Error Handling
The promise pool won’t throw when running into an error while processing an item. It saves the error to be inspected later. You’ve access to the item causing the error using `error.item`.


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

const { results, errors } = await pool.process(async (user) => {
  await User.createIfNotExisting(user)
})
```
