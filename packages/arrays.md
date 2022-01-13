# Arrays


## Introduction
The [`@supercharge/arrays`](https://github.com/supercharge/arrays) package is an extended array class with helpful methods like `.isEmpty()`, `last()` and `.findLast()`, `.flatMap(callback)`, and many more.

`@supercharge/arrays` is a wrapper around JavaScript arrays providing dozens of useful and convenient methods that are not available in native JavaScript arrays


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
  .add({ id: 1, name: 'Marcus' })
  .add({ id: 2, name: 'Norman' })
  .add({ id: 3, name: 'Christian' })

users.isNotEmpty()
// true

const usernamesArray = users
  .map(user => {
    return user.name
  })
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
    #collection-method-list > p {
        column-count: 2; -moz-column-count: 2; -webkit-column-count: 2;
        column-gap: 2rem; -moz-column-gap: 2rem; -webkit-column-gap: 2rem;
    }

    #collection-method-list a {
        display: block;
    }
</style>

<div id="collection-method-list" markdown="1">

[Set.from](#set.from)
[Set.of](#set.of) (deprecated)

[add](#add)
[all](#all)
[any](#any)
[at](#at)
[clear](#clear)
[concat](#concat)
[count](#count)
[delete](#delete)
[filter](#filter)
[find](#find)
[findIndex](#findindex)
[findLast](#findLast)
[findLastIndex](#findlastindex)
[first](#first)
[flatMap](#flatmap)
[flatten](#flatten)
[forEach](#foreach)
[has](#has)
[includes](#includes)
[intersect](#intersect)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[isMissing](#ismissing)
[join](#join)
[map](#map)
[of](#of)
[reduce](#reduce)
[size](#size)
[toArray](#toarray)
[values](#values)

</div>


#### Set.from
- *added in `2.1`*

The static `Set.from` method creates a new set instance for a given iterable, like `Array.from`:

```js
const numbers = Set.from([1, 2, 1, 2])

numbers.toArray()
// [1, 2]
```


#### Set.of
- ***deprecated** since version `2.1.0`. Please use [Set.from](#set.from) instead*
- *added in `1.0`*

The static `of` method creates a new set instance of the given values. It’s basically a shortcut for `new Set(entries)`:

```js
const set = Set.of(['Marcus', 'Supercharge'])

set.has('Marcus')
// true
```


#### add
- *updated in `2.2.0` supporting multiple values (`set.add(1, 2, 3)`)*
- *added in `1.0`*

The `add` method adds an item to the end of a set if it doesn’t already exists in the set:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')
  .add('Marcus')

users.toArray()
// ['Marcus', 'Supercharge']
```

Since version `2.2.0` you can add multiple values within a single call:

```js
const users = new Set()

users.add('Marcus', 'Supercharge', 'Marcus')

users.toArray()
// ['Marcus', 'Supercharge']
```


#### all
- *added in `2.2`*

The `all` method determines whether all of the values in the set match the given predicate function:

```js
const users = Set.from([
  { id: 1, subscribed: false, name: 'Marcus' },
  { id: 2, subscribed: true, name: 'Supercharge' }
])

users.all(user => {
  return user.subscribed === true
})
// false

users.all(user => {
  return user.id > 0
})
// true
```


#### any
- *added in `2.2`*

The `any` method determines whether at least one of the values in the set matches the given predicate function:

```js
const users = Set.from([
  { id: 1, subscribed: false, name: 'Marcus' },
  { id: 2, subscribed: true, name: 'Supercharge' }
])

users.any(user => {
  return user.subscribed === true
})
// true

users.any(user => {
  return user.id === 0
})
// false
```


#### at
- *added in `1.7`*

The `at` method returns the item at a given `index` or `undefined` if the index exceeds the set’s size.

```js
const users = Set.from(['Marcus', 'Supercharge', 'Norman', 'Christian])

users.at(2)
// 'Norman'

users.at(22)
// undefined
```


#### clear
- *added in `1.0`*

The `clear` method removes all entries from the set:

```js
const users = Set.from(['Marcus', 'Supercharge', 'Marcus'])

users.size()
// 2

users.clear()

users.size()
// 0
```


#### concat
- *added in `1.4`*

The `concat` method adds an array or individual values to the set.

```js
Set.from([1, 2]).concat([3, 4])
// Set [1, 2, 3, 4]

Set.from([1, 2]).concat(5, 6)
// Set [1, 2, 5, 6]
```


#### count
- *added in `1.4`*

The `count` method returns the number of items matching the given `predicate` function.

```js
const set = Set.from([1, 2, 3, 4, 5])

set.count(value => {
  return value > 2
})
// 3
```

The `count` method returns the size of the set when not providing a predicate function.


#### delete
- *added in `1.0`*

The `delete` method removes the entry identified by the given `value`:

```js
const users = Set.from(['Marcus', 'Supercharge'])

const removed = users.delete('Marcus')
// true

users.has('Marcus')
// false
```

Calling `set.delete(value)` returns `true` if the given value is present in the set and has been removed. Returns `false` if the value isn’t present in the set.


#### filter
- *added in `1.0`*

The `filter` method returns a set containing only items matching the given `predicate`.

The `predicate` function will be called once for each entry in the set in insertion order.

```js
const users = Set.from([1, 2, 3])

const names = users.filter((value, set) => {
  return value > 1
})

// Set [2, 3]
```


#### find
- *added in `1.0`*

The `find` method returns the first item in the set matching the given `predicate`.

```js
const users = Set.from([
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Supercharge' }
])

const names = users.find((value, set) => {
  return value.name === 'Supercharge'
})

// { id: 2, name: 'Supercharge' }
```


#### findIndex
- *added in `2.0`*

The `findIndex` method returns the index of the first item in the set satisfying the given `predicate` function. Returns `-1` if no item matches the predicate function.

```js
const users = Set.from([
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
- *added in `2.2`*

The `findLast` method returns the last item in the set matching the given `predicate` function.

```js
const users = Set.from([
  { subscribed: true, name: 'Marcus' },
  { subscribed: true, name: 'Supercharge' }
])

const user = users.findLast(user => {
  return user.subscribed === true
})
// { id: 2, name: 'Supercharge' }
```


#### findLastIndex
- *added in `2.2`*

The `findLastIndex` method returns the index of the last item in the set satisfying the given `predicate` function. Returns `-1` if no item matches the predicate function.

```js
const users = Set.from([
  { subscribed: true, name: 'Marcus' },
  { subscribed: true, name: 'Supercharge' }
])

const index = users.findLastIndex(user => {
  return user.subscribed === true
)
// 1

const index = users.findLastIndex((value, set) => {
  return value.name === 'Hello'
})
// -1
```


#### first
- *added in `1.7`*

The `first` method returns the first item in the set or the first item matching the given `predicate` function:

```js
const users = Set.from([
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Supercharge' }
  { id: 3, name: 'Albert' }
])

users.first()
// { id: 1, name: 'Marcus' }

users.first(user => {
  return user.id > 1
})
// { id: 2, name: 'Supercharge' }

users.first(user => {
  return user.id > 22
})
// undefined
```


#### flatMap
- *added in `1.3`*

The `flatMap` method returns a new set instance, after applying the given `transform` function and collapsing the result (one level deep).

The `transform` function will be called once for each entry in the set in insertion order. The `transform` function receives the `value, set` arguments:

```js
const users = Set.from([ 'Marcus', ['Supercharge'] ])

const names = users.map((value, set) => {
  return value
})
// Set ['Marcus', 'Supercharge']
```


#### flatten
- *added in `1.3`*

The `flatten` method flattens the items in the set at a depth of `1`.

```js
const users = Set.from([ 'Marcus', ['Supercharge'] ]).flatten()

// Set ['Marcus', 'Supercharge']
```


#### forEach
- *added in `1.0`*

The `forEach` method processes a given `callback` function once for each entry in the set in insertion order. The `callback` function receives the `value, set` arguments:

```js
const names = Set.from(['Marcus', 'Supercharge'])

names.forEach(name => {
  console.log(name)
})

// 'Marcus'
// 'Supercharge'
```


#### has
- *added in `1.0`*

The `has` method returns `true` if the given `value` is present in the set, otherwise `false`:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

users.has('Marcus')
// true

users.has('not-existent')
// false
```


#### includes
- *added in `1.5`*

The `includes` method determines whether the set includes a given `value` or if it includes a value satisfying a given `predicate` function:

```js
const set = Set.from([1, 2, 3, 4, 5])

set.includes(4)
// true

set.includes(num => {
  return num > 3
})
// true
```


#### intersect
- *added in `2.2`*

The `intersect` method returns a set containing all items that are contained in all collections:

```js
const ids = Set.from([1, 2, 3])

const intersection = ids.intersect(
  Set.from([2, 3]), [1, 3, 4, 5]
)
// Set [3]
```


#### isEmpty
- *added in `1.0`*

The `isEmpty` method returns `true` if the set has no entries. Returns `false` if entries are present in the set:

```js
const set = new Set()

set.isEmpty()
// true

set.add('Marcus')

set.isEmpty()
// false
```


#### isMissing
- *added in `2.0`*

The `isMissing` method returns `true` if the given `value` is not present in the set, otherwise `false`:

```js
const users = Set.from(['Marcus', 'Supercharge'])

users.isMissing('Marcus')
// false

users.isMissing('not-existent')
// true
```


#### join
- *updated in `1.9` to support a callback function to compose a seperator*
- *updated in `1.8` to support an optional seperator*
- *added in `1.0`*

The `join` method returns a string of all items concatenated. By default, it uses a comma `,` for concatenation:

```js
const set = Set.from(['Marcus', 'Supercharge'])

set.join()
// '1,2,3'
```

You can provide a separator that will then be used for concatenation:

```js
const set = Set.from(['Marcus', 'Supercharge'])

set.join('; ')
// '1; 2; 3'
```

You may also provide a callback function to compose a separator for each item:

```js
const set = Set.from(['Marcus', 'Supercharge'])

set.join(name => {
  return `${name} -> `
})
// '1 -> 2 -> 3 ->'
```


#### isNotEmpty
- *added in `1.0`*

The `isNotEmpty` method returns `true` if entries are present in the set. Returns `false` if the set is empty:

```js
const set = new Set()

set.isNotEmpty()
// false

set.add('Marcus')

set.isNotEmpty()
// true
```


#### map
- *added in `1.0`*

The `map` method returns a new set instance containing the results of the given `transform` function.

The `transform` function will be called once for each entry in the set, in order of insertion. The `transform` function receives the `value, set` arguments:

```js
const users = Set()

users
  .add('Marcus')
  .add('Supercharge')

const names = users.map((value, set) => {
  return value
})

// Set ['Marcus', 'Supercharge']
```


#### reduce
- *added in `1.6`*

The `reduce` method invokes reducer function on each item in the set, passing the result of the previous iteration to the subsequent iteration. The result is a reduced set to a single value:

```js
const set = Set.from([1, 2, 3, 4, 5])

set.reduce((sum, value) => {
  return sum + value
}, 0)
// 15
```

The `reduce` method takes an initial value as a second argument. In the code snippet above, the initial value is `0`. Using `5` as the initial value returns a different result:

```js
const set = Set.from([1, 2, 3, 4, 5])

set.reduce((sum, value) => {
  return sum + value
}, 5)
// 20
```


#### size
- *added in `1.0`*

The `size` method returns the number of entries in the set:

```js
const set = Set.from(['Marcus', 'Supercharge'])

const size = set.size()
// 2
```


#### toArray
- *added in `1.0`*

The `toArray` method returns an array containing the entries of the set.

```js
const set = Set.from([1, 2, 3, 4])

const array = set.toArray()
// [1, 2, 3, 4]

```


#### values
- *added in `1.0`*

The `values` method returns an iterator object of the values present in the set (in insertion order):

```js
const users = Set.from(['Marcus', 'Supercharge'])

const valueIterator = users.values()

valueIterator.next().value
// 'Marcus'

valueIterator.next().value
// 'Supercharge'
```

You may also iterate through the values using a `for..of` loop:

```js
const users = Set.from(['Marcus', 'Supercharge'])

for (const value of users.values()) {
  console.log(value)
}

// 'Marcus'
// 'Supercharge'
```
