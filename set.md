# Set


## Introduction
The [`@supercharge/set`](https://github.com/supercharge/set) package provides a Set class with helpful methods like `.isEmpty()`, `.find(callback)`, `.map(callback)`, `.filter(callback)`, and many more.

You already know methods like `.map()` from arrays and having them available on sets improves your development experience. It’s also convenient to avoid all the `for..of` loops in your code.


## Installation
The [`@supercharge/set`](https://github.com/supercharge/set) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/set
```

```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```

## Working With Sets
Import the `@supercharge/set` package and use it the same way you would use JavaScript’s [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) class.

```info
**Please notice,** the `@supercharge/set` package is not a drop-in replacement for the native `Set` class shipped by JavaScript.
```

JavaScript aligned the `Set` and `Map` classes. Aligning sets and maps felt wrong for me. In my opinion, sets are more in line with arrays, not with maps. That’s why this package exists.

**It’s the Set class JavaScript should have shipped.**


```js
const Set = require('@supercharge/set')

const users = new Set()

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

[add](#add)
[clear](#clear)
[delete](#delete)
[filter](#filter)
[find](#find)
[flatMap](#flatMap)
[flatten](#flatten)
[forEach](#foreach)
[has](#has)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[map](#map)
[toArray](#toarray)
[of](#of)
[values](#values)

</div>


#### add
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


#### clear
The `clear` method removes all entries from the set:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')
  .add('Marcus')

users.size()
// 2

users.clear()

users.size()
// 0
```


#### delete
The `delete` method removes the entry identified by the given `value`:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

const removed = users.delete('Marcus')
// true

users.has('Marcus')
// false
```

Calling `set.delete(value)` returns `true` if the given value is present in the set and has been removed. Returns `false` if the value isn’t present in the set.


#### filter
The `filter` method returns a set containing only items matching the given `predicate`.

The predicate function will be called once for each entry in the set in insertion order. The `predicate` function receives the `value, set` arguments:

```js
const users = new Set()

users
  .add(1)
  .add(2)
  .add(3)

const names = users.filter((value, set) => {
  return value > 1
})

// Set [2, 3]
```


#### find
The `find` method returns the first item in the set matching the given `predicate`.

The `predicate` function receives the `value, set` arguments:

```js
const users = Set.of([
  { id: 1, name: 'Marcus' },
  { id: 2, name: 'Supercharge' }
])

const names = users.find((value, set) => {
  return value.name === 'Supercharge'
})

// { id: 2, name: 'Supercharge' }
```


#### flatMap
The `flatMap` method returns a new set instance containing the results of applying the given `transform` function and ultimately collapsing the result (one level deep).

The transform function will be called once for each entry in the set in insertion order. The `transform` function receives the `value, set` arguments:

```js
const users = Set.of([ 'Marcus', ['Supercharge'] ])

const names = users.map((value, set) => {
  return value
})

// Set ['Marcus', 'Supercharge']
```


#### flattem
The `flattem` method flatten the items in the set one level deep.

```js
const users = Set.of([ 'Marcus', ['Supercharge'] ]).flatten()

// Set ['Marcus', 'Supercharge']
```


#### forEach
The `forEach` method processes a given `callback` function once for each entry in the set in insertion order. The `callback` function receives the `value, set` arguments:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

cache.forEach((value, set) => {
  console.log(value)
})

// 'Marcus'
// 'Supercharge'
```


#### has
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


#### isEmpty
The `isEmpty` method returns `true` if the set has no entries. Returns `false` if entries are present in the set:

```js
const set = new Set()

set.isEmpty()
// true

set.add('Marcus')

set.isEmpty()
// false
```


#### isNotEmpty
The `isNotEmpty` method returns `true` if entries are present the map. Returns `false` if the set is empty:

```js
const set = new Set()

set.isNotEmpty()
// false

set.add('Marcus')

set.isNotEmpty()
// true
```


#### map
The `map` method returns a new set instance containing the results of the given `transform` function.

The transform function will be called once for each entry in the set in insertion order. The `transform` function receives the `value, set` arguments:

```js
const users = Set.of(['Marcus', 'Supercharge'])

const names = users.map((value, set) => {
  return value
})

// Set ['Marcus', 'Supercharge']
```


#### of
The static `of` method creates a new set instance of the given values. It’s basically a shortcut for `new Set(entries)`:

```js
const set = Set.of(['Marcus', 'Supercharge'])

set.has('Marcus')
// true
```


#### size
The `size` method returns the number of entries in the set:

```js
const set = Set.of(['Marcus', 'Supercharge'])

const size = set.size()
// 2
```


#### toArray
The `toArray` method returns an array containing the items of the set.

```js
const set = Set.of([1, 2, 3, 4])

const array = set.toArray()
// [1, 2, 3, 4]

```


#### values
The `values` method returns an iterator object containing the values present in the set (in insertion order):

```js
const users = Set.of(['Marcus', 'Supercharge'])

const valueIterator = users.values()

valueIterator.next().value
// 'Marcus'

valueIterator.next().value
// 'Supercharge'
```

You may also iterate through the values using a `for..of` or loop:

```js
const users = Set.of(['Marcus', 'Supercharge'])

for (const value of users.values()) {
  console.log(value)
}

// 'Marcus'
// 'Supercharge'
```
