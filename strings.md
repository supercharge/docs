# Strings


## Introduction
The [`@supercharge/strings`](https://github.com/superchargejs/strings) package provides chainable string utilities for Node.js and JavaScript. It’s a wrapper around JavaScript’s global `String` class providing a handful of useful methods.


## Installation
The [`@supercharge/strings`](https://github.com/superchargejs/strings) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

```bash
npm i @supercharge/strings
```

```success
You can use this package with every project even if it’s not build on Supercharge. Enjoy!
```

## Working With Strings
Wrapping a string is as simple as importing the `@supercharge/strings` package and passing a value to the imported function:

```js
const Str = require('@supercharge/strings')

const title = Str('  Supercharge is sweet! ').trim().title().get()

// 'Supercharge Is Sweet!'
```

For every method in the chain that would return a string, the package returns an instance of iteself. This way, you can chain further methods. Call `.get()` to retrieve the actual JavaScript string.


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

[get](#get)
[camel](#camel)
[contains](#contains)
[includes](#includes)
[isEmpty](#isEmpty)
[isNotEmpty](#isNotEmpty)
[isLower](#isLowercase)
[lcFirst](#lcFirst)
[length](#upper)
[lower](#lower)
[random](#random)
[split](#split)
[strip](#strip)
[studly](#studly)
[title](#title)
[trim](#trim)
[upper](#upper)
[isUpper](#isUppercase)
[uuid](#uuid)

</div>


## Methods


#### get
The `get` method returns the underlying string value:

```js
const str = Str('Supercharge')
  .get()

// 'Supercharge'
```


#### camel
The `camel` method returns the underlying string in camelCase:

```js
const camel = Str('Supercharge is awesome').camel().get()

// 'superchargeIsAwesome'
```


#### contains
The `contains` method determines whether the given string contains a given value:

```js
const contains = Str('Supercharge is awesome').contains('awesome')

// true
```

```info
The `contains` method works the same way as the [`includes`](#includes) method. They are basically just aliases for each other.
```


#### includes
The `includes` method determines whether the given string contains a given value:

```js
const includes = Str('Supercharge is awesome').includes('awesome')

// true
```

```info
The `includes` method works the same way as the [`contains`](#contains) method. They are basically just aliases for each other.
```


#### isEmpty
The `isEmpty` method determines whether the given string has a length of 0:

```js
const isEmpty = Str('').isEmpty()

// true

const isEmpty = Str().isEmpty()

// true

const isEmpty = Str('Supercharge').isEmpty()

// false
```


#### isNotEmpty
The `isNotEmpty` method determines whether the given string has a length of 1 or greater:

```js
const isNotEmpty = Str('Supercharge').isNotEmpty()

// true

const isNotEmpty = Str('').isNotEmpty()

// false

const isNotEmpty = Str().isNotEmpty()

// false
```


#### isLower
The `isLower` method determines whether the given string is in lowercase:

```js
const isLower = Str('Supercharge is awesome').isLower()

// false

const isLower = Str('supercharge. sweet!').isLower()

// true
```


#### lcFirst
The `lcFirst` method lowercases the first character. It won’t change other symbols in the given string:

```js
const lcFirst = Str('Supercharge is SWEET!').lcFirst().get()

// 'supercharge is SWEET!'
```


#### length
The `length` method returns the lengths of the given string:

```js
const length = Str('Supercharge').length()

// 11
```


#### lower
The `lower` method lowercases the given string:

```js
const lower = Str('Supercharge is SWEET!').lower().get()

// 'supercharge is sweet!'
```


#### random
The `random` method is a static method creating a random, URL-friendly string. By default, the random string contains 21 symbols:

```js
const random = Str.random()

// 'QnyvCFDVZCnBMpoLX4TDh'
```


#### split
The `split` method splits the given string at the given value and returns an array of the resulting strings:

```js
const splitted = Str('Supercharge-is-sweet').split('-')

// ['Supercharge', 'is', 'sweet']
```


#### strip
The `strip` method removes all whitespace from the given string, everywhere:

```js
const stripped = Str('  Supercharge is SWEET').strip().get()

// 'SuperchargeisSWEET'
```


#### studly
The `studly` method transforms the given string into `StudlyCase`:

```js
const studly = Str('Supercharge is SWEET').studly().get()

// 'SuperchargeIsSweet'
```

StudlyCase is like camelCase but the first symbol is in uppercase.


#### title
The `title` method transforms the given string to `Title Case`:

```js
const title = Str('A new Supercharge docs page would be nice').title().get()

// 'A new Supercharge Docs Page Would Be Nice'
```


#### trim
The `trim` method removes all whitespace from the front and back of the given string:

```js
const trimmed = Str('    Supercharge is sweet ').trim().get()

// 'Supercharge is sweet'
```


#### upper
The `upper` method transforms the given string into uppercase:

```js
const upper = Str('Supercharge is sweet').upper().get()

// 'SUPERCHARGE IS SWEET'
```


#### isUpper
The `isUpper` method determines whether the given string is in uppercase:

```js
const isUpper = Str('Supercharge is sweet').isUpper()

// false

const isUpper = Str('SUPERCHARGE').isUpper()

// true
```


#### uuid
The `uuid` method is a static method creating a UUID (version 4):

```js
const uuid = Str.uuid()

// '8f605bbe-be67-4dca-8e36-2f2f3715204f'
```
