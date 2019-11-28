# Streams


## Introduction
The native Node.js stream implementation is based on event emitters. It’s hard to manage the control flow in your application when using events. If you want to actively wait for a stream to finish, you must wrap it into a promise.

That’s where [`@supercharge/streams`](https://github.com/superchargejs/streams) comes handy. It wraps Node.js streams into promises to make them `async/await`-ready.

The package provides methods like

- `.map(callback)`
- `.filter(callback)`
- `.through(transformStream)`

to interact with the input data.


## Installation
The [`@supercharge/streams`](https://github.com/superchargejs/streams) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/streams
```

```success
You can use the streams package with every project even if it’s not build on Supercharge. Enjoy!
```

## Using Streams
Using the ...

```js
const Fs = require('fs')
const Stream = require('@supercharge/streams')

await Stream(
  Fs.createReadStream('./my-huge-list-of-users.csv')
).through((user) => {

}).into()
```


## Error Handling
The native Node.js streams use event emitters and this comes with separate channels for data and errors. The `@supercharge/streams` package transforms the event-based streams into promise-based streams. Promises have a single channel for data and errors.

You must actively catch errors if you don’t want them to bubble up in your appplication:

```js
try {
  await Stream(input)
    .map(() => throw new Error('sh*t happens'))
    .into(output)
} catch (error) {
  // handle error
}
```

Errors will be thrown as soon as they appear. The stream will stop and clean up without processing the remaining data.


## API

#### `Stream(input)` constructor
Creates a new stream wrapping the given `input` into a read stream if the `input` is not a stream already

```js
const Stream = require('@supercharge/streams')

const stream = Stream([1, 2, 3]).asStream()
```


#### `.asStream()`
Returns the created stream or stream pipeline as a stream instance:

```js
const stream = Stream([1, 2, 3]).asStream()
```


#### `.inObjectMode()`
Tells the underlying stream pipeline to operate in object mode:

```js
const stream = Stream([1, 2, 3])
  .inObjectMode()
  .asStream()
```


#### `.through(transformStream)`
Pipes the stream through the given `transformStream` instance

```js
const { Transform } = require('stream')

const stream = Stream([1, 2, 3])
  .inObjectMode()
  .through(new Transform({
    objectMode: true,

    transform (chunk, __, next) {
      return next(null, chunk)
    }
  }))
  .asStream()

// the transform stream passed to .through() will forward the items without modifications -> [1, 2, 3]
```


#### `.into(output)`
Returns a promise and starts the streaming pipeline. Pipes the streaming results into the given `output` stream.

```js
await Stream([1, 2, 3])
  .inObjectMode()
  .into(
    Fs.createWriteStream('./example-output-file.csv')
  )
```


#### `.map(async callback)`
Runs the given async `callback` on each item that is piped through the stream. A transform stream will be created under the hood to run the callback function.

```js
const emails = [
  'email@superchargejs.com',
  'another.email@superchargejs.com'
]

await Stream(emails)
  .inObjectMode()
  .map(async email => {
    const user = await User.findOne({ email })

    return user
      ? user
      : User.create({ email, password: 'random-password' })
  })
  .into(
    Fs.createWriteStream('./users-in-database.csv')
  )
```


#### `.filter(callback)`
Filters all items that are piped through the stream satisfying the given async `callback` function. A transform stream will be created under the hood to run the callback function.

```js
const emails = [
  'email@superchargejs.com',
  'another.email@superchargejs.com'
]

await Stream(emails)
  .inObjectMode()
  .filter(async email => {
    return User.findOne({ email })
  })
  .into(
    Fs.createWriteStream('./existing-users-in-the-database.csv')
  )
```
