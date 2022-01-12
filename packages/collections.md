# Collections


## Introduction
Node.js is an event-driven platform, handling most of its processing asynchronously. The JavaScript Array class has no built-in support for asynchronous operations. That’s one reason working with arrays in Node.js can be cumbersome.

The [`@supercharge/collections`](https://github.com/supercharge/collections) package fills this gap. This package provides a fluent interface for working with JavaScript arrays. Create a new collection instance based on an array and run the items through a pipeline of operations.

The following example takes an array of IDs and fetches the related users from the database to filter them based on a user’s name:

```js
import { Collect } from '@supercharge/collections'

await Collect([ 1, 2, 3, 4, 5 ])
  .map(async id => {
    return User.findById(id)
  })
  .filter(user => {
    return user.name === 'supercharge'
  })

// result: [{
//   id: 1,
//   name: 'supercharge',
//   description: 'Full-stack Node.js framework — not just a web-framework'
// }]
```

You can chain methods for fluent processing, like mapping and filtering of the underlying array. Typically, the collection methods are immutable and return a new collection instance without changing the original input array.


## Installation
The `@supercharge/collections` package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/collections
```

You can use this collections package with every project even if it’s not build on Supercharge. Enjoy!


## CommonJS, ESM, and TypeScript Support
The collections package supports both module loaders: CommonJS and ESM, and also TypeScript. Import `@supercharge/collections` in your projects like this:

```js
// ESM and TypeScript
import { Collect } from '@supercharge/collections'

// CommonJS
const { Collect } = require('@supercharge/collections')
```


## Fully Async
All methods provided by `@supercharge/collections` (like `map`, `filter`, `reduce`, …) are async. You **must** await their result, even though you’re not passing an async callback function:

```js
const mapped = Collect([1, 2, 3]).map(num => {
  return num * 2
  })

console.log(mapped)
// Promise<Collection { values: 1, 2, 3, callChain: [method: 'map', handler: [function]] }>

console.log(await mapped)
// [2, 4, 6]
```


## Creating Collections
Creating a collection is as simple as importing the `@supercharge/collections` package and passing an array to the imported function:

```js
const { Collect } = require('@supercharge/collections')

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
[any](#any)
[avg](#avg)
[chunk](#chunk)
[clone](#clone)
[collapse](#collapse)
[compact](#compact)
[concat](#concat)
[count](#count)
[diff](#diff)
[every](#every)
[filter](#filter)
[filterIf](#filterif)
[find](#find)
[first](#first)
[flatMap](#flatmap)
[flatten](#flatten)
[forEach](#foreach)
[groupBy](#groupby)
[has](#has)
[hasDuplicates](#hasDuplicates)
[intersect](#intersect)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[join](#join)
[last](#last)
[map](#map)
[max](#max)
[median](#median)
[min](#min)
[pluck](#pluck)
[pop](#pop)
[push](#push)
[reduce](#reduce)
[reduceRight](#reduceright)
[reject](#reject)
[reverse](#reverse)
[shift](#shift)
[size](#size)
[slice](#slice)
[splice](#splice)
[some](#some)
[sort](#sort)
[sum](#sum)
[take](#take)
[takeAndRemove](#takeandremove)
[toJSON](#tojson)
[union](#union)
[unique](#unique)
[uniqueBy](#uniqueby)
[unshift](#unshift)

</div>


## Methods


#### all
- *added in version `1.0`*

The `all` method returns the collections underlying array:

```js
await Collect([1, 2, 3]).all()

// [1, 2, 3]
```

Staring in version `2.0`, you can also `await` a collection to resolve and return the array. This works because the collections package implements a `.then` function which is called by Node.js as soon as you await the collection.

```js
await Collect([1, 2, 3])

// [1, 2, 3]
```


#### any
- *added in version `1.12`*

The `any` method determines whether at least one item from the collection satisfies the async testing function. It’s an alias for [some](#some):

```js
await Collect([1, 2, 3]).any(item => {
  return item > 10
})

// false
```


#### avg
- *added in version `1.6`*

The `avg` method returns the average of all collection items:

```js
await Collect([1, 2, 3, 4]).avg()

// 2,5
```


#### chunk
- *added in version `1.2`*

The `chunk` method splits the collection into multiple, smaller collections of a given size:

```js
await Collect([1, 2, 3, 4, 5, 6, 7, 8]).chunk(3)

// [[1, 2, 3], [4, 5, 6], [7, 8]]
```


#### clone
- *added in version `1.5`*

The `clone` method creates a shallow copy of a collection. It keeps the current state of a collection. If you already chained some collection methods, those are also copied over to the clone:

```js
const original = Collect([1, 2, 3])
const clone = original.clone()

const identical = original === clone
// false
```


#### collapse
- *added in version `1.0`*

The `collapse` method collapses a collection of arrays one level deep into a single, flat collection.

```js
await Collect([[1], [{}, 'Marcus', true], [22]]).collapse()

// [1, {}, 'Marcus', true, 22]
```


#### compact
- *added in version `1.0`*

The `compact` method removes all falsy values from the collection. For example, falsy values are `null`, `undefined`, `''`, `false`, `0`, `NaN`.

```js
await Collect([0, null, undefined, 1, false, 2, '', 3, NaN]).compact()

// [1, 2, 3]
```


#### concat
- *added in version `1.3`*

The `concat` method merges two or more collections. It returns a new collection with the concatenated items without changing the original collection:

```js
const collection = Collect([1, 2, 3])
const concat = collection.concat([4, 5])

await concat

// [1, 2, 3, 4, 5]

await collection

// [1, 2, 3]
```


#### count
- *added in version `2.1`*

The `count` method counts all items in the collection satisfying the async testing function. Count behaves like `.size()` when not providing a callback function.

```js
await Collect([1, 2, 3]).count()

// 3

await Collect([1, 2, 3, 4]).count(async num => {
  return num > 3
})

// 1
```


#### diff
- *added in version `1.6`*

The `diff` method removes all values from the `collection` that are present in the given `array`.

```js
await Collect([1, 2, 3]).diff([2, 3, 4, 5])

// [1]
```


#### every
- *added in version `1.0`*

The `every` method determines whether all items in the collection satisfy the testing function:

```js
await Collect([1, 2, 3]).every(item => item > 2)

// false
```

The `every` method supports async callbacks:

```js
await Collect([1, 2, 3]).every(async id => {
  const user = await User.findById(id)

  return !!user
})

// true
```


#### filter
- *added in version `1.0`*

The `filter` method keeps all items in the collection satisfying the async testing function:

```js
await Collect([1, 2, 3]).filter(async id => {
  const user = await User.findById(id)

  return user.scope === 'admin'
})

// [ 1 ]
```

See the [`reject`](#reject) method for the inverse of `filter`.

- **Notice:** `filterSeries` became `filter` in version `2.0`


#### filterIf
- *added in version `2.2`*

The `filterIf` method keeps all items in the collection satisfying the async testing function if the given `condition` is `true`:

```js
await Collect([1, 2, 3]).filterIf(condition, async id => {
  const user = await User.findById(id)

  return user.scope === 'admin'
})

// [ 1 ]
```

The `filterIf` method returns returns all items (it doesn’t filter) if the given predicate is `false`.


#### find
- *added in version `1.0`*

The `find` method returns the first item in the collection that satisfies the async testing function, `undefined` otherwise:

```js
const usernames = ['marcus', 'norman', 'christian']

await Collect(usernames).find(async name => {
    // check if a user with the given `name` exists
    const user = await User.findByName(name)

    return !!user
  })

// 'marcus'
```

```info
The `!!` operator converts any data type to boolean by using a “doubled negation”. If the value of `user` is `undefined`, it will return `false`, otherwise `true`.
```

- **Notice:** `findSeries` became `find` in version `2.0`


#### first
- *added in version `1.5`*

The `first` method returns the first item in the collection. It won’t remove the item from the original collection:

```js
await Collect([ 1, 2, 3 ]).first()

// 1
```

You can also pass an async testing function as a parameter to the `first` method:

```js
await Collect([
  { id: 1, name: 'marcus' },
  { id: 3, name: 'marcus' }
]).first(async ({ name }) => {
  return User.findByName(name)
})

// { id: 1, name: 'marcus' }
```


#### flatMap
- *added in version `1.0`*

The `flatMap` method invokes the async callback on each collection item. The callback can modify and return the item resulting in a new collection of modified items. Ultimately, `flatMap` flattens the mapped results:

```js
await Collect([1, 2, 3]).flatMap(async item => {
  return [item, item]
})

// [1, 1, 2, 2, 3, 3]
```


#### flatten
- *added in version `2.3`*

The `flatten` method flattens the collection one level deep.

```js
await Collect([[1, [2]], [3], 22]).collapse()

// [1, [2], 3, 22]
```


#### forEach
- *added in version `1.0`*

The `forEach` method invokes the async callback on each collection item. This method has no return value.

```js
await Collect(await queue.getActive()).forEach(async job => {
    await job.finished()
  })
```


- **Notice:** `forEachSeries` became `forEach` in version `2.0`


#### groupBy
- *added in version `1.11`*

The `groupBy` method groups the items in the collection by a given `key` and returns an object of the grouped items:

```js
const products = [
  { name: 'Macbook', price: 2500 },
  { name: 'Macbook', price: 3000 },
  { name: 'iPhone', price: 1000 }
]

const grouped = await Collect(products).groupBy('name')

/*
{
  Macbook: [
    { name: 'Macbook', price: 2500 },
    { name: 'Macbook', price: 3000 }
  ],
  iPhone: [
    { name: 'iPhone', price: 1000 }
  ]
}
*/
```

```warning
At this point, you can’t group by a nested key. I appreciate your support if you want to send a pull request! Head over to the [Collections repo on GitHub](https://github.com/supercharge/collections) to submit a PR. Thank you!
```


#### has
- *added in version `1.5`*

The `has` method returns `true` when the collection an item satisfying the argument or a callback function, otherwise `false`:

```js
await Collect([1, 2, 3]).has(1)

// true
```

You can also use a callback function to iterate through the list of items:

```js
await Collect([1, 2, 3]).has(item => {
  return item === 10
})

// false

await Collect([
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Norman' },
  { id: 3, name: 'Christian' }
]).has(item => {
  return item.id === 1
})

// true
```


#### hasDuplicates
- *added in version `1.10`*

The `hasDuplicates` method returns `true` when the collection contains duplicate items, otherwise `false`:

```js
await Collect([1, 2, 3]).hasDuplicates()
// false

await Collect([1, 2, 3, 1]).hasDuplicates()
// true
```

```info
The `hasDuplicates` method doesn’t support a callback to identify unique items. I appreciate your support if you want to send a pull request adding callback support! Head over to the [Collections repo on GitHub](https://github.com/supercharge/collections) to submit a PR. Thank you!
```

#### intersect
- *added in version `1.6`*

The `intersect` method removes all values from the `collection` that are not present in the given `array`.

```js
await Collect([1, 2, 3]).intersect([2, 3, 4, 5])

// [2, 3]
```


#### isEmpty
- *added in version `1.1`*

The `isEmpty` method returns `true` when the collection is empty, otherwise `false`:

```js
await Collect([]).isEmpty()

// true
```


#### isNotEmpty
- *added in version `1.1`*

The `isNotEmpty` method returns `true` when the collection is not empty, otherwise `false`:

```js
await Collect([]).isNotEmpty()

// false
```


#### join
- *added in version `1.6`*

The `join` method joins all items in the collection using the given `str` and returns the resulting string value:

**Example**

```js
await Collect([10, 2, 3, 4]).join('-')

// '10-2-3-4'
```


#### last
- *added in version `1.8`*

The `last` method returns the last item in the collection, otherwise `undefined`. It won’t remove the item from the original collection:

```js
await Collect([ 1, 2, 3 ]).last()

// 3
```

You can also pass an async testing function as a parameter to the `last` method:

```js
await Collect([
  { id: 1, name: 'norman' },
  { id: 3, name: 'christian' }
  { id: 3, name: 'marcus' }
]).last(async ({ name }) => {
  return name === 'marcus'
})

// { id: 3, name: 'marcus' }
```


#### map
- *added in version `1.0`*

The `map` method invokes the async callback on each collection item and returns an array of transformed items. Because `map` returns a collection instance, you could chain further operations:

```js
await Collect([1, 2, 3]).map(async item => {
  return item * 10
})

// [ 10, 20, 30 ]
```

- **Notice:** `mapSeries` became `map` in version `2.0`


#### max
- *added in version `1.6`*

The `max` method returns the max value in the collection:

```js
await Collect([1, 20, 3, 4]).max()

// 20
```


#### median
- *added in version `1.7`*

The `median` method returns the [median](https://en.wikipedia.org/wiki/Median) value of the collection:

```js
await Collect([4, 1, 37, 2, 1]).median()

// 2

await Collect([1, 2, 3, 4, 5, 6]).median()

// 3.5
```


#### min
- *added in version `1.6`*

The `min` method returns the min value in the collection:

```js
await Collect([10, 2, 3, 4]).min()

// 2
```


#### pluck
- *added in version `1.12`*

The `pluck` method retrieves all values from the collection for a given `key`:

```js
const users = [
  { id: 1, name: 'Marcus', email: 'marcus@domain.com' },
  { id: 2, name: 'Supercharge', email: 'supercharge@domain.com' }
]

const grouped = await Collect(users).pluck('name')

// [ 'Marcus', 'Supercharge' ]
```

You can also pluck multiple keys by passing an array to the `pluck` method. The returned array will then contain objects with the related keys and values:

```js
const users = [
  { id: 1, name: 'Marcus', email: 'marcus@domain.com' },
  { id: 2, name: 'Supercharge', email: 'supercharge@domain.com' }
]

const grouped = await Collect(users).pluck(['name', 'email'])

/*
[
  { name: 'Marcus', email: 'marcus@domain.com' },
  { name: 'Supercharge', email: 'supercharge@domain.com' }
]
*/
```

```warning
At this point, you can’t pluck by a nested key. I appreciate your support if you want to send a pull request! Head over to the [Collections repo on GitHub](https://github.com/supercharge/collections) to submit a PR. Thank you!
```


#### pop
- *added in version `1.9`*

The `pop` method removes and returns the last item from the collection. It changes the original collection:

```js
const collection = Collect([1, 2, 3])

await collection.pop()

// 3

await collection

// [1, 2]
```


#### push
- *added in version `1.3`*

The `push` method appends one or more items to the end of the collection. It returns a new collection with the pushed items without changing the original collection:

```js
const collection = Collect([1, 2, 3])
const pushed = collection.push(4, 5)

await pushed

// [1, 2, 3, 4, 5]

await collection

// [1, 2, 3]
```


#### reduce
- *added in version `1.0`*

The `reduce` method invokes a(n async) reducer function on each array item, passing the result of each iteration to the subsequent iteration. The result is a reduced collection to a single value:

```js
await Collect([1, 2, 3]).reduce(async (carry, item) => {
  return carry + item
}, 0)

// 6
```

The `reduce` method takes the initial value as a second argument. In the code snippet above, the initial value is `0`. Using `5` as the initial value returns a different result:

```js
await Collect([1, 2, 3]).reduce((carry, item) => {
    return carry + item
  }, 5)

// 11
```


#### reduceRight
- *added in version `1.0`*

The `reduceRight` method is similar to `reduce`, reducing a collection to a single value. It invokes a(n async) reducer function on each array item **from right-to-left**, passing the result of each iteration to the subsequent iteration:

```js
await Collect([1, 2, 3]).reduceRight(async (carry, item) => {
  return carry.concat(item)
}, [])

// [3, 2, 1]
```

The `reduceRight` method takes the initial value as a second argument.


#### reject
- *added in version `1.1`*

The `reject` method removes all items from the collection satisfying the async testing function:

```js
await Collect([1, 2, 3, 4, 5]).reject(async item => {
  return item % 2 === 1 // true when odd
})

// [2, 4]
```

See the [`filter`](#filter) method for the inverse of `reject`.

- **Notice:** `rejectSeries` became `reject` in version `2.0`


#### reverse
- *added in version `1.6`*

The `reverse` method reverses the collection. The first item becomes the last one, the second item becomes the second to last, and so on:

```js
await Collect([4, 6, 8, 9]).reverse()

// [9, 8, 6, 4]
```


#### shift
- *added in version `1.3`*

The `shift` method removes and returns the first item from the collection. It changes the original collection:

```js
const collection = Collect([1, 2, 3])

await collection.shift()

// 1

await collection

// [2, 3]
```


#### size
- *added in version `1.1`*

The `size` method returns the number of items in the collection:

```js
await Collect([1, 2, 3]).size()

// 3
```


#### slice
- *added in version `1.2`*

The `slice` method returns a slice of the collection starting at the given index without changing the collection:

```js
const collection = Collect([1, 2, 3, 4, 5, 6, 7])
const chunk = collection.slice(2)

await chunk

// [3, 4, 5, 6, 7]

await collection

// [1, 2, 3, 4, 5, 6, 7]
```

You can limit the size of the slice by passing a second argument to the `slice` method:

```js
const collection = Collect([1, 2, 3, 4, 5, 6, 7])
const chunk = collection.slice(2, 2)

await chunk

// [3, 4]
```


#### splice
- *added in version `1.2`*

The `splice` method removes abd returns a slice of items from the collection starting at the given index:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.splice(2)

await chunk

// [3, 4, 5]

await collection

// [1, 2]
```

You can limit the size of the slice by passing a second argument:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.splice(2, 2)

await chunk

// [3, 4]

await collection

// [1, 2, 5]
```

You can replace the removed items by passing an array as the third argument:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.splice(2, 2, [10, 11])

await chunk

// [3, 4]

await collection

// [1, 2, 10, 11, 5]
```


#### some
- *added in version `1.0`*

The `some` method determines whether at least one item from the collection satisfies the async testing function:

```js
await Collect([1, 2, 3]).some(item => {
  return item > 10
})

// false
```

Notice that you have to `await` the result of `some()`, because it also supports async callback functions:

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

- **Notice:** `someSeries` became `some` in version `2.0`


#### sort
- *added in version `1.6`*

The `sort` method returns the sorted collection:

```js
await Collect([4, 1, 37, 2, 1]).sort()

// [1, 1, 2, 4, 37]
```

The `sort` method accepts an optional comparator for custom sort operations:

```js
await Collect([4, 1, 37, 2, 1]).sort((a, b) => {
  return b - a
})

// [37, 4, 2, 1, 1]
```


#### sum
- *added in version `1.6`*

The `sum` method returns the sum of all collection items:

```js
await Collect([1, 2, 3, 4]).sum()

// 10
```


#### take
- *added in version `1.2`*

The `take` method returns a new Collection containing the specified number of items:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.take(3)

await chunk

// [1, 2, 3]

await collection

// [1, 2, 3, 4, 5]
```

Use a negative integer to `take` items from the end of the collection:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.take(-2)

await chunk

// [4, 5]

await collection

// [1, 2, 3, 4, 5]
```


#### takeAndRemove
- *added in version `1.2`*

The `takeAndRemove` method removes the specified number of items from the collection and returns them as a new Collection:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.takeAndRemove(3)

await chunk

// [1, 2, 3]

await collection

// [4, 5]
```

Use a negative integer to `takeAndRemove` items from the end of the collection:

```js
const collection = Collect([1, 2, 3, 4, 5])
const chunk = collection.takeAndRemove(-2)

await chunk

// [4, 5]

await collection

// [1, 2, 3]
```


#### toJSON
- *added in version `1.6`*

The `toJSON` method creates a JSON string from the values of the collection:

```js
await Collect([1, 2, 3]).toJSON()

// "[1,2,3]"

await Collect([{ name: 'Marcus'}]).toJSON()

// "[{"name":"Marcus"}]"
```


#### union
- *added in version `1.6`*

The `union` method adds all values from the array to the underlying collection and removes duplicates:

```js
await Collect([1, 2, 3]).union([2, 3, 4, 5])

// [1, 2, 3, 4, 5]
```


#### unique
- *added in version `1.13`*

The `unique` method returns all unique values in the collection:

```js
await Collect([1, 2, 2, 3, 4, 4, 4, 5]).unique()

// [1, 2, 3, 4, 5]
```

In real-world scenarios, you’re likely to work with more complex data structures like objects. The `unique` method accepts a string or callback function as an argument:

```js
await Collect([
  { name: 'Marcus' },
  { name: 'Marcus' },
  { name: 'Supercharge' }
])
  .unique('name')

/*
[
  { name: 'Marcus' },
  { name: 'Supercharge' }
]
*/
```

```warning
At this point, you can’t define a nested key as the identifier to make the collection unique. For example, you can only use `name` and not `user.name` as a value for a string `key`. Please use [uniqueBy](#uniqueby) for nested properties.
```


#### uniqueBy
- *added in version `2.4`*

The `uniqueBy` method returns all unique values in the collection identified by the given selector function. The selector should return the value identifying an item uniquely.

For example, having a list of users you may return the  user ID or email address to identify distinct users.

```js
await Collect([
  { name: 'Marcus' },
  { name: 'Supercharge' },
  { name: 'Marcus' }
])
  .uniqueBy(async user => {
    return user.name
  })

/*
[
  { name: 'Marcus' },
  { name: 'Supercharge' }
]
*/
```


#### unshift
- *added in version `1.5`*

The `unshift` method adds one or more elements to the beginning of the collection. It returns the new collection containing the added items:

```js
await Collect([1, 2, 3]).unshift(5, 6)

// [5, 6, 1, 2, 3]
```
