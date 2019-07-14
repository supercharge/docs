# Collections


## Introduction
Node.js is an event-driven platform, handling most of its processing asynchronously. The JavaScript Array class has no built-in support for asynchronous operations. That’s one reason working with arrays in Node.js can be cumbersome.

The [`@supercharge/collections`](https://github.com/superchargejs/collections) package fills this gap. This package provides a fluent interface for working with JavaScript arrays. Create a new collection instance based on an array and run the items through a pipeline of operations.

The following example takes an array of IDs and fetches the related users from the database to filter them based on a user’s name:

```js
await Collect([ 1, 2, 3, 4, 5 ])
  .map(async id => {
    return User.findById(id)
  })
  .filter(user => user.name === 'supercharge')
  .all()

// result: [{
//   id: 1,
//   name: 'supercharge',
//   description: 'Powerful Node.js framework — not just a web-framework'
// }]
```

You can chain methods for fluent processing, like mapping and filtering of the underlying array. Typically, the collection methods are immutable and return a new collection instance without changing the original input array.


## Installation
The `@supercharge/collections` package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/collections
```

You can use this collections package with every project even if it’s not build on Supercharge. Enjoy!


## Creating Collection
Creating a collection is as simple as importing the `@supercharge/collections` package and passing an array to the imported function:

```js
const Collect = require('@supercharge/collections')

const collection = Collect([ 'Supercharge', 'Collection' ])
```


## Available Methods
Here’s a list of available methods in the collections package:

<style>
    #collection-method-list > p {
        column-count: 2; -moz-column-count: 2; -webkit-column-count: 2;
        column-gap: 2rem; -moz-column-gap: 2rem; -webkit-column-gap: 2rem;
    }

    #collection-method-list a {
        display: block;
    }
</style>

<div id="collection-method-list" markdown="1">

[all](#all)
[collapse](#collapse)
[compact](#compact)
[every](#every)
[filter](#filter)
[find](#find)
[flatMap](#flatmap)
[forEach](#foreach)
[forEachSeries](#foreachseries)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[map](#map)
[mapSeries](#mapseries)
[reduce](#reduce)
[reduceRight](#reduceright)
[reject](#reject)
[size](#size)
[some](#some)

</div>


## Methods


#### all
The `all` method returns the collections underlying array:

```js
await Collect([1, 2, 3])
  .all()

// [1, 2, 3]
```

Some of the methods (like `map`, `filter`, `collapse`, or `compact`) return the collection instance allowing you to chain additional methods to this pipeline.

To retrieve the results of these operations, you must explicitly end your collection pipeline with `.all()`.


#### collapse
The `collapse` method collapses a collection of arrays into a single, flat collection.

```js
await Collect([[1], [{}, 'Marcus', true], [22]])
  .collapse()
  .all()

// [1, {}, 'Marcus', true, 22]
```


#### compact
The `compact` method removes all falsy values from the collection. For example, falsy values are `null`, `undefined`, `''`, `false`, `0`, `NaN`.

```js
await Collect([0, null, undefined, 1, false, 2, '', 3, NaN])
  .collapse()
  .all()

// [1, 2, 3]
```


#### every
The `every` method determines whether all items in the collection satisfy the testing function:

```js
await Collect([1, 2, 3])
  .every(item => item > 2)

// false
```

The `every` method supports async callbacks:

```js
await Collect([1, 2, 3])
  .every(async id => {
    const user = await User.findById(id)

    return !!user
  })

// true
```


#### filter
The `filter` method keeps all items in the collection satisfying the (async) testing function:

```js
await Collect([1, 2, 3])
  .filter(async id => {
    const user = await User.findById(id)

    return user.scope === 'admin'
  })
  .all()

// [ 1 ]
```

See the [`reject`](#reject) method for the inverse of `filter`.


#### find
The `find` method returns the first item in the collection that satisfies the (async) testing function, `undefined` otherwise:

```js
const usernames = ['marcus', 'norman', 'christian']

await Collect(usernames)
  .find(async name => {
    // check if a user with the given `name` exists
    const user = await User.findByName(name)

    return !!user
  })

// 'marcus'
```

Hint: the `!!` operator converts any data type to boolean by using a “doubled negation”. If the value of `user` is `undefined`, it will return `false`, otherwise `true`.


#### flatMap
The `flatMap` method invokes the (async) callback on each collection item. The callback can modify and return the item resulting in a new collection of modified items. Ultimately, `flatMap` flattens the mapped results:

```js
await Collect([1, 2, 3])
  .flatMap(async item => {
    return [item, item]
  })
  .all()

// [1, 1, 2, 2, 3, 3]
```


#### forEach
The `forEach` method invokes the (async) callback on each collection item. This method has no return value.

```js
await Collect(await queue.getActive())
  .forEach(async job => {
    await job.finished()
  })
```


#### forEachSeries
The `forEachSeries` method invokes the (async) callback on each collection item **in sequence**. This method has no return value.

```js
const files = [
  { tenantId: 1, name: '01-this-must-be-the-first-file.txt' },
  { tenantId: 1, name: '02-this-must-go-second.txt' }
]

await Collect(files)
  .forEachSeries(async ({ tenantId, name }) => {
    await Fs.writeFile(`./files/${tenantId}/${name}`)
  })
```


#### isEmpty
The `isEmpty` method returns `true` when the collection is empty, otherwise `false`:

```js
await Collect([]).isEmpty()

// true
```


#### isNotEmpty
The `isNotEmpty` method returns `true` when the collection is not empty, otherwise `false`:

```js
await Collect([]).isNotEmpty()

// false
```


#### map
The `map` method invokes the (async) callback on each collection item and returns an array of transformed items. Because `map` return a collection instance, you could chain further operations. You must explicitly start processing by calling `.all()`:

```js
await Collect([1, 2, 3])
  .map(async item => {
    return item * 10
  })
  .all()

// [ 10, 20, 30 ]
```

```info
`map` invokes all transformations in parallel. If you want to run them in sequence, use [`mapSeries`](#mapseries).
```


#### mapSeries
The `mapSeries` method is like `map` running the given (async) callback on each collection item **in sequence**:

```js
const logfiles = [
  '2019-07-15.log',
  '2019-07-16.log',
  '2019-07-17.log'
]

await Collect(logfiles)
  .mapSeries(async file => {
    return { file, content: await Fs.readFile(file) }
  })
  .all()

// [ { file: '2019-07-15.log', content: '…' }, … ]
```

Consider the `mapSeries` method to ensure sequential processing of your items. The processing keeps the item order as present in the collection.

The example of reading the content of log files is a good candidate for sequential processing because it minimizes the disk load. Imagine the load on your file system when reading all log files in parallel (using `map`).

```info
`mapSeries` invokes all transformations in sequence. If you want to run them in parallel, use [`map`](#map).
```


#### reduce
The `reduce` method invokes a(n async) reducer function on each array item, passing the result of each iteration to the subsequent iteration. The result is a reduced collection to a single value:

```js
await Collect([1, 2, 3])
  .reduce(async (carry, item) => {
    return carry + item
  }, 0)

// 6
```

The `reduce` method takes the initial value as a second argument. In the code snippet above, the initial value is `0`. Using `5` as the initial value returns a different result:

```js
await Collect([1, 2, 3])
  .reduce((carry, item) => {
    return carry + item
  }, 5)

// 11
```


#### reduceRight
The `reduceRight` method is similar to `reduce`, reducing a collection to a single value. It invokes a(n async) reducer function on each array item **from right-to-left**, passing the result of each iteration to the subsequent iteration:

```js
await Collect([1, 2, 3])
  .reduceRight(async (carry, item) => {
    return carry.concat(item)
  }, [])

// [3, 2, 1]
```

The `reduceRight` method takes the initial value as a second argument.


#### reject
The `reject` method removes all items from the collection satisfying the (async) testing function:

```js
await Collect([1, 2, 3, 4, 5])
  .reject(async item => {
    return item % 2 === 1 // true when odd
  })
  .all()

// [2, 4]
```

See the [`filter`](#filter) method for the inverse of `reject`.


#### size
The `size` method returns the number of items in the collection:

```js
await Collect([1, 2, 3]).size()

// 3
```


#### some
The `some` method determines whether at least one item from the collection satisfies the testing function:

```js
await Collect([1, 2, 3])
  .some(item => {
    return item > 10
  })

// false
```

Notice that you have to `await` the result of `some()`, because it also supports async functions:

```js
await Collect([
  'https://superchargejs.com',
  'https://futurestud.io'
]).some(async uri => {
  // imagine `fetch` as a function sending a request to `uri`
  const { status } = await fetch(uri)

  return status === 200
})

// true
```
