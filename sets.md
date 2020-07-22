# Sets


## Introduction
The [`@supercharge/sets`](https://github.com/supercharge/sets) package provides an extended JavaScript `Set` class providing methods like `.isEmpty()`, `.find(callback)`, `.map(callback)`, and many more.

You already know methods like `.map()` from arrays and having them available on sets improves your development experience. It’s also convenient to avoid all the `for..of` loops in your code.


## Installation
The [`@supercharge/sets`](https://github.com/supercharge/sets) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/sets
```

```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```

## Working With Sets
Import the `@supercharge/sets` package and use it the same way you would use JavaScript’s `Set` class:

```js
const Set = require('@supercharge/sets')

const users = new Set()

users.isEmpty()
// true

users
  .add({ id: 1, name: 'Marcus' })
  .add({ id: 2, name: 'Norman' })
  .add({ id: 3, name: 'Christian' })

users.isNotEmpty()
// true

const usernamesArray = users.map(user => {
  return user.name
})

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
[entries](#entries)
[find](#find)
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

users.size
// 2

users.clear()

cache.size
// 0
```


#### delete
The `delete` method removes the entry identified by the given `key`:

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

Calling `set.delete(key)` returns `true` if the given key is present in the set and has been removed. Returns `false` if the key isn’t present in the set.


#### entries
The `entries` method returns an iterator object containing a `[value, value]` pair for each item in the set (in insertion order).

If you’re wondering about the `[value, value]` pair, sets don’t have a key like in `Map` objects. The API of sets is similar to maps and that’s why you’re receiving an array with two properties:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

const iterator = users.entries()

iterator.next().value
// ['Marcus', 'Marcus']

iterator.next().value
// ['Supercharge', 'Supercharge']
```

You may also iterate through the set entries using a `for..of` or loop:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

for (const [value] of users.entries()) {
  console.log(value)
}

// 'Marcus'
// 'Supercharge'
```


#### forEach
The `forEach` method processes a given `callback` function once for each entry in the set in insertion order. The `callback` function receives the `value, value, set` arguments:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

cache.forEach((value, value, set) => {
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
The `map` method returns an array containing the results of the given `transform` function.

The transform function will be called once for each entry in the set in insertion order. The `transform` function receives the `value, value, set` arguments:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

const names = users.map((value, value, set) => {
  return value
})

// ['Marcus', 'Supercharge']
```


#### of
The static `of` method creates a new set instance of the given values. It’s basically a shortcut for `new Set(entries)`:

```js
const set = Set.of(['Marcus', 'Supercharge'])

set.has('Marcus')
// true
```


#### values
The `values` method returns an iterator object containing the values present in the set (in insertion order):

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

const valueIterator = users.values()

valueIterator.next().value
// 'Marcus'

valueIterator.next().value
// 'Supercharge'
```

You may also iterate through the values using a `for..of` or loop:

```js
const users = new Set()

users
  .add('Marcus')
  .add('Supercharge')

for (const value of users.values()) {
  console.log(value)
}

// 'Marcus'
// 'Supercharge'
```


## Available Properties
Here’s a list of available properties on a set instance:

<div id="collection-method-list" markdown="1">

[size](#size)

</div>


#### size
The `size` property returns the number of entries in the set:

```js
const set = new Set()

set
  .add('Marcus')
  .add('Supercharge')

const size = set.size
// 2
```

