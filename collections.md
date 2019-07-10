# Collections
Tba.


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

[collapse](#collapse)
[compact](#compact)
[every](#every)
[filter](#filter)
[find](#find)
[flatMap](#flatmap)
[forEach](#foreach)
[forEachSeries](#foreachseries)
[map](#map)
[mapSeries](#mapseries)
[reduce](#reduce)
[reduceRight](#reduceright)
[some](#some)

</div>


## Methods
The upcoming examples use the `Collect` function which is the imported `@supercharge/collections` package:

```js
const Collect = require('@supercharge/collections')
```

#### Calling `.run()`
Some of the methods return are chainable and return another collection, for example `map`, `filter`, `collapse`, `compact`.

You must explicitely start processing by calling `.run()` if one of these methods is the last item in your collection pipeline.


#### collapse
The `collapse` method collapses a collection of arrays into a single, flat collection.

```js
await Collect([[1], [{}, 'Marcus', true], [22]])
  .collapse()
  .run()

// [1, {}, 'Marcus', true, 22]
```


#### compact
The `compact` method removes all falsy values from the collection. For example, falsy values are `null`, `undefined`, `''`, `false`, `0`, `NaN`.

```js
await Collect([0, null, undefined, 1, false, 2, '', 3, NaN])
  .collapse()
  .run()

// [1, 2, 3]
```


#### every
Text

```js

```


#### filter
Text

```js

```


#### find
Text

```js

```


#### flatMap
Text

```js

```


#### forEach
Text

```js

```


#### forEachSeries
Text

```js

```


#### map
The `map` method runs the given (async) callback on each collection item and returns an array of transformed items. Because `map` returns another collection, you could chain further operations. You must explicitely start processing by calling `.run()`:

```js
await Collect([1, 2, 3])
  .map(async item => {
    return item * 10
  })
  .run()

// [ 10, 20, 30 ]
```

```info
`map` runs all transformations in parallel. If you want to run them in sequence, use [`mapSeries`](#mapseries).
```


#### mapSeries
The `mapSeries` method is like `map` running the given (async) callback on each collection item **in sequence**:

```js
await Collect([1, 2, 3])
  .mapSeries(async item => {
    return item * 10
  })
  .run()

// [ 10, 20, 30 ]
```

```info
`mapSeries` runs all transformations in sequence. If you want to run them in parallel, use [`map`](#map).
```

#### reduce
The `reduce` method runs a(n async) reducer function on each array item, passing the result of each iteration to the subsequent iteration. The result is a reduced collection to a single value:

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
The `reduceRight` method is simular to `reduce`, reducing a collection to a single value. It runs a(n async) reducer function on each array item **from right-to-left**, passing the result of each iteration to the subsequent iteration:

```js
await Collect([1, 2, 3]).reduceRight(async (carry, item) => {
    return carry.concat(item)
}, [])

// [3, 2, 1]
```

The `reduceRight` method takes the initial value as a second argument.


#### some
The `some` method determines whether at least one item from the collection satisfies the testing function:

```js
await Collect([1, 2, 3]).some(item => {
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
