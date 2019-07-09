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
[every](#every)
[filter](#filter)
[find](#find)
[flatMap](#flatMap)
[forEach](#forEach)
[forEachSeries](#forEachSeries)
[map](#map)
[mapSeries](#mapSeries)
[reduce](#reduce)
[some](#some)

</div>


## Methods
The upcoming examples use the `Collect` function which is the imported `@supercharge/collections` package:

```js
const Collect = require('@supercharge/collections')
```


#### collapse
Text

```js

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
Text

```js

```


#### mapSeries
Text

```js

```


#### reduce
Text

```js

```


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
    return fetch(uri)
})

// true
```
