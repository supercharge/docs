# Maps


## Introduction
The [`@supercharge/maps`](https://github.com/supercharge/maps) package provides an extended JavaScript `Map` class providing methods like `.isEmpty()`, `.map(callback)`, and many more.

You already know methods like `.map()` from arrays and having them available on maps improves your development experience and makes your code more readable.


## Installation
The [`@supercharge/maps`](https://github.com/supercharge/maps) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/maps
```

```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```

## Working With Maps
Import the `@supercharge/maps` package and use it the same way you would use JavaScript’s `Map` class:

```js
const Map = require('@supercharge/maps')

const cache = new Map()

cache.isEmpty()
// true

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.isNotEmpty()
// true

const users = cache.map((value, key) => {
  return { [key]: value }
})

// [{ 'user:1': 'Marcus' }, { 'user:2': 'Supercharge' }]
```


## Available Methods
Here’s a list of available methods in the package:

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

[clear](#clear)
[delete](#delete)
[entries](#entries)
[forEach](#foreach)
[get](#get)
[getOrDefault](#getordefault)
[has](#has)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[keys](#keys)
[map](#map)
[of](#of)
[set](#set)
[values](#values)

</div>


#### clear
The `clear` method removes all entries from the map:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.size
// 2

cache.clear()

cache.size
// 0
```


#### delete
The `delete` method removes the entry identified by the given `key`:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.has('user:1')
// true

const removed = cache.delete('user:1')
// true

cache.has('user:1')
// false
```

Calling `map.delete(key)` returns `true` if the given key is present in the map and has been removed. Returns `false` if the key isn’t present in the map.


#### entries
The `entries` method returns an iterator object containing the `[key, value]` pairs present in the map (in insertion order):

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

const iterator = cache.entries()

iterator.next().value
// ['user:1', 'Marcus']

iterator.next().value
// ['user:2', 'Supercharge']
```

You may also iterate through the `[key, value]` pairs using a `for..of` or loop:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

for (const [key, value] of cache.entries()) {
  console.log(`"${key}" mapping to --> ${value}`)
}

// "user:1" mapping to --> Marcus
// "user:2" mapping to --> Supercharge
```


#### forEach
The `forEach` method processes a given `callback` function once for each entry in the map in insertion order. The `callback` function receives the `value, key, map` arguments:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.forEach((value, key, map) => {
  console.log(`"${key}" mapping to --> ${value}`)
})

// "user:1" mapping to --> Marcus
// "user:2" mapping to --> Supercharge
```


#### get
The `get` method returns the value stored identified by the given `key`. Returns `undefined` if the given `key` is not present in the map:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.get('user:1')
// 'Marcus'

cache.get('user:5000')
// undefined
```


#### getOrDefault
The `getOrDefault` method returns the value stored identified by the given `key`, or the given `defaultValue` if the given `key` is not present in the map:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.getOrDefault('user:1', 'Default-Username')
// 'Marcus'

cache.getOrDefault('user:5000', 'Default-Username')
// 'Default-Username'
```


#### has
The `has` method returns `true` if the given `key` is present in the map, otherwise `false`:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.has('user:1')
// true

cache.has('user:5000')
// false
```


#### isEmpty
The `isEmpty` method returns `true` if the map has no entries. Returns `false` if `key/value` pairs are present in the map:

```js
const cache = new Map()

cache.isEmpty()
// true

cache.set('user:1', 'Marcus')

cache.isEmpty()
// false
```


#### isNotEmpty
The `isNotEmpty` method returns `true` if `key/value` pairs are present the map. Returns `false` if the map is empty:

```js
const cache = new Map()

cache.isNotEmpty()
// false

cache.set('user:1', 'Marcus')

cache.isNotEmpty()
// true
```


#### keys
The `keys` method returns an iterator object containing the keys present in the map (in insertion order):

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

const keyIterator = cache.keys()

keyIterator.next().value
// 'user:1'

keyIterator.next().value
// 'user:2'
```

You may also iterate through the keys using a `for..of` or loop:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

for (const key of cache.keys()) {
  console.log(`"${key}" mapping to --> ${cache.get(key)}`)
}

// "user:1" mapping to --> Marcus
// "user:2" mapping to --> Supercharge
```


#### map
The `map` method returns an array containing the results of the given `transform` function. The transform function will be called once for each entry in the map in insertion order. The `transform` function receives the `value, key, map` arguments:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

const users = cache.map((value, key, map) => {
  return { [key]: value }
})

// [{ 'user:1': 'Marcus' }, { 'user:2': 'Supercharge' }]
```


#### of
The static `of` method creates a new map instance of the given key-value-pairs. It’s basically a shortcut for `new Map(entries)`:

```js
const cache = Map.of([
    ['user:1', 'Marcus'],
    ['user:2', 'Supercharge']
])

cache.get('user:1')
// 'Marcus'

cache.has('user:2')
// true
```

**Notice** the list of lists. Each entry in the map represents a list of two items.


#### set
The `set` method adds or updates an entry with the given `key` and value in the map:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

cache.get('user:1')
// 'Marcus'

cache.has('user:5000')
// false
```


#### values
The `values` method returns an iterator object containing the values present in the map (in insertion order):

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

const valueIterator = cache.values()

valueIterator.next().value
// 'user:1'

valueIterator.next().value
// 'user:2'
```

You may also iterate through the values using a `for..of` or loop:

```js
const cache = new Map()

cache
  .set('user:1', 'Marcus')
  .set('user:2', 'Supercharge')

for (const value of cache.values()) {
  console.log(value)
}

// 'Marcus'
// 'Supercharge'
```


## Available Properties
Here’s a list of available properties in the package:

<div id="collection-method-list" markdown="1">

[size](#size)

</div>


#### size
The `size` property returns the number of key/value pairs in the map:

```js
const map = new Map([['key', 'value']])
map.set('name', 'Marcus')

const size = map.size
// 2
```

