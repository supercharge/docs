# Strings


## Introduction
The [`@supercharge/strings`](https://github.com/supercharge/strings) package provides chainable string utilities for Node.js and JavaScript. It’s a wrapper around JavaScript’s global `String` class providing a handful of useful methods.


## Installation
The [`@supercharge/strings`](https://github.com/supercharge/strings) package lives independently from the Supercharge framework. Using it in your application requires you to install it as a project dependency:

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

const title = Str('  Supercharge is sweet! ')
    .trim()
    .title()
    .get()

// 'Supercharge Is Sweet!'
```

For every method in the chain that would return a string, the package returns an instance of iteself. This way, you can chain further methods. Call `.get()` to retrieve the actual JavaScript string.


**Works also with ES Modules and TypeScript**

```js
import Str from '@supercharge/strings'

const title = Str('Supercharge is sweet!').
    .title()
    .get()

// 'Supercharge Is Sweet!'
```


## Available Methods
Here’s a list of available methods in the strings package:

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
[at](#at)
[after](#after)
[afterLast](#afterlast)
[append](#append)
[before](#before)
[beforeLast](#beforelast)
[camel](#camel)
[chars](#chars)
[concat](#concat)
[contains](#contains)
[containsAll](#containsall)
[containsBom](#containsbom)
[endsWith](#endswith)
[equals](#equals)
[finish](#finish)
[includes](#includes)
[includesAll](#includesall)
[isCamel](#iscamel)
[isEmpty](#isempty)
[isNotEmpty](#isnotempty)
[isLower](#islower)
[isString](#isstring)
[isSymbol](#issymbol)
[isUpper](#isupper)
[isUuid](#isuuid)
[kebab](#kebab)
[lcFirst](#lcfirst)
[length](#length)
[limit](#limit)
[lines](#lines)
[lower](#lower)
[ltrim](#ltrim)
[notContains](#notcontains)
[notEquals](#notequals)
[notIncludes](#notincludes)
[padLeft](#padleft)
[padRight](#padright)
[parseCallback](#parseCallback)
[pascal](#pascal)
[prepend](#prepend)
[random](#random)
[replace](#replace)
[replaceAll](#replaceall)
[replaceLast](#replacelast)
[reverse](#reverse)
[rtrim](#rtrim)
[slug](#slug)
[snake](#snake)
[split](#split)
[start](#start)
[startsWith](#startswith)
[startsWithBom](#startswithbom)
[strip](#strip)
[stripExtraSpaces](#stripextraspaces)
[stripNums](#stripnums)
[studly](#studly)
[substr](#substr)
[title](#title)
[trim](#trim)
[ucFirst](#ucfirst)
[upper](#upper)
[uuid](#uuid)
[words](#words)

</div>


## Methods


#### get
The `get` method returns the underlying plain string value:

```js
const str = Str('Supercharge is awesome').get()

// 'Supercharge is awesome'
```


#### at
- *added in version `1.22`*

The `at` method returns the character at the given `index` or undefined if the index exceeds the string’s size:

```js
const at = Str('Supercharge').at(2)
// 'p'

const at = Str('Supercharge').at(-3)
// 'r'

const at = Str('Supercharge').at(50)
// undefined
```


#### after
- *added in version `1.12`*

The `after` method returns the portion of the string after the first occurrence of the given `delimiter`:

```js
const after = Str('Supercharge-is-awesome')
    .after('-')
    .get()

// 'is-awesome'
```


#### afterLast
- *added in version `1.13`*

The `afterLast` method returns the portion of the string after the last occurrence of the given `delimiter`:

```js
const afterLast = Str('Supercharge-is-awesome')
    .afterLast('-')
    .get()

// 'awesome'
```


#### append
- *added in version `1.13`*

The `append` method appends the given values to the string:

```js
const after = Str('Supercharge')
    .append(' is', ' awesome')
    .get()

// 'Supercharge is awesome'
```

You can also pass an array of strings to the `append` method:

```js
const after = Str('Supercharge')
    .append([' is', ' sweet'])
    .get()

// 'Supercharge is sweet'
```

#### before
- *added in version `1.12`*

The `before` method returns the portion of the string before the first occurrence of the given `delimiter`:

```js
const before = Str('Supercharge-is-awesome')
    .before('-')
    .get()

// 'Supercharge'
```


#### beforeLast
- *added in version `1.13`*

The `beforeLast` method returns the portion of the string before the last occurrence of the given `delimiter`:

```js
const beforeLast = Str('Supercharge-is-awesome')
    .beforeLast('-')
    .get()

// 'Supercharge-is'
```


#### camel
The `camel` method returns the underlying string in camelCase:

```js
const camel = Str('Supercharge is awesome')
    .camel()
    .get()

// 'superchargeIsAwesome'
```


#### chars
- *added in version `1.19`*

The `chars` method returns a list of the string’s characters:

```js
const chars = Str('Super').chars()
// ['S', 'u', 'p', 'e', 'r']

const chars = Str('Super 👍').chars()
// ['S', 'u', 'p', 'e', 'r', ' ', '👍']
```


#### concat
- *added in version `1.4`*

The `concat` method returns a string that contains the concatenation of two or more strings:

```js
Str('Supercharge')
    .concat('-is', '-great')
    .get()

// 'Supercharge-is-great'
```

You may also pass an array of strings as an argument to the `concat` method:

```js
Str('Supercharge')
    .concat([' has', ' style'])
    .get()

// 'Supercharge has style'
```


#### contains
- *updated in version `1.15` supporting an array of needles from which one must be present in the string*

The `contains` method determines whether the given string contains a given value:

```js
const contains = Str('Supercharge is awesome')
    .contains('awesome')

// true
```

You can also pass an array of values to the `contains` method to determine whether the string contains any of the given values:

```js
const contains = Str('Supercharge is awesome')
    .contains(['awesome', 'sweet'])

// true
```

```info
The `contains` method works the same way as the [`includes`](#includes) method. They are basically just aliases for each other.
```


#### containsAll
- *added in version `1.11`*

The `containsAll` method determines whether the given string contains all given values:

```js
const containsAll = Str('Supercharge is awesome')
    .containsAll('is', 'awesome')

// true
```

You can also pass an array of values to the `containsAll` method:

```js
const containsAll = Str('Supercharge is awesome')
    .containsAll(['is', 'bad'])

// false
```


#### containsBom
- *added in version `1.21`*

The `containsBom` method determines whether the given string contains a byte-order-mark (BOM):

```js
const containsBom = Str('Supercharge').containsBom()
// false
```


#### endsWith
- *added in version `1.3`*

The `endsWith` method determines whether the string ends with the given `needle`:

```js
const endsWith = Str('Supercharge').endsWith('charge')
// true
```

Optionally, the `endsWith` method accepts a second argument `length` which is used as the string length.

```js
const endsWith = Str('Supercharge').endsWith('charge', 5)
// false
// -> because the length shortens the 'Supercharge'
//    term to 5 letters ('Super') and compares it with 'charge'
```


#### equals
- *added in version `1.3`*

The `equals` method determines whether the string equals the given `value`:

```js
const equals = Str('Supercharge').equals('Supercharge')
// true
```

The `equals` method is case sensitive. Strings must be written the same way to be equal to each other:

```js
const equals = Str('Supercharge').equals('supercharge')
// false
```


#### finish
- *added in version `1.14`*

The `finish` method appends a single instance of the given `suffix` to the end of the string if it doesn’t already ends with the given suffix:

```js
const url = Str('https://api.github.com').finish('/').get()
// 'https://api.github.com/'

const url = Str('https://api.github.com/').finish('/').get()
// 'https://api.github.com/'

const url = Str('https://api.github.com///').finish('/').get()
// 'https://api.github.com///'
```

If you want to achieve to end a string with a single instance of a given value, you may combine the `finish` and `rtrim` methods:

```js
const url = Str('https://api.github.com///')
    .rtrim('/')
    .finish('/')
    .get()

// 'https://api.github.com/'
```


#### includes
The `includes` method determines whether the given string contains a given value:

```js
const includes = Str('Supercharge is awesome')
    .includes('awesome')

// true
```

```info
The `includes` method works the same way as the [`contains`](#contains) method. They are basically just aliases for each other.
```


#### includesAll
- *added in version `1.16`*

The `includesAll` method determines whether the given string contains all of the given needles:

```js
const includesAll = Str('Supercharge is awesome')
    .includesAll('is', 'awesome')

// true

const includesAll = Str('Supercharge is awesome')
    .includesAll('is', 'bad')

// false
```

```info
The `includesAll` method works the same way as the [`containsAll`](#containsall) method. They are basically just aliases for each other.
```


#### isUuid
- *added in version `1.22`*

The `isUuid` method determines whether the given string is a UUID:

```js
const isUuid = Str('8f605bbe-be67-4dca-8e36-2f2f3715204f').isUuid()
// true

const isUuid = Str('randommm-inva-lidd-uuid').isUuid()
// false

const isUuid = Str('').isUuid()
// false
```


#### isCamel
- *added in version `1.23`*

The `isCamel` method determines whether the given string is in camelCasee format:

```js
const isCamel = Str('superCharge').isCamel()
// true

const isCamel = Str('Supercharge').isCamel()
// false
```


#### isEmpty
- *added in version `1.1`*

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
- *added in version `1.1`*

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


#### isString
- *added in version `1.5`*

The `isString` method determines the given input is a string:

```js
const isString = Str.isString('Supercharge is awesome')
// true

const isString = Str.isString(123)
// false
```


#### isSymbol
- *added in version `1.22`*

The `isSymbol` method determines the given input is a JavaScript symbol:

```js
const isSymbol = Str.isSymbol(Symbol.for('Supercharge'))
// true

const isSymbol = Str.isSymbol(123)
// false
```


#### kebab
- *added in version `1.8`*
- *updated in version `1.18` to allow a custom separator*

The `kebab` method converts the given string to `kebab-case`:

```js
const kebab = Str('Supercharge is SWEET')
    .kebab()
    .get()

// 'supercharge-is-sweet'
```

You can use a custom separator as an argument to the `kebab` method:

```js
const kebab = Str('Supercharge is SWEET')
    .kebab('.')
    .get()

// 'supercharge.is.sweet'
```


#### lcFirst
The `lcFirst` method lowercases the first character. It won’t change other symbols in the given string:

```js
const lcFirst = Str('Supercharge is SWEET!')
    .lcFirst()
    .get()

// 'supercharge is SWEET!'
```


#### length
The `length` method returns the lengths of the given string:

```js
const length = Str('Supercharge').length()
// 11
```


#### limit
- *added in version `1.6`*

The `limit` method returns a limitted number of characters from the string:

```js
const limit = Str('Supercharge is SWEET!')
    .limit(5)
    .get()

// 'Super'
```

You may also pass a second parameter to the `limit` method defining the ending characters. These `end` characters will be appended to the limitted string:

```js
const limit = Str('Supercharge is SWEET!')
    .limit(5, '…')
    .get()

// 'Super…'
```


#### lines
- *added in version `1.23`*

The `lines` method breaks the string at the newline character and returns an array of lines:

```js
const lower = Str('Supercharge\n is cool').lines()
// ['Supercharge', ' is cool']

const lower = Str('Supercharge').lines()
// ['Supercharge']
```


#### lower
The `lower` method lowercases the given string:

```js
const lower = Str('Supercharge is SWEET!')
    .lower()
    .get()

// 'supercharge is sweet!'
```


#### ltrim
- *added in version `1.4`*
- *updated in version `1.14` to trim specific characters*

The `ltrim` method removes whitespace from the front of the string:

```js
const trimmed = Str('   Supercharge is nice  ')
    .ltrim()
    .get()

// 'Supercharge is nice  '
```

You can trim specific characters from the front of the string:

```js
const trimmed = Str('///supercharge/')
    .ltrim('/')
    .get()

// 'supercharge/'
```


#### notContains
- *added in version `1.10`*

The `notContains` method determines whether the given string **does not** contain a given value:

```js
const notContains = Str('Supercharge is awesome')
    .notContains('Marcus')

// true

const notContains = Str('Supercharge is awesome')
    .notContains('awesome')

// false
```


#### notEquals
- *added in version `1.16`*

The `notEquals` method determines whether the given string **does not** equal the candidate value:

```js
const notEquals = Str('Supercharge')
    .notEquals('supercharge')

// true

const notEquals = Str('Supercharge')
    .notEquals('Supercharge')

// false
```


#### notIncludes
- *added in version `1.16`*

The `notIncludes` method determines whether the given string **does not** contain a given value:

```js
const notIncludes = Str('Supercharge is awesome')
    .notIncludes('Marcus')

// true

const notIncludes = Str('Supercharge is awesome')
    .notIncludes('awesome')

// false
```

```info
The `notIncludes` method works the same way as the [`notContains`](#notcontains) method. They are basically just aliases for each other.
```


#### pascal
- *added in version `1.8`*

The `pascal` method is an alias for [`.studly()`](#studly) transformingthe given string into `PascalCase` aka `StudlyCase`:

```js
const pascal = Str('Supercharge is SWEET')
    .pascal()
    .get()

// 'SuperchargeIsSweet'
```

PascalCase is like camelCase with the first symbol in uppercase.


#### padLeft
- *added in version `1.14`*

The `padLeft` method pads the left side of the string with the given `pad` string (repeatedly if needed) so that the resulting string reaches a given `length`:

```js
const padded = Str('$19.99')
    .padLeft(15, '.')
    .get()

// '.........$19.99'
```

A space is used by default when you skip the character used to pad the string:

```js
const padded = Str('$19.99')
    .padLeft(15, '.')
    .get()

// '         $19.99'
```


#### padRight
- *added in version `1.14`*

The `padRight` method pads the right side of the string with the given `pad` string (repeatedly if needed) so that the resulting string reaches a given `length`:

```js
const padded = Str('$19.99')
    .padRight(15, '.')
    .get()

// '$19.99.........'
```

A space is used by default when you skip the character used to pad the string:

```js
const padded = Str('$19.99')
    .padRight(15)
    .get()

// '$19.99         '
```


#### parseCallback
- *added in version `1.17`*

The `parseCallback` method parses a `Class[@]method` style string into an array with two items: the class and method name. By default, it uses the `@` symbol to split the given string:

```js
const [ClassName, methodName] = Str('Controller@index').parseCallback()
// ['Controller', 'index']

const [ClassName, methodName] = Str('Controller').parseCallback()
// ['Controller', undefined]
```

You can adjust the separator to split the string by passing it as the first argument:

```js
const [ClassName, methodName] = Str('Controller.index').parseCallback('.')
// ['Controller', 'index']
```

You may also pass a default value for the method name to use in case none is provided:

```js
const [ClassName, methodName] = Str('Controller').parseCallback('.', 'handle')

// ['Controller', 'handle']

const [ClassName, methodName] = Str('Controller.index').parseCallback('.', 'handle')
// ['Controller', 'index']
```


#### prepend
- *added in version `1.13`*

The `prepend` method prepends the given values to the string:

```js
const after = Str('awesome')
    .prepend('Supercharge ', 'is ')
    .get()

// 'Supercharge is awesome'
```

You can also pass an array of strings to the `prepend` method:

```js
const after = Str('sweet')
    .prepend(['Supercharge ', 'is '])
    .get()

// 'Supercharge is sweet'
```


#### random
The `random` method is a static method creating a random, URL-friendly string. By default, the random string contains 21 symbols:

```js
const random = Str.random()
// 'QnyvCFDVZCnBMpoLX4TDh'
```


#### replace
- *added in version `1.13`*

The `replace` method replaces the first occurrence of a given value in a string:

```js
const replaced = Str('Supercharge-is-super-awesome')
    .replace('-', '/')
    .get()

// 'Supercharge/is-super-awesome'
```


#### replaceAll
- *added in version `1.2`*

The `replaceAll` method replaces all occurrences of a given value in a string:

```js
const replaced = Str('Supercharge-is-super-awesome')
    .replaceAll('-', '/')
    .get()

// 'Supercharge/is/super/awesome'
```


#### replaceLast
- *added in version `1.15`*

The `replaceLast` method replaces the last occurrence of a given value in a string:

```js
const replaced = Str('Supercharge-is-super-awesome')
    .replaceLast('-', '/')
    .get()

// 'Supercharge-is-super/awesome'
```


#### reverse
- *added in version `1.15`*

The `reverse` method reverses the character order of the string:

```js
const reversed = Str('Hello')
    .reverse()
    .get()

// 'olleH'
```


#### rtrim
- *added in version `1.4`*
- *updated in version `1.14` to trim specific characters*

The `rtrim` method removes whitespace from the end of the string:

```js
const trimmed = Str('   Supercharge is nice  ')
    .rtrim()
    .get()

// '   Supercharge is nice'
```

You can trim specific characters from the end of the string:

```js
const trimmed = Str('/supercharge/')
    .rtrim('/')
    .get()

// '/supercharge'
```


#### slug
- *added in version `1.8`*

The `slug` method converts the given string to a slug in kebab-case:

```js
const slug = Str('Supercharge is SWEET')
    .slug()
    .get()

// 'supercharge-is-sweet'
```

You can use a custom separator as an argument to the `slug` method:

```js
const slug = Str('Supercharge is SWEET')
    .slug('.')
    .get()

// 'supercharge.is.sweet'
```


#### snake
- *added in version `1.8`*

The `snake` method converts the given string to `snake_case`:

```js
const snake = Str('Supercharge is SWEET')
    .snake()
    .get()

// 'supercharge_is_sweet'
```


#### split
- *added in version `1.3`*

The `split` method splits the given string at the given value and returns an array of the resulting strings:

```js
const splitted = Str('Supercharge-is-sweet').split('-')
// ['Supercharge', 'is', 'sweet']
```


#### start
- *added in version `1.13`*

The `start` method prepends a single instance of the given `prefix` to the start of the string if it doesn’t already starts with the given prefix:

```js
const start = Str('repos/supercharge')
    .start('/')
    .get()
// '/repos/supercharge'

const start = Str('/repos/supercharge')
    .start('/')
    .get()
// '/repos/supercharge'

const start = Str('///repos/supercharge')
    .start('/')
    .get()
// '///repos/supercharge'
```

If you want to achieve to start a string with a single instance of a given value, you may combine the `start` and `ltrim` methods:

```js
const start = Str('///repos/supercharge')
    .ltrim('/')
    .start('/')
    .get()

// '/repos/supercharge'
```


#### startsWith
- *added in version `1.3`*

The `startsWith` method determines whether the string starts with the given `needle`:

```js
const startsWith = Str('Supercharge').startsWith('charge')
// false
```

Optionally, the `startsWith` method accepts a second argument `position` defining at which position in the string to begin searching for the `needle` (defaults to `0`).

```js
const startsWith = Str('Supercharge').startsWith('charge', 5)
// true
```


#### startsWithBom
- *added in version `1.21`*

The `startsWithBom` method determines whether the given string starts with a byte-order-mark (BOM):

```js
const startsWithBom = Str('Supercharge').startsWithBom()
// false
```


#### strip
The `strip` method removes all whitespace from the given string, everywhere:

```js
const stripped = Str('  Supercharge is SWEET')
    .strip()
    .get()

// 'SuperchargeisSWEET'
```


#### stripExtraSpaces
- *added in version `1.20`*

The `stripExtraSpaces` method removes all extra spaces from the given string and leaves a single space at the position:

```js
const strippedNums = Str('Supercharge   is   awesome')
    .stripExtraSpaces()
    .get()

// 'Supercharge is awesome'
```


#### stripNums
- *added in version `1.12`*

The `stripNums` method removes all numbers from the given string, everywhere:

```js
const strippedNums = Str('Supercharge 123 is awesome')
    .stripNums()
    .get()

// 'Supercharge  is awesome'
```

**Notice:** removing the numbers may leave extra spaces within the text. The example above contains two spaces between “Supercharge  is”. Use the [`stripExtraSpaces`](#stripextraspaces) method to replace extra spaces with a single one at the given position.


#### studly
The `studly` method transforms the given string into `StudlyCase`:

```js
const studly = Str('Supercharge is SWEET')
    .studly()
    .get()
// 'SuperchargeIsSweet'
```

StudlyCase is like camelCase but the first symbol is in uppercase.


#### substr
The `substr` method returns a substring between a given `starting` index and an `ending` index or the end of the string.

```js
const substr = Str('Supercharge')
    .substr(0, 5)
    .get()
// 'Super'

const substr = Str('Supercharge')
    .substr(5, 0)
    .get()
// 'Super'

const substr = Str('Supercharge')
    .substr(5)
    .get()
// 'charge'

const substr = Str('Supercharge')
    .substr()
    .get()
// 'Supercharge'
```


#### title
The `title` method transforms the given string to `Title Case`:

```js
const title = Str('A new Supercharge docs page would be nice')
    .title()
    .get()

// 'A new Supercharge Docs Page Would Be Nice'
```


#### trim
- *updated in version `1.14` to trim specific characters*

The `trim` method removes all whitespace from the front and back of the given string:

```js
const trimmed = Str('    Supercharge is sweet ')
    .trim()
    .get()

// 'Supercharge is sweet'
```

You can trim specific characters from the string:

```js
const trimmed = Str('/supercharge/')
    .trim('/')
    .get()

// 'supercharge'
```


#### ucFirst
- *added in version `1.2`*

The `ucFirst` method uppercases the first character in the string:

```js
const ucFirst = Str('superCHARGE')
    .ucFirst()
    .get()

// 'SuperCHARGE'
```


#### upper
The `upper` method transforms the given string into uppercase:

```js
const upper = Str('Supercharge is sweet')
    .upper()
    .get()

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


#### words
- *added in version `1.23`*

The `words` method returns the list of words of the given string:

```js
const uuid = Str('Supercharge is awesome').words()
// ['Supercharge', 'is', 'awesome']
```
