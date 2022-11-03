# Arrays


## Overview
The [`@supercharge/arrays`](https://github.com/supercharge/arrays) package is an extended array class with helpful methods like `.isEmpty()`, `last()` and `.findLast()`, `.flatMap(callback)`, and many more.

`@supercharge/arrays` is a wrapper around JavaScript arrays providing dozens of useful and convenient methods that are not available in native JavaScript arrays.


## Installation
The [`@supercharge/arrays`](https://github.com/supercharge/arrays) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/arrays
```

```success
You can use this arrays package with every project even if it’s not build on Supercharge. Enjoy!
```


## CommonJS, ESM, and TypeScript Support
The arrays package supports both module loaders: CommonJS and ESM, and also TypeScript. Import `@supercharge/arrays` in your projects like this:

```js
// ESM and TypeScript
import { Arr } from '@supercharge/arrays'

// CommonJS
const { Arr } = require('@supercharge/arrays')
```

We shortened the export to `Arr` to not overlay JavaScripts global `Array` class. Also, using the `Arr` naming makes clear that you’re working with a package and not JavaScript’s `Array`.


## Fully Synchronous
All methods provided by `@supercharge/arrays` are synchronous, like the native array methods.

In case you’re looking for asynchronous method support, check out [@supercharge/collections](https://superchargejs.com/docs/collections). Collections are the asynchronous array pendant.

- 👉 [@supercharge/collections](https://superchargejs.com/docs/collections)



## Working With Arrays
Import the `@supercharge/arrays` package and use it the same way you would use JavaScript’s [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) class.


```js
const { Arr } = require('@supercharge/arrays')

const users = Arr.from([])

users.isEmpty()
// true

users
  .push({ id: 1, name: 'Marcus' })
  .push({ id: 2, name: 'Norman' })
  .push({ id: 3, name: 'Christian' })

users.isNotEmpty()
// true

users.length()
// 3

const usernamesArray = users
  .map(user => user.name)
  .toArray()
// [ 'Marcus', 'Norman', 'Christian' ]

const marcus = users.find(user => {
  return user.name === 'Marcus'
})
// { id: 1, name: 'Marcus' }
```


## Available Methods
Here’s a list of available methods on a set instance:

<style>
#collection-method-list>p {
  column-count: 2;
  -moz-column-count: 2;
  -webkit-column-count: 2;
  column-gap: 2rem;
  -moz-column-gap: 2rem;
  -webkit-column-gap: 2rem;
}

#collection-method-list a {
  display: block;
}
</style>

<div id="collection-method-list" markdown="1">

[Arr.from](#arrfrom)
[Arr.isArray](#arrisarray)
[Arr.isNotArray](#arrisnotarray)
[Arr.isIterable](#arrisiterable)

[at](#at)
[collapse](#collapse)
[compact](#compact)
[concat](#concat)
[chunk](#chunk)
[diff](#chunk)
[filter](#filter)
[find](#find)
[findIndex](#findindex)
[findLast](#findlast)
[flatMap](#flatmap)
[has](#has)
[intersect](#intersect)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[join](#join)
[last](#last)
[length](#length)
[map](#map)
[max](#max)
[median](#median)
[min](#min)
[pop](#pop)
[push](#push)
[removeNullish](#removenullish)
[reject](#reject)
[reverse](#reverse)
[shift](#shift)
[size](#size)
[slice](#slice)
[splice](#splice)
[sort](#sort)
[takeAndRemove](#takeandremove)
[toArray](#toarray)
[unique](#unique)
[uniqueBy](#uniqueby)
[unshift](#unshift)
</div>

```success
Please feel free to [submit a pull request on GitHub](https://github.com/supercharge/arrays) if you want to see a new function added to this package. I appreciate your support!
```


#### Arr.from
- *added in `1.2`*

The static `Arr.from` method creates a new `Arr` instance for a given iterable:

```js
const numbers = Arr.from([1, 2])

numbers.toArray()
// [1, 2]
```


#### Arr.isArray
- *added in `1.0`*

The static `Arr.isArray` method determines whether a given input is an array:

```js
Arr.isArray([1, 2])
// true

Arr.isArray('[1, 2]')
// false
```


#### Arr.isNotArray
- *added in `1.0`*

The static `Arr.isNotArray` method determines whether a given input is **not** an array:

```js
Arr.isNotArray([1, 2])
// false

Arr.isNotArray('1, 2')
// true
```



#### Arr.isIterable
- *added in `4.1`*

The static `Arr.isIterable` method determines whether a given input is iterable meaning that it implements a [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) function:

```js
Arr.isIterable([1, 2])
// true

Arr.isIterable('1, 2')
// true

Arr.isIterable(null)
// false
```


#### at
- *added in `1.1`*

The `at` method returns the item at a given `index` or `undefined` if the index exceeds the set’s size.

```js
const users = Set.from(['Marcus', 'Supercharge', 'Norman', 'Christian])

users.at(2)
// 'Norman'

users.at(22)
// undefined
```


#### collapse
- *added in `1.0`*

The `collapse` method collapses the array one level deep into a single, flat array:

```js
Arr
  .from([[1], [{}, 'Marcus', true], [22]])
  .collapse()
  .toArray()

// [1, {}, 'Marcus', true, 22]
```


#### compact
- *added in `1.0`*

The `compact` method removes all falsy values from the array. For example, falsy values are `null`, `undefined`, `''`, `false`, `0`, `NaN`:

```js
Arr
  .from([0, null, undefined, 1, false, 2, '', 3, NaN])
  .compact()
  .toArray()

// [1, 2, 3]
```


#### concat
- *added in `1.0`*

The `concat` method adds an array or individual values to the set.

```js
Arr.from([1, 2]).concat([3, 4])
// Arr [1, 2, 3, 4]

Arr.from([1, 2]).concat(5, 6)
// Arr [1, 2, 5, 6]
```




#### chunk
- *added in version `1.0`*

The `chunk` method splits the array into multiple, smaller arrays of a given size:

```js
const chunks = Arr
  .from([1, 2, 3, 4, 5, 6, 7, 8])
  .chunk(3)
  .toArray()

// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8]
// ]
```


#### diff
- *added in version `1.0`*

The `diff` method removes all values from the array that are present in the given `candidate`.

```js
Arr
  .from([1, 2, 3])
  .diff([2, 3, 4, 5])
  .toArray()

// [1]
```


#### filter
- *added in `1.0`*

The `filter` method returns an array containing only items matching the given `predicate` function.

The `predicate` function will be called once for each entry in the array:

```js
const users = Arr.from([1, 2, 3])

const names = users.filter((value, index) => {
  return value > 1
})

// Arr [2, 3]
```


#### find
- *added in `1.1`*

The `find` method returns the first item in the array matching the given `predicate`:

```js
const users = Arr.from([
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Supercharge' }
])

const user = users.find((value, set) => {
  return value.name === 'Supercharge'
})

// { id: 2, name: 'Supercharge' }
```


#### findIndex
- *added in `1.1`*

The `findIndex` method returns the index of the first item in the array satisfying the given `predicate` function. Returns `-1` if no item matches the predicate function:

```js
const users = Arr.from([
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Supercharge' }
])

const index = users.findIndex((value, set) => {
  return value.name === 'Supercharge'
})
// 1

const index = users.findIndex((value, set) => {
  return value.name === 'Hello'
})
// -1
```


#### findLast
- *added in `1.1`*

The `findLast` method returns the last item in the array matching the given `predicate` function:

```js
const users = Arr.from([
  { subscribed: true, name: 'Marcus' },
  { subscribed: true, name: 'Supercharge' }
])

const user = users.findLast(user => {
  return user.subscribed === true
})
// { id: 2, name: 'Supercharge' }
```


#### flatMap
- *added in version `2.0`*

The `flatMap` method invokes the callback function on each array item. The callback can modify and return the item resulting in a new array of modified items. Ultimately, `flatMap` flattens the mapped results one level deep:

```js
Arr.from([1, 2, 3]).flatMap(item => {
  return [item, item]
})

// [1, 1, 2, 2, 3, 3]
```


#### has
- *added in `2.0`*

The `has` method returns `true` if the given `value` is present in the array, otherwise `false`:

```js
const users = Arr.from(['Marcus', 'Supercharge'])

users.has('Marcus')
// true

users.has('not-existent')
// false
```


#### intersect
- *added in `1.0`*

The `intersect` method returns an array containing all items that are contained in all collections:

```js
const ids = Arr.from([1, 2, 3])

const intersection = ids.intersect(
  [2, 3], [1, 3, 4, 5]
)
// Arr [3]
```


#### isEmpty
- *added in `1.0`*

The `isEmpty` method returns `true` if the array has no entries. Returns `false` if entries are present in the array:

```js
const items = Arr.from([])

items.isEmpty()
// true

items.push('Marcus')

items.isEmpty()
// false
```


#### isMissing
- *added in `2.0`*

The `isMissing` method returns `true` if the given `value` is not present in the array, otherwise `false`:

```js
const users = Arr.from(['Marcus', 'Supercharge'])

users.isMissing('Marcus')
// false

users.isMissing('not-existent')
// true
```


#### isNotEmpty
- *added in `1.0`*

The `isNotEmpty` method returns `true` if entries are present in the array. Returns `false` if the array is empty:

```js
const items = Arr.from([])

items.isNotEmpty()
// false

items.push('Marcus')

items.isNotEmpty()
// true
```


#### join
- *added in `1.0`*

The `join` method returns a string of all items concatenated. By default, it uses a comma `,` for concatenation:

```js
const names = Arr.from([1, 2, 3])

names.join()
// '1,2,3'
```

You can provide a separator that will then be used for concatenation:

```js
const names = Arr.from([1, 2, 3])

names.join()
// '1; 2; 3'
```


#### last
- *added in version `1.1`*

The `last` method returns the last item in the array. Returns `undefined` if the array is empty. It won’t remove the returned item from the array:

```js
Arr
  .from([1, 2, 3])
  .last()

// 3
```

You can also pass a predicate function as a parameter to the `last` method:

```js
Arr
  .from([1, 2, 3, 4, 5])
  .last(num => {
    return num > 2
  })

// 5
```

The `last` method behaves like [`findLast`](#findlast) when using a predicate function.


#### length
- *added in version `1.0`*

The `length` method returns the number of items in the array:

```js
Arr
  .from([1, 2, 3])
  .length()

// 3
```


#### map
- *added in version `2.0`*

The `map` method invokes the callback function on each array item and returns an array of transformed items. Because `map` returns an `Arr` instance, you could chain further operations:

```js
Arr.from([1, 2, 3]).map(item => {
  return item * 10
})
// [ 10, 20, 30 ]
```


#### max
- *added in version `1.0`*

The `max` method returns the max value in the array:

```js
Arr.from([1, 2, 3]).max()
// 3
```


#### median
- *added in version `1.0`*

The `median` method returns the [median](https://en.wikipedia.org/wiki/Median) value of the array:

```js
Arr
  .from([1, 2, 3, 4, 5, 6])
  .median()

// 3.5
```


#### min
- *added in version `1.0`*

The `min` method returns the min value in the array:

```js
Arr.from([1, 2, 3]).min()
// 1
```


#### pop
- *added in version `1.0`*

The `pop` method removes and returns the last item from the array:

```js
const items = Arr.from([1])

items.pop()
// 1

items.pop()
// undefined
```


#### push
- *added in version `1.0`*

The `push` method appends one or more items to the end of the array:

```js
Arr
  .from([1])
  .push(2, 3)
  .toArray()

// [1, 2, 3]
```


#### removeNullish
- *added in `1.0`*

The `removeNullish` method removes all `null` and `undefined` values from the array:

```js
Arr
  .from([1, null, undefined, '', false])
  .removeNullush()
  .toArray()

// [1, '', false]
```


#### reject
- *added in `4.1`*

The `reject` method is the inverse operation of [filter](#filter). It returns an array containing only items **not** matching the given `predicate` function.

The `predicate` function will be called once for each entry in the array:

```js
const users = Arr.from([1, 2, 3, 4])

const names = users.reject((value, index) => {
  return value > 2
})

// Arr [1, 2]
```


#### reverse
- *added in version `1.0`*

The `reverse` method reverses the array. The first item becomes the last one, the second item becomes the second to last, and so on:

```js
Arr
  .from([1, 2, 3])
  .reverse()

// Arr [3, 2, 1]
```


#### shift
- *added in version `1.0`*

The `shift` method removes and returns the first item from the array. It changes the original array:

```js
const items = Arr.from([1, 2, 3])

items.shift()
// 1

items.toArray()
// [2, 3]
```


#### size
- *added in `1.0`*

The `size` method is an alias for the [length](#length) method:

```js
const names = Arr.from(['Marcus', 'Supercharge'])

const size = names.size()
// 2
```


#### slice
- *added in version `1.0`*

The `slice` method returns a slice of the array starting at the given index:

```js
const arr = Arr.from([1, 2, 3, 4, 5])

const chunk = arr.slice(2)
// [3, 4, 5]
```

You can limit the size of the slice by passing a second argument to the `slice` method:

```js
const arr = Arr.from([1, 2, 3, 4, 5])
const chunk = arr.slice(2, 2)
// [3, 4]
```


#### splice
- *added in version `1.0`*

The `splice` method removes abd returns a slice of items from the array starting at the given index:

```js
const arr = Arr.from([1, 2, 3, 4, 5])

const chunk = arr.splice(2)
// [3, 4, 5]
```

You can limit the size of the slice by passing a second argument:

```js
const arr = Arr.from([1, 2, 3, 4, 5])

const chunk = arr.splice(2, 2)
// [3, 4]
```

You can replace the removed items by passing an array as the third argument:

```js
const arr = Arr.from([1, 2, 3, 4, 5])

const chunk = arr.splice(2, 2, [10, 11])
// [3, 4]

arr.toArray()
// [1, 2, 10, 11, 5]
```

#### sort
- *added in version `1.0`*

The `sort` method returns the sorted array:

```js
const sorted = Arr.from([4, 1, 37, 2, 1]).sort()

// [1, 1, 2, 4, 37]
```

The `sort` method accepts an optional comparator for custom sort operations:

```js
Arr.from([4, 1, 37, 2, 1]).sort((a, b) => {
  return b - a
})

// [37, 4, 2, 1, 1]
```


#### toArray
- *added in `1.1`*

The `toArray` method returns a native JavaScript array:

```js
const arr = Arr.from([1, 2, 3, 4])

const array = arr.toArray()
// [1, 2, 3, 4]
```


#### unique
- *added in version `4.1`*

The `unique` method returns all unique values in the array:

```js
Arr.from([1, 2, 2, 3, 4, 4, 4, 5]).unique()

// [1, 2, 3, 4, 5]
```

In real-world scenarios, you’re likely to work with more complex data structures like objects. Please use the [uniqueBy](#uniqueby) method which accepts a callback function as an argument.


#### uniqueBy
- *added in version `4.1`*

In real-world scenarios, you’re likely to work with more complex data structures like objects. Please use the `uniqueBy` method which accepts a callback function as an argument:

```js
Arr.from([
  { name: 'Marcus' },
  { name: 'Marcus' },
  { name: 'Supercharge' }
])
  .uniqueBy(user => {
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
- *added in `1.0`*

The `unshift` method adds one or more items to the beginning of the array:

```js
const arr = Arr
  .from([1, 2, 3])
  .unshift(5, 6)

// [5, 6, 1, 2, 3]
```
